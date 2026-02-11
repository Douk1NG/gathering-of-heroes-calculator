import { Trash2 } from 'lucide-react'
import { CommanderAvatar } from '@/components/ui/commander-avatar'
import { useCommanderItem } from '@/hooks/use-commander-item'
import { type CommanderItemProps } from '@/types/components/commanders-list'

export function CommanderItem({ commander }: CommanderItemProps) {
  const { handleRemove } = useCommanderItem(commander)

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-black/5 border border-black/10 group animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3">
        <CommanderAvatar name={commander.name} size="md" />
        <div>
          <p className="font-bold text-sm text-white">{commander.name}</p>
          <p className="text-[10px] text-black font-mono">
            TIER {commander.tierId} • {commander.cost} TOKENS
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleRemove}
          className="p-1.5 rounded-md hover:bg-black/10 text-black/40 hover:text-black transition-colors"
          aria-label={`Remove ${commander.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
