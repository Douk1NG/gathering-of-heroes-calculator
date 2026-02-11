import { useCalculatorStore } from '@/store/use-calculator-store'
import { useShallow } from 'zustand/react/shallow'

export function useJourneyProgress() {
  return useCalculatorStore(
    useShallow((state) => ({
      totalTokens: state.getTotalTokens(),
      totalCost: state.getTotalCost(),
      progress: state.getProgress(),
    })),
  )
}

export function useStatusIndicators() {
  return useCalculatorStore(
    useShallow((state) => ({
      isUnlocked: state.getUnlockStatus(),
      hasSelection: state.selectedCommanders.length > 0,
    })),
  )
}
