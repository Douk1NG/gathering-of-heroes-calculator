import { useShallow } from 'zustand/react/shallow'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { type CommanderCategory } from '@/types/commander/commander'

/**
 * useCategoryTabs - Hook for managing category selection in the commander selection grid
 */
export function useCategoryTabs() {
  const { selectedCategory, setSelectedCategory } = useCalculatorStore(
    useShallow((state) => ({
      selectedCategory: state.selectedCategory,
      setSelectedCategory: state.setSelectedCategory,
    })),
  )

  const handleCategorySelect = (category: CommanderCategory) => {
    setSelectedCategory(category)
  }

  return {
    selectedCategory,
    handleCategorySelect,
  }
}
