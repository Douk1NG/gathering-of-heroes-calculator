import { useCalculatorStore } from '@/store/use-calculator-store'

/**
 * useCommanderItems - Hook to manage selected commander list logic
 * Follows rule: Components logic on custom hooks
 */
export function useCommanderItems() {
  const selectedCommanders = useCalculatorStore((state) => state.selectedCommanders)
  const toggleCommander = useCalculatorStore((state) => state.toggleCommander)

  return {
    selectedCommanders,
    toggleCommander,
  }
}
