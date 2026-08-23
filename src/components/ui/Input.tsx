import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftAddon, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[#111827] font-body"
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <div className="relative flex">
          {leftAddon && (
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E5E0D8] bg-[#F5F2EC] text-sm text-gray-500 font-medium">
              {leftAddon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full px-4 py-3 text-sm font-body text-[#111827] placeholder-gray-400',
              'bg-white border border-[#E5E0D8] transition-colors duration-150',
              'focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10',
              leftAddon ? 'rounded-r-xl' : 'rounded-xl',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
              className
            )}
            aria-describedby={
              error ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            aria-invalid={!!error}
            {...props}
          />
        </div>

        {error && (
          <p id={`${id}-error`} className="text-xs text-red-600 font-body" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${id}-hint`} className="text-xs text-gray-500 font-body">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#111827] font-body">
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 text-sm font-body text-[#111827] placeholder-gray-400',
            'bg-white border border-[#E5E0D8] rounded-xl transition-colors duration-150 resize-none',
            'focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600 font-body" role="alert">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-gray-500 font-body">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#111827] font-body">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 text-sm font-body text-[#111827]',
            'bg-white border border-[#E5E0D8] rounded-xl transition-colors duration-150',
            'focus:outline-none focus:border-[#1E392A] focus:ring-2 focus:ring-[#1E392A]/10',
            error && 'border-red-400',
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-600 font-body" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
