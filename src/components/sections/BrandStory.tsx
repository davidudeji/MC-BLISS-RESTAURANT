import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Salad, FlaskConical, ChefHat, Handshake } from 'lucide-react';

const features = [
  { icon: Leaf,         text: 'Fresh ingredients sourced daily' },
  { icon: Salad,        text: 'Nutrient-conscious meal preparation' },
  { icon: FlaskConical, text: 'Small-batch cooking for maximum freshness' },
  { icon: Handshake,    text: 'Sustainable, ethical sourcing partnerships' },
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
                {/* Decorative content — SVG bowl illustration */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-10">
                  <svg
                    viewBox="0 0 120 120"
                    width="120"
                    height="120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Healthy bowl illustration"
                  >
                    {/* Bowl */}
                    <ellipse cx="60" cy="72" rx="44" ry="14" fill="#D4A373" opacity="0.35" />
                    <path d="M18 58 Q18 92 60 92 Q102 92 102 58 Z" fill="#FDFBF7" opacity="0.15" />
                    <path d="M20 58 Q20 90 60 90 Q100 90 100 58" stroke="#D4A373" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                    {/* Salad greens */}
                    <ellipse cx="45" cy="55" rx="14" ry="9" fill="#2a7f4f" opacity="0.9" />
                    <ellipse cx="60" cy="50" rx="16" ry="10" fill="#1E392A" opacity="0.95" />
                    <ellipse cx="75" cy="55" rx="13" ry="8" fill="#2a7f4f" opacity="0.85" />
                    {/* Tomato */}
                    <circle cx="52" cy="53" r="5" fill="#c0392b" opacity="0.85" />
                    <line x1="52" y1="48" x2="52" y2="46" stroke="#2a7f4f" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Carrot */}
                    <ellipse cx="70" cy="56" rx="5" ry="3" fill="#e67e22" opacity="0.85" transform="rotate(-20 70 56)" />
                    {/* Fork */}
                    <line x1="28" y1="30" x2="28" y2="58" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <line x1="25" y1="30" x2="25" y2="40" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                    <line x1="28" y1="30" x2="28" y2="40" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                    <line x1="31" y1="30" x2="31" y2="40" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                    {/* Spoon */}
                    <line x1="92" y1="35" x2="92" y2="58" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <ellipse cx="92" cy="31" rx="4" ry="6" fill="#D4A373" opacity="0.5" />
                    {/* Stars / sparkle */}
                    <circle cx="38" cy="38" r="1.5" fill="#D4A373" opacity="0.7" />
                    <circle cx="82" cy="36" r="1.5" fill="#D4A373" opacity="0.7" />
                    <circle cx="60" cy="28" r="2" fill="#D4A373" opacity="0.6" />
                  </svg>

                  <div className="text-center">
                    <p className="font-display font-bold text-white text-2xl mb-2">
                      "Where Care<br />meets flavour."
                    </p>
                    <p className="text-white/60 font-body text-sm">— MC Bliss</p>
                    <p className="text-white/60 font-body text-sm">— Sarah Sweet Confectionaries</p>
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
              At MC Bliss, we prepare food with care. Every meal is prepared in small batches to
              preserve nutrients and honour the food's natural story. We are not a
              restaurant that simply serves meals — we serve healthy and nourishing
              food and drinks.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#1E392A]/8 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#1E392A]" />
                    </span>
                    <span className="text-gray-700 font-body text-sm">{f.text}</span>
                  </motion.li>
                );
              })}
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
