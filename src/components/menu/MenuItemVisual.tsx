import {
  Apple,
  Cookie,
  Egg,
  GlassWater,
  Salad,
  Soup,
  type LucideIcon,
} from 'lucide-react';
import type { MenuItem } from '../../types';

const visualByCategory: Record<MenuItem['category'], { icon: LucideIcon; className: string }> = {
  NUTRITIOUS_MEALS: { icon: Soup, className: 'bg-[#1E392A] text-[#F5E7C8]' },
  SNACKS: { icon: Cookie, className: 'bg-[#8B4513] text-[#F5E7C8]' },
  YOGURT_BOWLS: { icon: Apple, className: 'bg-[#D4A373] text-[#FFF8EA]' },
  ZOBO_JUICES: { icon: GlassWater, className: 'bg-[#6B0F1A] text-[#F8D7B5]' },
};

const visualByName: Array<[string, LucideIcon]> = [
  ['salad', Salad],
  ['avocado', Salad],
  ['egg', Egg],
  ['juice', GlassWater],
  ['zobo', GlassWater],
  ['yogurt', Apple],
];

function getVisual(item: Pick<MenuItem, 'name' | 'category'>) {
  const match = visualByName.find(([keyword]) => item.name.toLowerCase().includes(keyword));
  const categoryVisual = visualByCategory[item.category ?? 'NUTRITIOUS_MEALS'];
  return { icon: match?.[1] ?? categoryVisual.icon, className: categoryVisual.className };
}

export function MenuItemVisual({ item, compact = false }: { item: Pick<MenuItem, 'name' | 'category'>; compact?: boolean }) {
  const { icon: Icon, className } = getVisual(item);

  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`} aria-label={`${item.name} icon`}>
      <Icon size={compact ? 34 : 76} strokeWidth={1.25} aria-hidden="true" />
    </div>
  );
}