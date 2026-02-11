import * as React from 'react'
import { cn } from '../../lib/utils'
import { type ButtonProps } from '@/types/components/ui'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white text-black hover:bg-white/90',
      outline: 'border border-white/20 bg-transparent hover:bg-white/10 text-white',
      ghost: 'hover:bg-white/10 text-white',
      gold: 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-[0_0_15px_rgba(202,138,4,0.3)]',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
          variants[variant],
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
