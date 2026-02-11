import { useCalculatorStore } from '@/store/use-calculator-store'
import { CHALLENGE_MISSIONS } from '@/lib/constants'

/**
 * useChallengeTotal - Hook for calculating total tokens from challenge missions
 */
export function useChallengeTotal() {
  const challengeMissions = useCalculatorStore((state) => state.missions.challenge)

  const challengeTotal = CHALLENGE_MISSIONS.reduce((acc, m) => {
    return acc + (challengeMissions[m.id] ? m.tokens : 0)
  }, 0)

  return {
    challengeTotal,
  }
}
