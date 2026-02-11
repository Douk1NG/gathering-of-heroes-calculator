import { useState } from 'react'
import { User } from 'lucide-react'
import { cn, getCommanderImageSrc } from '@/lib/utils'

interface CommanderAvatarProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

// Global cache for failed images to prevent re-fetching on remount
const failedImages = new Set<string>()

export function CommanderAvatar({ name, className, size = 'md' }: CommanderAvatarProps) {
  const imageSrc = getCommanderImageSrc(name)
  const [hasError, setHasError] = useState(() => failedImages.has(imageSrc))

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/10',
        sizeClasses[size],
        className,
      )}
    >
      {!hasError ? (
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => {
            failedImages.add(imageSrc)
            setHasError(true)
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-500">
          <User className="w-1/2 h-1/2" />
        </div>
      )}
    </div>
  )
}
