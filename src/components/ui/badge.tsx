import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-primary text-white': variant === 'default',
          'bg-gray-100 text-gray-900': variant === 'secondary',
          'bg-accent-green text-white': variant === 'success',
          'bg-accent-yellow text-gray-900': variant === 'warning',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }



