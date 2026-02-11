import { useCalculatorStore } from '@/store/use-calculator-store'

/**
 * useRepeatableTotal - Hook for calculating total tokens from repeatable missions
 */
export function useRepeatableTotal() {
  const totalGemsSpent = useCalculatorStore((state) => state.missions.totalGemsSpent)
  const speedupMinutes = useCalculatorStore((state) => state.missions.speedupMinutes)
  const getSpeedupMinutes = useCalculatorStore((state) => state.getSpeedupMinutes)

  const gemSpendTokens = Math.floor(totalGemsSpent / 2000) * 30
  const manualSpeedupMinutes = Object.values(speedupMinutes).reduce((a, b) => a + b, 0)
  const calcMinutes = getSpeedupMinutes()
  const totalSpeedupTokens = Math.floor((manualSpeedupMinutes + calcMinutes) / 480) * 2
  const repeatableTotal = gemSpendTokens + totalSpeedupTokens

  return {
    repeatableTotal,
  }
}
