import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalAmount, clearCart } =
    useCartStore();
  const navigate = useNavigate();
  const total = totalAmount();
  const isEmpty = items.length === 0;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-[#FDFBF7] flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0D8] flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#1E392A]" />
                <h2 className="font-display font-bold text-[#111827] text-xl">Your Cart</h2>
                {!isEmpty && (
                  <span className="bg-[#1E392A] text-white text-xs font-bold rounded-full px-2 py-0.5 font-body">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-[#1E392A]/8 flex items-center justify-center mb-4">
                    <ShoppingBag size={28} className="text-[#1E392A]/40" />
                  </div>
                  <p className="font-display font-bold text-[#111827] text-lg mb-2">Your cart is empty</p>
                  <p className="text-gray-500 font-body text-sm mb-6">
                    Browse our menu and add your favourites.
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-[#1E392A] text-white font-body font-medium px-6 py-3 rounded-xl hover:bg-[#2a4f3b] transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.menuItemId}
                        className="flex gap-4 bg-white rounded-2xl p-4 border border-[#E5E0D8]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        {/* Image/Emoji */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5F2EC] flex-shrink-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl bg-gradient-to-br from-[#1E392A] to-[#2d5040]">
                              🥗
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-semibold text-[#111827] text-sm truncate">{item.name}</p>
                          <p className="text-[#D4A373] font-display font-bold text-sm mt-0.5">
                            {formatPrice(item.price)}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-2.5">
                            <button
                              onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-[#F5F2EC] hover:bg-[#1E392A] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold font-body w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                              disabled={item.quantity >= item.batchQuantity}
                              className="w-7 h-7 rounded-lg bg-[#F5F2EC] hover:bg-[#1E392A] hover:text-white text-gray-600 flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal + Remove */}
                        <div className="flex flex-col items-end justify-between flex-shrink-0">
                          <button
                            onClick={() => removeItem(item.menuItemId)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                          <p className="text-sm font-bold font-body text-[#111827]">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="border-t border-[#E5E0D8] px-6 py-6 space-y-4 flex-shrink-0 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-body text-sm">Subtotal</span>
                  <span className="font-display font-bold text-[#1E392A] text-xl">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-body">
                  Delivery fee calculated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-[#D4A373] hover:bg-[#b8864f] text-white font-body font-semibold py-4 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-base"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-gray-400 hover:text-red-500 font-body transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
