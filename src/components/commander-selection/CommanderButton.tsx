import { Check, Lock } from 'lucide-react'
import { CommanderAvatar } from '@/components/ui/commander-avatar'
import { cn } from '@/lib/utils'
import { type CommanderButtonProps } from '@/types/components/commander-selection'
import { useCommanderButton } from '@/hooks/use-commander-button'

export function CommanderButton({ name, tierId, category }: CommanderButtonProps) {
  const { isCommanderSelected, isDisabled, handleToggle } = useCommanderButton(
    name,
    category,
    tierId,
  )

  return (
    <button
      disabled={isDisabled}
      onClick={handleToggle}
      className={cn(
        'px-3 py-2 rounded-md border text-xs transition-all text-left flex items-center justify-between group relative overflow-hidden',
        isCommanderSelected
          ? 'bg-yellow-500 border-yellow-500 text-black font-bold'
          : isDisabled
            ? 'bg-black/20 border-white/5 text-neutral-600 cursor-not-allowed'
            : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white',
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden flex-1">
        <CommanderAvatar
          name={name}
          size="sm"
          className={cn('transition-opacity', isDisabled ? 'opacity-40 grayscale' : 'opacity-100')}
        />
        <span className="truncate pr-2 z-10">{name}</span>
      </div>

      <div
        className={cn(
          'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors z-10',
          isCommanderSelected
            ? 'bg-black/20 border-black/40'
            : isDisabled
              ? 'border-neutral-800'
              : 'border-white/20 group-hover:border-white/40',
        )}
      >
        {isCommanderSelected && <Check className="w-3 h-3 text-black" />}
        {isDisabled && <Lock className="w-2.5 h-2.5 text-neutral-700" />}
      </div>
    </button>
  )
}
