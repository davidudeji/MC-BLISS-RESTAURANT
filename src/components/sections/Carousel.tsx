// Infinite marquee carousel with 6 customer experience cards
const CARDS = [
  {
    emoji: '🍹',
    bg: 'from-[#1E392A] to-[#2d5040]',
    title: '"The best Zobo and yoghurt!"',
    author: 'Sarah U.',
    role: 'Loyal Customer',
    description: 'Customers clinking chilled Hibiscus Zobo bottles at an outdoor wooden table.',
  },
  {
    emoji: '🥣',
    bg: 'from-[#8B4513] to-[#D4A373]',
    title: '"My Favourite."',
    author: 'David U.',
    role: 'Loyal Customer',
    description: 'Smiling customer enjoying a creamy yogurt parfait bowl under golden morning light.',
  },
  {
    emoji: '👥',
    bg: 'from-[#2d5040] to-[#1E392A]',
    title: '"Great food, great company."',
    author: 'VIP.',
    role: 'Regular Diner',
    description: 'Friends sharing nutritious meals around a beautifully set table.',
  },
  {
    emoji: '🎁',
    bg: 'from-[#4a3728] to-[#8B4513]',
    title: '"Premium packaging, premium taste."',
    author: 'Joseph U.',
    role: 'Takeaway Fan',
    description: 'Customer receiving premium eco-conscious takeaway packaging from a modern counter.',
  },
  {
    emoji: '🌿',
    bg: 'from-[#1a3025] to-[#1E392A]',
    title: '"My calm morning space."',
    author: 'Kaycee N.',
    role: 'Morning Regular',
    description: 'Customer enjoying a mindful breakfast in a lush green-scaped lounge.',
  },
  {
    emoji: '🏢',
    bg: 'from-[#2a4f3b] to-[#3d6b52]',
    title: '"Our team loves MC Bliss!"',
    author: 'Sarah Sweet Confectionaries.',
    role: 'Corporate Client',
    description: 'Office team enjoying premium corporate lunch catering from MC Bliss.',
  },
];

function CarouselCard({
  card,
}: {
  card: (typeof CARDS)[0];
}) {
  return (
    <div className="flex-shrink-0 w-72 sm:w-80 mx-3">
      <div
        className={`relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${card.bg} p-6 flex flex-col justify-between cursor-default`}
      >
        {/* Top decoration */}
        <div className="flex items-start justify-between">
          <span className="text-5xl">{card.emoji}</span>
          <span className="text-white/20 text-6xl font-display leading-none">"</span>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm font-body leading-relaxed flex-1 mt-4">
          {card.description}
        </p>

        {/* Bottom quote */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-white font-display font-bold text-lg leading-snug mb-2">
            {card.title}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
              {card.author[0]}
            </div>
            <div>
              <p className="text-white text-sm font-semibold font-body">{card.author}</p>
              <p className="text-white/60 text-xs font-body">{card.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Carousel() {
  // Duplicate cards for seamless infinite loop
  const allCards = [...CARDS, ...CARDS];

  return (
    <section className="bg-[#FDFBF7] py-20 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <p className="text-[#D4A373] text-sm font-body font-semibold tracking-widest uppercase mb-3">
          Customer Experiences
        </p>
        <h2
          className="font-display font-bold text-[#111827]"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
        >
          Loved by our community
        </h2>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {allCards.map((card, i) => (
            <CarouselCard key={i} card={card} />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Happy customers daily' },
            { value: '4+', label: 'Years of honest food' },
            { value: '100%', label: 'Organic ingredients' },
            { value: '4.9★', label: 'Average rating' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-white border border-[#E5E0D8]"
            >
              <p className="text-3xl font-display font-bold text-[#1E392A]">{stat.value}</p>
              <p className="text-xs text-gray-500 font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
