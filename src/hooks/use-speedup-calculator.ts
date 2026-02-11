import { useCalculatorStore } from '@/store/use-calculator-store'

/**
 * useSpeedupCalculator - Hook for managing training speedup calculations
 */
export function useSpeedupCalculator() {
  const speedupTimeStr = useCalculatorStore((state) => state.speedupTimeStr)
  const updateSpeedupTime = useCalculatorStore((state) => state.updateSpeedupTime)
  const getSpeedupMinutes = useCalculatorStore((state) => state.getSpeedupMinutes)

  const calculatedMinutes = getSpeedupMinutes()
  const calculatedTokens = Math.floor(calculatedMinutes / 480) * 2

  return {
    speedupTimeStr,
    updateSpeedupTime,
    calculatedMinutes,
    calculatedTokens,
  }
}
