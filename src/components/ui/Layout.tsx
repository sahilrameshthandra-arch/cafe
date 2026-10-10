'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'narrow' | 'content' | 'prose' | 'full'
  children: ReactNode
}

export function Container({ className, size = 'content', children, ...props }: ContainerProps) {
  const sizes = {
    narrow: 'max-w-narrow',
    content: 'max-w-content',
    prose: 'max-w-prose',
    full: 'max-w-full',
  }

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)} {...props}>
      {children}
    </div>
  )
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'default' | 'lg'
  children: ReactNode
}

export function Section({ className, size = 'default', children, ...props }: SectionProps) {
  const sizes = {
    sm: 'py-10 sm:py-14 lg:py-16',
    default: 'py-16 sm:py-20 lg:py-24 xl:py-28',
    lg: 'py-20 sm:py-28 lg:py-32 xl:py-36',
  }

  return (
    <section className={cn(sizes[size], className)} {...props}>
      {children}
    </section>
  )
}