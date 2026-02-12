import { useCalculatorStore } from '@/store/use-calculator-store'
import { COMMANDER_TIERS } from '@/lib/constants'
import { COMMANDERS } from '@/lib/data/commanders'

export function useCommanderList() {
  const selectedCategory = useCalculatorStore((state) => state.selectedCategory)

  const getCommandersInTier = (tierId: number) => {
    if (!selectedCategory) return []
    return COMMANDERS.filter(
      (commander) => commander.tier === tierId && commander.category === selectedCategory,
    )
  }

  const tiers = Object.values(COMMANDER_TIERS)

  return {
    selectedCategory,
    tiers,
    getCommandersInTier,
  }
}
