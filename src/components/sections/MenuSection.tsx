import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronDown } from 'lucide-react';
import api from '../../lib/api';
import { MenuCard } from '../menu/MenuCard';
import { MenuGridSkeleton } from '../ui/Skeleton';
import { ErrorState, SearchEmpty, EmptyState } from '../ui/EmptyState';
import type { MenuItem, Category } from '../../types';
import { CATEGORY_LABELS } from '../../types';

// Realistic mock data to show while backend is not connected
const MOCK_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Akpu & Egusi Soup',
    slug: 'Akpu & Egusi Soup',
    description: 'Fresh made Akpu and Egusi Soup.',
    price: 2000,
    category: 'NUTRITIOUS_MEALS',
    status: 'AVAILABLE',
    imageUrl: 'https://media.istockphoto.com/id/1398351215/photo/egusi-soup-with-fufu-pounded-yam.webp?a=1&b=1&s=612x612&w=0&k=20&c=bpowb3HCg76MVl13_tkTih9ByUbnfLby2163db1qXso=',
    imagePublicId: null,
    batchQuantity: 18,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Pepper Soup',
    slug: 'Pepper Soup',
    description: 'Pepper Soup with goat meat.',
    price: 2000,
    category: 'NUTRITIOUS_MEALS',
    status: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1763048443535-1243379234e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVwcGVyJTIwc291cHxlbnwwfHwwfHx8MA%3D%3D',
    imagePublicId: null,
    batchQuantity: 8,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Yogurt',
    slug: 'Yogurt',
    description: 'House-made probiotic yogurt with fresh tropical fruits, organic, coconut and edible flowers.',
    price: 1500,
    category: 'YOGURT_BOWLS',
    status: 'AVAILABLE',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664391867393-0cadd3159fab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91Z2h1cnR8ZW58MHx8MHx8fDA%3D',
    imagePublicId: null,
    batchQuantity: 12,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'White Rice & Sauce',
    slug: 'White Rice & Sauce',
    description: 'White Rice & Sauce with meat or fish.',
    price: 2000,
    category: 'NUTRITIOUS_MEALS',
    status: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1577281475566-78b57c5dfd4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2hpdGUlMjByaWNlJTIwYW5kJTIwc3Rld3xlbnwwfHwwfHx8MA%3D%3D',
    imagePublicId: null,
    batchQuantity: 25,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Meat Pie',
    slug: 'Meat Pie',
    description: 'Freshly baked meat pie',
    price: 1500,
    category: 'SNACKS',
    status: 'AVAILABLE',
    imageUrl: '    https://images.unsplash.com/photo-1608039783021-6116a558f0c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhdCUyMHBpZXxlbnwwfHwwfHx8MA%3D%3D',
    imagePublicId: null,
    batchQuantity: 10,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Cold-Steeped Zobo',
    slug: 'cold-steeped zobo',
    description: 'Our signature cold-steeped drink infused with ginger, cloves, and a hint of pineapple. No sugar added.',
    price: 500,
    category: 'ZOBO_JUICES',
    status: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
    imagePublicId: null,
    batchQuantity: 3,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: '7',
    name: 'Fresh Green Juice',
    slug: 'fresh-green-juice',
    description: 'Cold-pressed celery, cucumber, spinach, green apple, and lemon. Pure plant nutrition in every sip.',
    price: 500,
    category: 'ZOBO_JUICES',
    status: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=900&q=85',
    imagePublicId: null,
    batchQuantity: 10,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Mixed Seed Granola Bar',
    slug: 'mixed-seed-granola-bar',
    description: 'Slow-baked oat and seed bar with natural sweeteners, dark chocolate chips, and dried cranberries.',
    price: 2000,
    category: 'SNACKS',
    status: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85',
    imagePublicId: null,
    batchQuantity: 30,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: '9',
    name: 'Fried Rice & Chicken',
    slug: 'Fried Rice & Chicken',
    description: 'Delicious Fried Rice and Chicken with pepper sauce.',
    price: 2500,
    category: 'NUTRITIOUS_MEALS',
    status: 'OUT_OF_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1772693471187-6e7d364f99ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZWQlMjByaWNlJTIwYW5kJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D',
    imagePublicId: null,
    batchQuantity: 0,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

type FilterCategory = 'ALL' | Category;

const CATEGORIES: FilterCategory[] = ['ALL', 'NUTRITIOUS_MEALS', 'SNACKS', 'YOGURT_BOWLS', 'ZOBO_JUICES'];

async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await api.get('/menu');
    return res.data.data.items ?? res.data.data;
  } catch {
    // Return mock data when API is not available
    return MOCK_ITEMS;
  }
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');
  const [search, setSearch] = useState('');

  const { data: items = [], isLoading, error, refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenuItems,
    staleTime: 2 * 60 * 1000,
  });

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'ALL' || item.category === activeCategory;
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, search]);

  return (
    <section id="menu" className="bg-[#FDFBF7] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-[#D4A373] text-sm font-body font-semibold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Today's Menu
          </motion.p>
          <motion.h2
            className="font-display font-bold text-[#111827] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Crafted with intention,<br />served with care.
          </motion.h2>
          <motion.p
            className="text-gray-500 font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Every item is prepared in small batches from farm-fresh ingredients.
            Order before it's gone.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu…"
              className="w-full pl-10 pr-4 py-3 text-sm font-body bg-white border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10 transition-colors"
              aria-label="Search menu items"
            />
          </div>

          {/* Category tabs — scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-all duration-200 ${activeCategory === cat
                  ? 'bg-[#1E392A] text-white shadow-sm'
                  : 'bg-white border border-[#E5E0D8] text-gray-600 hover:border-[#1E392A] hover:text-[#1E392A]'
                  }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Menu grid */}
        {isLoading ? (
          <MenuGridSkeleton count={6} />
        ) : error ? (
          <ErrorState
            title="We couldn't load today's menu."
            description="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        ) : filtered.length === 0 ? (
          <SearchEmpty />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            key={`${activeCategory}-${search}`}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div key={item.id} variants={cardVariants} layout>
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
