import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { MenuGridSkeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import api from '../../lib/api';
import { formatPrice } from '../../lib/utils';
import type { MenuItem, Category, ItemStatus } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import toast from 'react-hot-toast';
import { MenuItemVisual } from '../../components/menu/MenuItemVisual';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Use mock data when backend is unavailable
const MOCK_ITEMS: MenuItem[] = [
  { id: '1', name: 'Organic Avocado & Egg Bowl', slug: 'avocado-egg', description: 'Creamy avocado, farm eggs, greens.', price: 7500, category: 'NUTRITIOUS_MEALS', status: 'AVAILABLE', imageUrl: null, imagePublicId: null, batchQuantity: 18, isFeatured: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'Green Goddess Salad', slug: 'green-goddess', description: 'Seasonal greens, cucumber, edamame.', price: 6000, category: 'NUTRITIOUS_MEALS', status: 'AVAILABLE', imageUrl: null, imagePublicId: null, batchQuantity: 8, isFeatured: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'Tropical Yogurt Bowl', slug: 'tropical-yogurt', description: 'Probiotic yogurt with tropical fruits.', price: 5500, category: 'YOGURT_BOWLS', status: 'AVAILABLE', imageUrl: null, imagePublicId: null, batchQuantity: 12, isFeatured: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', name: 'Cold-Steeped Hibiscus Zobo', slug: 'hibiscus-zobo', description: 'Cold-steeped hibiscus with ginger.', price: 2500, category: 'ZOBO_JUICES', status: 'AVAILABLE', imageUrl: null, imagePublicId: null, batchQuantity: 5, isFeatured: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', name: 'Ginger Citrus Zobo', slug: 'ginger-zobo', description: 'Zingy hibiscus with lime and orange.', price: 2500, category: 'ZOBO_JUICES', status: 'OUT_OF_STOCK', imageUrl: null, imagePublicId: null, batchQuantity: 0, isFeatured: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const itemSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number({ error: 'Enter a valid price' }).min(100, 'Minimum price is ₦100'),
  category: z.enum(['NUTRITIOUS_MEALS', 'SNACKS', 'YOGURT_BOWLS', 'ZOBO_JUICES']),
  status: z.enum(['AVAILABLE', 'OUT_OF_STOCK']),
  batchQuantity: z.number({ error: 'Enter a valid quantity' }).min(0),
  isFeatured: z.boolean(),
});

type ItemForm = z.infer<typeof itemSchema>;

async function fetchAdminMenu(): Promise<MenuItem[]> {
  try {
    const res = await api.get('/menu');
    return res.data.data.items ?? res.data.data;
  } catch {
    return MOCK_ITEMS;
  }
}

export default function AdminMenuPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<MenuItem | null>(null);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['admin-menu'],
    queryFn: fetchAdminMenu,
  });

  const filtered = items.filter(
    (item) =>
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    setModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['admin-menu'] });
    toast.success(editing ? 'Menu item updated!' : 'Menu item published!', {
      style: { fontFamily: 'Plus Jakarta Sans, sans-serif', borderRadius: '12px' },
    });
  };

  const handleDelete = () => {
    if (!deleteModal) return;
    // Optimistic remove from mock
    queryClient.setQueryData<MenuItem[]>(['admin-menu'], (old = []) =>
      old.filter((i) => i.id !== deleteModal.id)
    );
    setDeleteModal(null);
    toast.success('Menu item deleted.', {
      style: { fontFamily: 'Plus Jakarta Sans, sans-serif', borderRadius: '12px' },
    });
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-[#111827] text-3xl mb-1">Menu Management</h1>
            <p className="text-gray-500 font-body text-sm">{items.length} items in your menu</p>
          </div>
          <Button onClick={openAdd} variant="secondary" leftIcon={<Plus size={16} />}>
            Add New Menu Item
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items…"
            className="w-full pl-10 pr-4 py-3 text-sm font-body bg-white border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#1E392A] transition-colors"
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <MenuGridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Your menu is empty."
            description="Add your first menu item to get started."
            action={{ label: 'Add Your First Menu Item', onClick: openAdd }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
                {/* Image */}
                <div className="h-36 bg-gradient-to-br from-[#1E392A] to-[#2d5040] flex items-center justify-center text-5xl">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <MenuItemVisual item={item} compact />
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-body font-semibold text-[#111827] text-sm leading-snug">{item.name}</h3>
                    <Badge variant={item.status === 'AVAILABLE' ? 'green' : 'red'} className="flex-shrink-0 text-xs">
                      {item.status === 'AVAILABLE' ? 'Available' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 font-body mb-1">{CATEGORY_LABELS[item.category]}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="font-display font-bold text-[#1E392A] text-lg">{formatPrice(item.price)}</p>
                      <p className="text-xs text-gray-400 font-body">Qty: {item.batchQuantity}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-lg text-gray-400 hover:text-[#1E392A] hover:bg-gray-100 transition-colors"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteModal(item)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <MenuItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        item={editing}
      />

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Menu Item?" size="sm">
        <div className="p-6">
          <p className="text-gray-600 font-body text-sm mb-6">
            Are you sure you want to delete <strong>{deleteModal?.name}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDeleteModal(null)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} className="flex-1">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

// ——— Inline MenuItemModal ———
interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  item?: MenuItem | null;
}

function MenuItemModal({ isOpen, onClose, onSave, item }: MenuItemModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
    defaultValues: item
      ? { ...item, price: item.price, batchQuantity: item.batchQuantity }
      : { category: 'NUTRITIOUS_MEALS', status: 'AVAILABLE', isFeatured: false, batchQuantity: 20 },
  });

  const onSubmit = async (data: ItemForm) => {
    try {
      if (item) {
        await api.put(`/menu/${item.id}`, data);
      } else {
        await api.post('/menu', data);
      }
    } catch {
      // proceed with mock success
    }
    onSave();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Edit Menu Item' : 'New Menu Item'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5" noValidate>
        <Input
          id="name"
          label="Food Title"
          placeholder="e.g., White Rice and Stew"
          required
          error={errors.name?.message}
          {...register('name')}
        />
        <Textarea
          id="description"
          label="Description"
          placeholder="Describe the dish, ingredients, and nutritional highlights…"
          rows={4}
          required
          error={errors.description?.message}
          {...register('description')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="price"
            label="Price (₦)"
            type="number"
            placeholder="7500"
            required
            leftAddon="₦"
            error={errors.price?.message}
            {...register('price', { valueAsNumber: true })}
          />
          <Input
            id="batchQuantity"
            label="Batch Quantity"
            type="number"
            placeholder="20"
            required
            error={errors.batchQuantity?.message}
            {...register('batchQuantity', { valueAsNumber: true })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            id="category"
            label="Category"
            options={[
              { value: 'NUTRITIOUS_MEALS', label: 'Nutritious Meals' },
              { value: 'SNACKS', label: 'Snacks' },
              { value: 'YOGURT_BOWLS', label: 'Yogurt Bowls' },
              { value: 'ZOBO_JUICES', label: 'Zobo & Juices' },
            ]}
            error={errors.category?.message}
            {...register('category')}
          />
          <Select
            id="status"
            label="Status"
            options={[
              { value: 'AVAILABLE', label: 'Available' },
              { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <div className="flex items-center gap-3 bg-[#F7F4EE] rounded-xl p-4">
          <input
            type="checkbox"
            id="isFeatured"
            className="w-4 h-4 rounded accent-[#1E392A]"
            {...register('isFeatured')}
          />
          <label htmlFor="isFeatured" className="text-sm font-medium font-body text-[#111827]">
            Mark as Featured Item
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="secondary" isLoading={isSubmitting} className="flex-1">
            {isSubmitting ? 'Publishing…' : item ? 'Save Changes' : 'Save & Publish Menu Item'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
