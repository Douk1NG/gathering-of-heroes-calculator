import { useCalculatorStore } from '@/store/use-calculator-store'
import { formatGemValue, parseGemValue } from '@/lib/utils'

/**
 * useGemsInput - Hook for managing gem spending input and yields
 */
export function useGemsInput() {
  const totalGemsSpent = useCalculatorStore((state) => state.missions.totalGemsSpent)
  const updateGemsSpent = useCalculatorStore((state) => state.updateGemsSpent)

  const gemSpendTokens = Math.floor(totalGemsSpent / 2000) * 30

  const handleInputChange = (value: string) => {
    const newVal = parseGemValue(value)
    updateGemsSpent(newVal)
  }

  const displayValue = formatGemValue(totalGemsSpent)

  return {
    totalGemsSpent,
    gemSpendTokens,
    handleInputChange,
    displayValue,
  }
}
