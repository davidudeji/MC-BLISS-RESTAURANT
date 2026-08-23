import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConfirmationPage() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId') || 'ORD-000000';
  const name = params.get('name') || 'Valued Customer';

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 py-20">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success icon */}
        <motion.div
          className="w-24 h-24 rounded-full bg-[#1E392A] flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
        >
          <CheckCircle2 size={48} className="text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#D4A373] text-sm font-body font-semibold tracking-widest uppercase mb-3">
            Order Confirmed
          </p>
          <h1 className="font-display font-bold text-[#111827] mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
            Thank you, {name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 font-body mb-6 leading-relaxed">
            Your order has been received and is being prepared with care.
            We'll send updates to your phone or email.
          </p>

          {/* Order ID */}
          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 mb-8">
            <p className="text-xs text-gray-400 font-body uppercase tracking-wider mb-1">Order Reference</p>
            <p className="font-display font-bold text-[#1E392A] text-2xl">{orderId}</p>
          </div>

          {/* What's next */}
          <div className="bg-[#1E392A] rounded-3xl p-6 mb-8 text-left">
            <h2 className="font-display font-bold text-white text-lg mb-4">What happens next?</h2>
            <ol className="space-y-3">
              {[
                'We confirm your order and begin preparation',
                'Your food is freshly prepared in our kitchen',
                'Our team dispatches your order for delivery',
                'Enjoy your MC Bliss meal!',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#D4A373] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-white/80 font-body text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#1E392A] text-white font-body font-medium px-6 py-3.5 rounded-xl hover:bg-[#2a4f3b] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Menu
            </Link>
            <Link
              to="/"
              onClick={() => {
                setTimeout(() => {
                  const el = document.getElementById('menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#D4A373] text-white font-body font-medium px-6 py-3.5 rounded-xl hover:bg-[#b8864f] transition-colors"
            >
              <ShoppingBag size={16} />
              Order Again
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
