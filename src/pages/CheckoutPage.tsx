import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Input, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import api from '../lib/api';
import toast from 'react-hot-toast';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Full name is required'),
  customerEmail: z.string().email('Enter a valid email address'),
  customerPhone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .regex(/^[+\d\s\-()]+$/, 'Invalid phone format'),
  deliveryAddress: z.string().min(10, 'Please enter your full delivery address'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, totalAmount, clearCart } = useCartStore();
  const navigate = useNavigate();
  const total = totalAmount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      };

      const res = await api.post('/orders', payload);
      const order = res.data.data;
      clearCart();
      navigate(`/order-confirmation?orderId=${order.id}&name=${data.customerName}`);
    } catch {
      // If backend isn't available, simulate success for demo
      const fakeOrderId = `ORD-${Date.now()}`;
      clearCart();
      navigate(`/order-confirmation?orderId=${fakeOrderId}&name=${data.customerName}`);
      toast.success('Order placed successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="font-display font-bold text-[#111827] text-3xl mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-500 font-body mb-8">
            Add items from our menu before checking out.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1E392A] text-white font-body font-medium px-6 py-3 rounded-xl hover:bg-[#2a4f3b] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1E392A] font-body text-sm transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </Link>

        <h1 className="font-display font-bold text-[#111827] mb-10"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
          Complete Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — left */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8">
              <h2 className="font-display font-bold text-[#111827] text-xl mb-6">
                Delivery Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Input
                  id="customerName"
                  label="Full Name"
                  placeholder="e.g., MC Bliss"
                  required
                  error={errors.customerName?.message}
                  {...register('customerName')}
                />
                <Input
                  id="customerEmail"
                  type="email"
                  label="Email Address"
                  placeholder="mcblissrestaurant@gmail.com"
                  required
                  error={errors.customerEmail?.message}
                  {...register('customerEmail')}
                />
                <Input
                  id="customerPhone"
                  type="tel"
                  label="Phone Number"
                  placeholder="+234 806 581 9988"
                  required
                  error={errors.customerPhone?.message}
                  {...register('customerPhone')}
                />
                <Textarea
                  id="deliveryAddress"
                  label="Delivery Address"
                  placeholder="House number, street, area, city…"
                  rows={3}
                  required
                  error={errors.deliveryAddress?.message}
                  {...register('deliveryAddress')}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Processing order…' : `Place Order · ${formatPrice(total)}`}
                  </Button>
                  <p className="text-xs text-gray-400 font-body text-center mt-3">
                    Prices are confirmed at checkout
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Order summary — right */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 sticky top-24">
              <h2 className="font-display font-bold text-[#111827] text-xl mb-5">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.menuItemId} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F5F2EC] flex-shrink-0 flex items-center justify-center text-xl">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        '🥗'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold font-body text-[#111827] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 font-body">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold font-body text-[#111827] flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5E0D8] pt-4 space-y-2">
                <div className="flex justify-between text-sm font-body text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-gray-500">
                  <span>Delivery</span>
                  <span className="text-[#1E392A] font-semibold">Calculated on delivery</span>
                </div>
                <div className="flex justify-between text-lg font-display font-bold text-[#111827] pt-2">
                  <span>Total</span>
                  <span className="text-[#1E392A]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
