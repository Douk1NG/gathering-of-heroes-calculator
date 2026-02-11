import { useCalculatorStore } from '@/store/use-calculator-store'

/**
 * useChallengeMission - Hook for handling challenge mission completion state
 */
export function useChallengeMission(missionId: string) {
  const isCompleted = useCalculatorStore((state) => state.missions.challenge[missionId])
  const updateChallenge = useCalculatorStore((state) => state.updateChallenge)

  const toggleStatus = () => {
    updateChallenge(missionId, isCompleted ? 0 : 1)
  }

  return {
    isCompleted,
    toggleStatus,
  }
}
