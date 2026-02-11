import { useCalculatorStore } from '@/store/use-calculator-store'
import { COMMANDERS } from '@/lib/utils'
import { COMMANDER_TIERS } from '@/lib/constants'

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
