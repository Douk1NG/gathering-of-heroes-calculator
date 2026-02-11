import { useCalculatorStore } from '@/store/use-calculator-store'
import { type SelectedCommander } from '@/lib/utils'

/**
 * useCommanderItem - Hook for managing an individual commander item in the list
 */
export function useCommanderItem(commander: SelectedCommander) {
  const toggleCommander = useCalculatorStore((state) => state.toggleCommander)

  const handleRemove = () => {
    toggleCommander(commander.name, commander.category, commander.tierId)
  }

  return {
    handleRemove,
  }
}
