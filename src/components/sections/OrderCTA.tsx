import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export function OrderCTA() {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#1E392A] py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #D4A373 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, #D4A373 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          className="text-[#D4A373] text-sm font-body font-semibold tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to order?
        </motion.p>
        <motion.h2
          className="font-display font-bold text-white mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Today's menu is live.<br />
          <span className="text-[#D4A373]">Order before it sells out.</span>
        </motion.h2>
        <motion.p
          className="text-white/70 font-body text-lg mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Small-batch preparation means limited quantities. Every meal is crafted
          fresh — don't miss your serving.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={scrollToMenu}
            className="group inline-flex items-center gap-3 bg-[#D4A373] hover:bg-[#b8864f] text-white font-body font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <ShoppingBag size={20} />
            Order Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-body font-medium px-8 py-4 rounded-2xl transition-all duration-200 text-base"
          >
            Contact Us
          </button>
        </motion.div>

        {/* Urgency note */}
        <motion.p
          className="text-white/40 font-body text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          🕖 Order by 12:00 PM for same-day delivery · Pick-up available from 7:00 AM
        </motion.p>
      </div>
    </section>
  );
}
