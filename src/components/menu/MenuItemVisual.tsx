import {
  Apple,
  Cookie,
  Egg,
  GlassWater,
  Salad,
  Soup,
  Wine,       // bottle icon for drinks
  ShoppingBag, // snack bag icon for snacks
  type LucideIcon,
} from 'lucide-react';
import type { MenuItem } from '../../types';

// ── Category → visual mapping ──────────────────────────────────
// ZOBO_JUICES  → Wine (bottle) icon
// SNACKS       → ShoppingBag (snack bag) icon
const visualByCategory: Record<MenuItem['category'], { icon: LucideIcon; className: string }> = {
  NUTRITIOUS_MEALS: { icon: Soup,        className: 'bg-[#1E392A] text-[#F5E7C8]' },
  SNACKS:           { icon: ShoppingBag, className: 'bg-[#8B4513] text-[#F5E7C8]' },
  YOGURT_BOWLS:     { icon: Apple,       className: 'bg-[#D4A373] text-[#FFF8EA]' },
  ZOBO_JUICES:      { icon: Wine,        className: 'bg-[#6B0F1A] text-[#F8D7B5]' },
};

// ── Name keyword overrides ─────────────────────────────────────
const visualByName: Array<[string, LucideIcon]> = [
  ['salad',   Salad],
  ['avocado', Salad],
  ['egg',     Egg],
  ['juice',   GlassWater],
  ['zobo',    Wine],       // zobo = bottle
  ['drink',   Wine],       // any "drink" = bottle
  ['bottle',  Wine],
  ['yogurt',  Apple],
  ['snack',   ShoppingBag],
  ['cookie',  Cookie],
  ['crisp',   Cookie],
  ['chip',    Cookie],
];

function getVisual(item: Pick<MenuItem, 'name' | 'category'>) {
  const nameLower = item.name.toLowerCase();
  const match = visualByName.find(([keyword]) => nameLower.includes(keyword));
  const categoryVisual = visualByCategory[item.category ?? 'NUTRITIOUS_MEALS'];
  return { icon: match?.[1] ?? categoryVisual.icon, className: categoryVisual.className };
}

export function MenuItemVisual({
  item,
  compact = false,
}: {
  item: Pick<MenuItem, 'name' | 'category'>;
  compact?: boolean;
}) {
  const { icon: Icon, className } = getVisual(item);

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
      aria-label={`${item.name} icon`}
    >
      <Icon size={compact ? 34 : 76} strokeWidth={1.25} aria-hidden="true" />
    </div>
  );
}