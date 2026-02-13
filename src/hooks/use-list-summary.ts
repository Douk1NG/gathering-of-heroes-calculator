import { useCalculatorStore } from '@/store/use-calculator-store'

/**
 * useListSummary - Hook for managing the commander list summary data
 */
export function useListSummary() {
  const tokensNeeded = useCalculatorStore((state) => state.getNeededTokens())
  const totalCost = useCalculatorStore((state) => state.getTotalCost())
  const totalGathered = useCalculatorStore((state) => state.getTotalTokens())
  const progress = useCalculatorStore((state) => state.getProgress())

  return {
    tokensNeeded,
    totalCost,
    totalGathered,
    progress,
  }
}
