import { motion } from 'framer-motion';
import { UtensilsCrossed, PackageOpen, Truck, Building2 } from 'lucide-react';

const services = [
  {
    icon: UtensilsCrossed,
    title: 'Dine-In',
    description:
      'Experience MC Bliss in our thoughtfully designed wellness space. A calm, green-scaped environment for mindful eating.',
    features: ['Curated ambience', 'Nutritionist tips', 'Full menu access'],
    color: 'from-[#1E392A] to-[#2d5040]',
    iconBg: 'bg-white/15',
  },
  {
    icon: PackageOpen,
    title: 'Premium Takeaway',
    description:
      'Your MC Bliss meal, packaged beautifully in sustainable, eco-conscious materials to enjoy anywhere.',
    features: ['Eco packaging', 'Freshness sealed', 'Same quality'],
    color: 'from-[#8B4513] to-[#D4A373]',
    iconBg: 'bg-white/15',
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    description:
      'Fresh meals delivered to your doorstep within your delivery window. Order before noon for same-day delivery.',
    features: ['Same-day delivery', 'Temperature-controlled', 'Real-time tracking'],
    color: 'from-[#2d5040] to-[#3d6b52]',
    iconBg: 'bg-white/15',
  },
  {
    icon: Building2,
    title: 'Corporate Catering',
    description:
      'Enjoy healthy organic meals for your meetings, events, and office lunches.',
    features: ['Custom menus', 'Minimum 10 pax', 'Flexible scheduling'],
    color: 'from-[#4a3728] to-[#8B4513]',
    iconBg: 'bg-white/15',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#111827] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.p
            className="text-[#D4A373] text-sm font-body font-semibold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How We Serve You
          </motion.p>
          <motion.h2
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Wellness, your way.
          </motion.h2>
          <motion.p
            className="text-gray-400 font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Whether you're dining in, taking away, or fuelling your entire office —
            MC Bliss brings honest, nourishing food to you.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                {/* Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                />

                {/* Content */}
                <div className="relative p-6 flex flex-col h-full min-h-[300px]">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center mb-5 border border-white/20`}>
                    <Icon size={22} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/70 font-body text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  {/* Features */}
                  <ul className="mt-5 space-y-1.5">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-white/80 text-xs font-body"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-400 font-body text-sm mb-4">
            Questions about our services? We'd love to hear from you.
          </p>
          <a
            href="mailto:hello@mcbliss.ng"
            className="inline-flex items-center gap-2 border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white font-body font-medium px-6 py-3 rounded-xl transition-all duration-200 text-sm"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
