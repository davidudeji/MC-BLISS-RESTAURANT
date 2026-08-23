import { cn } from '../../lib/utils';

type BadgeVariant = 'green' | 'ochre' | 'red' | 'gray' | 'blue';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-[#1E392A]/10 text-[#1E392A] border border-[#1E392A]/20',
  ochre: 'bg-[#D4A373]/15 text-[#b8864f] border border-[#D4A373]/30',
  red: 'bg-red-50 text-red-700 border border-red-200',
  gray: 'bg-gray-100 text-gray-600 border border-gray-200',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
};

export function Badge({ children, variant = 'green', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium font-body',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
