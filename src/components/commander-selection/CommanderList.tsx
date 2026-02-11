import { TierSection } from './TierSection'
import { CategoryHeader } from './CategoryHeader'
import { t } from '@/lib/utils'
import { T } from '@/translations'
import { useCommanderList } from '@/hooks/use-commander-list'

export function CommanderList() {
  const { selectedCategory, tiers, getCommandersInTier } = useCommanderList()

  if (!selectedCategory) {
    return (
      <div className="py-8 text-center text-neutral-600 text-sm italic">
        {t(T.commanderSelection.placeholder)}
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
      <CategoryHeader />

      {tiers.map((tier) => {
        const commandersInTier = getCommandersInTier(tier.id)

        if (commandersInTier.length === 0) return null

        return (
          <TierSection
            key={tier.id}
            tierId={tier.id}
            category={selectedCategory}
            commanders={commandersInTier}
          />
        )
      })}
    </div>
  )
}
