'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps<C extends 'button' | 'a'> = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, 'variant' | 'size' | 'loading' | 'as'>

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps<'button'>
>(({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-fast ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-soft hover:shadow-medium',
    secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300 border border-secondary-200',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    ghost: 'text-secondary-600 hover:bg-secondary-100 active:bg-secondary-200',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-button rounded-lg',
    lg: 'px-8 py-4 text-body rounded-xl',
  }

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

// Polymorphic LinkButton for rendering as <a> tags
type LinkButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'a'>, 'variant' | 'size' | 'loading' | 'disabled'>

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-fast ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'

    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-soft hover:shadow-medium',
      secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300 border border-secondary-200',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
      ghost: 'text-secondary-600 hover:bg-secondary-100 active:bg-secondary-200',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-button rounded-lg',
      lg: 'px-8 py-4 text-body rounded-xl',
    }

    const isDisabled = disabled || loading

    return (
      <a
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], isDisabled && 'opacity-50 pointer-events-none', className)}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </a>
    )
  }
)

LinkButton.displayName = 'LinkButton'