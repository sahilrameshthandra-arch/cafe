'use client'

import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full rounded-lg border border-border bg-background px-4 py-3 text-body text-text-primary placeholder:text-text-muted transition-all duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-border bg-background px-4 py-3 text-body text-text-primary placeholder:text-text-muted transition-all duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none disabled:opacity-50 disabled:pointer-events-none resize-y min-h-[120px]',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('block mb-2 text-body-sm font-medium text-text-primary', className)}
      {...props}
    />
  )
)
Label.displayName = 'Label'

export function InputError({ message }: { message: string }) {
  return <p className="mt-1.5 text-body-sm text-red-600" role="alert">{message}</p>
}