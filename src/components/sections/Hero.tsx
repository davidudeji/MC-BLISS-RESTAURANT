import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Leaf } from 'lucide-react';

export function Hero() {
  const menuRef = useRef<HTMLElement | null>(null);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — gradient representing organic warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0d1f15 0%, #1E392A 40%, #2d5040 70%, #1a3025 100%)',
        }}
      />

      {/* Organic texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(212,163,115,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(212,163,115,0.10) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 80%, rgba(30,57,42,0.3) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dark gradient at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FDFBF7] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Leaf size={14} className="text-[#D4A373]" />
          <span className="text-[#D4A373] text-xs font-body font-semibold tracking-widest uppercase">
            Provide Healthy & Nourishing Food · Abuja, Nigeria
          </span>
          <Leaf size={14} className="text-[#D4A373]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold text-white mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Honest food,{' '}
          <span className="text-[#D4A373]">prepared carefully,</span>
          <br />
          served daily.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-white/75 font-body max-w-2xl mx-auto mb-10"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experience nutrient-dense dishes crafted from fresh ingredients. Every meal tells a story of care.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={scrollToMenu}
            className="group inline-flex items-center gap-2 bg-[#D4A373] hover:bg-[#b8864f] text-white font-body font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-base"
          >
            View Today's Menu
            <ArrowDown
              size={18}
              className="group-hover:translate-y-1 transition-transform duration-200"
            />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('story');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white/90 hover:text-white font-body font-medium px-8 py-4 rounded-2xl transition-all duration-300 text-base backdrop-blur-sm"
          >
            Our Story
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            '🌱 100% Organic',
            '🍃 Farm-Fresh Daily',
            '♻️ Sustainably Sourced',
            '✨ Small-Batch Prep',
          ].map((tag) => (
            <span
              key={tag}
              className="text-white/50 text-sm font-body"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
