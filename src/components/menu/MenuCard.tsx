import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, AlertCircle, Clock } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatPrice, isLowStock, isUrgentStock } from '../../lib/utils';
import type { MenuItem } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import toast from 'react-hot-toast';
import { MenuItemVisual } from './MenuItemVisual';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { addItem, openCart } = useCartStore();
  const isOutOfStock = item.status === 'OUT_OF_STOCK' || item.batchQuantity === 0;
  const lowStock = isLowStock(item.batchQuantity);
  const urgentStock = isUrgentStock(item.batchQuantity);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl,
      batchQuantity: item.batchQuantity,
      status: item.status,
    });
    toast.success(`${item.name} added to cart!`, {
      icon: '🛒',
      style: {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        borderRadius: '12px',
        background: '#1E392A',
        color: '#fff',
      },
    });
    openCart();
  };

  return (
    <motion.article
      className={`group bg-white rounded-2xl overflow-hidden border border-[#E5E0D8] transition-shadow duration-300 hover:shadow-xl flex flex-col ${isOutOfStock ? 'opacity-70' : ''}`}
      whileHover={isOutOfStock ? {} : { y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      layout
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#F5F2EC] flex-shrink-0">
        {item.imageUrl ? (
          <motion.img
            src={item.imageUrl}
            alt={item.name}
            className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''}`}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
        ) : (
          <div className={isOutOfStock ? 'grayscale w-full h-full' : 'w-full h-full'}>
            <MenuItemVisual item={item} />
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <Badge variant="green">
            {CATEGORY_LABELS[item.category]}
          </Badge>
          {item.isFeatured && (
            <Badge variant="ochre">⭐ Featured</Badge>
          )}
          {isOutOfStock && (
            <Badge variant="red">Out of Stock</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-[#111827] text-lg leading-snug mb-2">
          {item.name}
        </h3>

        <p className="text-gray-500 font-body text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
          {item.description.replace(/<[^>]*>/g, '')}
        </p>

        {/* Scarcity message */}
        <AnimatePresence>
          {!isOutOfStock && lowStock && (
            <motion.div
              className={`flex items-start gap-2 mb-4 p-2.5 rounded-xl ${urgentStock ? 'bg-red-50 border border-red-100' : 'bg-amber-50 border border-amber-100'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertCircle
                size={14}
                className={`flex-shrink-0 mt-0.5 ${urgentStock ? 'text-red-500 scarcity-pulse' : 'text-amber-500'}`}
              />
              <p
                className={`text-xs font-body ${urgentStock ? 'text-red-700' : 'text-amber-700'}`}
              >
                {item.category === 'ZOBO_JUICES'
                  ? `Only ${item.batchQuantity} bottles remaining for today.`
                  : item.category === 'SNACKS'
                  ? `Only ${item.batchQuantity} snack packs left today.`
                  : item.category === 'YOGURT_BOWLS'
                  ? `Only ${item.batchQuantity} yogurt bowls remaining today.`
                  : `Only ${item.batchQuantity} portions left for today's batch.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Out of stock message */}
        {isOutOfStock && (
          <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
            <Clock size={14} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-500 font-body">
              Missed today's batch. Re-opening fresh tomorrow morning at 7:00 AM.
            </p>
          </div>
        )}

        {/* Price & CTA row */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <p className="font-display font-bold text-[#1E392A] text-xl">
            {formatPrice(item.price)}
          </p>

          <Button
            size="sm"
            variant={isOutOfStock ? 'ghost' : 'primary'}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            leftIcon={<ShoppingBag size={14} />}
            className="flex-shrink-0"
          >
            {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
