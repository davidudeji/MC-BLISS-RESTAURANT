import { UtensilsCrossed, SearchX, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#1E392A]/8 flex items-center justify-center mb-4 text-[#1E392A]/40">
        {icon || <UtensilsCrossed size={32} />}
      </div>
      <h3 className="text-lg font-display font-bold text-[#111827] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 font-body max-w-xs">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          <Button onClick={action.onClick} variant="secondary">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "We couldn't load today's menu.",
  description = 'Please check your connection and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4 text-red-400">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-lg font-display font-bold text-[#111827] mb-2">{title}</h3>
      <p className="text-sm text-gray-500 font-body max-w-xs">{description}</p>
      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

export function SearchEmpty() {
  return (
    <EmptyState
      icon={<SearchX size={32} />}
      title="No meals found."
      description="Try another category or search term."
    />
  );
}
