import { useCommanderItems } from '@/hooks/use-commander-items'
import { CommanderItem } from './CommanderItem'

export function CommanderItems() {
  const { selectedCommanders } = useCommanderItems()

  return (
    <div className="flex-1 min-h-0 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
      {selectedCommanders.length > 0 ? (
        selectedCommanders.map((commander) => (
          <CommanderItem key={commander.name} commander={commander} />
        ))
      ) : (
        <div className="py-8 text-center border-2 border-dashed border-black/10 rounded-xl">
          <p className="text-sm font-bold opacity-40">No commanders selected</p>
        </div>
      )}
    </div>
  )
}
