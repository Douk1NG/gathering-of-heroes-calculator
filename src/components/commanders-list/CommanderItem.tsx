import { Trash2 } from 'lucide-react'
import { CommanderAvatar } from '@/components/ui/commander-avatar'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { type SelectedCommander } from '@/lib/utils'

interface CommanderItemProps {
  commander: SelectedCommander
}

/**
 * CommanderItem - Individual commander card in the list
 * Shows commander details and allows removal
 * Only re-renders when this specific commander changes
 */
export function CommanderItem({ commander }: CommanderItemProps) {
  const toggleCommander = useCalculatorStore((state) => state.toggleCommander)

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
          onClick={() => toggleCommander(commander.name, commander.category, commander.tierId)}
          className="p-1.5 rounded-md hover:bg-black/10 text-black/40 hover:text-black transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
