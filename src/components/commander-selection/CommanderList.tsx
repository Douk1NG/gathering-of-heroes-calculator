import { useCalculatorStore } from '@/store/use-calculator-store'
import { COMMANDERS, t } from '@/lib/utils'
import { COMMANDER_TIERS } from '@/lib/constants'
import { TierSection } from './TierSection'
import { CategoryHeader } from './CategoryHeader'
import { T } from '@/translations'

export function CommanderList() {
  const selectedCategory = useCalculatorStore((state) => state.selectedCategory)

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

      {Object.values(COMMANDER_TIERS).map((tier) => {
        const commandersInTier = COMMANDERS.filter(
          (c) => c.tier === tier.id && c.category === selectedCategory,
        )

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
