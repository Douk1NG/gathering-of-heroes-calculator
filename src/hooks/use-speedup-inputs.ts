import { useCalculatorStore } from '@/store/use-calculator-store'
import { formatSpeedupValue, parseSpeedupTime } from '@/lib/calculations'
import { type MissionState } from '@/types/mission/mission'

/**
 * useSpeedupInputs - Hook for managing speedup input values and modes
 * Centralizes state selection and handlers for the SpeedupInputs component
 */
export function useSpeedupInputs() {
  const speedupMinutes = useCalculatorStore((state) => state.missions.speedupMinutes)
  const updateSpeedupMinutes = useCalculatorStore((state) => state.updateSpeedupMinutes)
  const getSpeedupMinutes = useCalculatorStore((state) => state.getSpeedupMinutes)
  const speedupInputMode = useCalculatorStore((state) => state.speedupInputMode)
  const setSpeedupInputMode = useCalculatorStore((state) => state.setSpeedupInputMode)

  const manualSpeedupMinutes = Object.values(speedupMinutes).reduce((a, b) => a + b, 0)
  const calcMinutes = getSpeedupMinutes()
  const totalSpeedupTokens = Math.floor((manualSpeedupMinutes + calcMinutes) / 480) * 2

  const handleInputChange = (cat: string, value: string) => {
    const newVal = parseSpeedupTime(value, speedupInputMode)
    updateSpeedupMinutes(cat as keyof MissionState['speedupMinutes'], newVal)
  }

  const getDisplayValue = (val: number) => formatSpeedupValue(val, speedupInputMode)

  return {
    speedupMinutes,
    speedupInputMode,
    setSpeedupInputMode,
    manualSpeedupMinutes,
    calcMinutes,
    totalSpeedupTokens,
    handleInputChange,
    getDisplayValue,
  }
}
