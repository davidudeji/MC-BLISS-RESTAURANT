import { motion } from 'framer-motion';
import { AtSign, Link2, MapPin, MessageCircle, Phone, Mail, Clock } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#FDFBF7] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-[#D4A373] text-sm font-body font-semibold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="font-display font-bold text-[#111827] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We'd love to hear from you.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                icon: MapPin,
                title: 'Our Location',
                lines: ['MC Bliss Restaurant and Catering Service', 'KARU/JIKWOYI ROAD CBN JUNCTION, ABUJA', 'Nigeria'],
              },
              {
                icon: Phone,
                title: 'Phone',
                lines: ['+234 806 5819 988'],
                link: 'tel:+2348065819988',
              },
              {
                icon: Mail,
                title: 'Email',
                lines: ['mcblissrestaurant@gmail.com'],
                link: 'mailto:mcblissrestaurant@gmail.com',
              },
              {
                icon: Clock,
                title: 'Opening Hours',
                lines: ['Mon–Sat: 8:00 AM – 8:00 PM'],
              },
            ].map(({ icon: Icon, title, lines, link }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E392A]/8 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#1E392A]" />
                </div>
                <div>
                  <p className="font-body font-semibold text-[#111827] text-sm mb-1">{title}</p>
                  {lines.map((line) =>
                    link ? (
                      <a
                        key={line}
                        href={link}
                        className="block text-gray-600 font-body text-sm hover:text-[#D4A373] transition-colors"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-gray-600 font-body text-sm">{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div>
              <p className="font-body font-semibold text-[#111827] text-sm mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: AtSign, label: 'Instagram', href: '#' },
                  { icon: MessageCircle, label: 'Twitter', href: '#' },
                  { icon: Link2, label: 'Facebook', href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-[#1E392A] text-white flex items-center justify-center hover:bg-[#D4A373] transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="bg-white rounded-3xl border border-[#E5E0D8] p-8 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display font-bold text-[#111827] text-2xl mb-6">
              Send us a message
            </h3>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Message sent! We\'ll respond within 24 hours.');
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#111827] font-body">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="px-4 py-3 text-sm font-body bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#111827] font-body">Email</label>
                  <input
                    type="email"
                    placeholder="mcblissrestaurant@gmail.com"
                    required
                    className="px-4 py-3 text-sm font-body bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#111827] font-body">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  required
                  className="px-4 py-3 text-sm font-body bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#111827] font-body">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us more…"
                  required
                  className="px-4 py-3 text-sm font-body bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E392A] hover:bg-[#2a4f3b] text-white font-body font-medium py-3.5 rounded-xl transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
