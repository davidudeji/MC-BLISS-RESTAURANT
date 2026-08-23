import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const features = [
  { icon: '🌿', text: 'Farm-fresh ingredients sourced daily' },
  { icon: '🥗', text: 'Nutrient-conscious meal preparation' },
  { icon: '🫙', text: 'Small-batch cooking for maximum freshness' },
  { icon: '🤝', text: 'Sustainable, ethical sourcing partnerships' },
];

export function BrandStory() {
  return (
    <section id="story" className="bg-[#FDFBF7] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Visual */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Main image area */}
              <div
                className="rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[3/4]"
                style={{
                  background:
                    'linear-gradient(160deg, #1E392A 0%, #2d5040 50%, #D4A373 100%)',
                }}
              >
                {/* Decorative content */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-10">
                  <div className="text-8xl">🥗</div>
                  <div className="text-center">
                    <p className="font-display font-bold text-white text-2xl mb-2">
                      "Where wellness<br />meets flavour."
                    </p>
                    <p className="text-white/60 font-body text-sm">— MC Bliss Philosophy</p>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E392A]/60 to-transparent pointer-events-none" />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -right-6 lg:-right-8 bg-white rounded-2xl p-5 shadow-xl border border-[#E5E0D8]"
              >
                <p className="text-3xl font-display font-bold text-[#1E392A]">4+</p>
                <p className="text-xs text-gray-500 font-body mt-0.5">Years of crafting<br />honest food</p>
              </div>

              {/* Second floating card */}
              <div
                className="absolute -top-4 -left-4 lg:-left-6 bg-[#D4A373] rounded-2xl p-4 shadow-xl"
              >
                <p className="text-2xl font-display font-bold text-white">500+</p>
                <p className="text-xs text-white/80 font-body mt-0.5">Happy customers<br />served daily</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Eyebrow */}
            <p className="text-[#D4A373] text-sm font-body font-semibold tracking-widest uppercase mb-4">
              Our Philosophy
            </p>

            {/* Heading */}
            <h2
              className="font-display font-bold text-[#111827] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              We believe food should nourish the{' '}
              <span className="text-[#1E392A]">whole person.</span>
            </h2>

            {/* Body */}
            <p className="text-gray-600 font-body text-base leading-relaxed mb-8">
              At MC Bliss, we reject shortcuts. Every ingredient is carefully selected
              from trusted local farms. Every meal is prepared in small batches to
              preserve nutrients and honour the food's natural story. We are not a
              restaurant that simply serves meals — we are a wellness destination
              that happens to make food extraordinary.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <span className="text-gray-700 font-body text-sm">{f.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => {
                const el = document.getElementById('menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#1E392A] hover:bg-[#2a4f3b] text-white font-body font-medium px-7 py-3.5 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
            >
              Explore Our Menu
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
