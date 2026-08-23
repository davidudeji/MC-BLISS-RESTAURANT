// =========================================================
// MC Bliss — Utility Functions
// =========================================================

/** Format a price as Nigerian Naira */
export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

/** Format a date string to readable form */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Merge class names (simple version) */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Truncate text to a given length */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '…';
}

/** Strip HTML tags for plain text display */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/** Check if batch quantity is low (scarcity threshold) */
export const SCARCITY_LOW_THRESHOLD = 12;
export const SCARCITY_URGENT_THRESHOLD = 5;

export function isLowStock(batchQuantity: number): boolean {
  return batchQuantity > 0 && batchQuantity <= SCARCITY_LOW_THRESHOLD;
}

export function isUrgentStock(batchQuantity: number): boolean {
  return batchQuantity > 0 && batchQuantity <= SCARCITY_URGENT_THRESHOLD;
}
