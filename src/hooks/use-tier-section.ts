import { useCalculatorStore } from '@/store/use-calculator-store'

/**
 * useTierSection - Hook for managing tier lock status and requirements
 */
export function useTierSection(tierId: number) {
  const isUnlocked = useCalculatorStore((state) => state.isTierUnlocked(tierId))

  // We select the pieces of lockReason individually to maintain reference stability
  // because getTierUnlockRequirement returns a new object literal every time.
  const lockReasonAmount = useCalculatorStore(
    (state) => state.getTierUnlockRequirement(tierId)?.amount,
  )
  const lockReasonTiers = useCalculatorStore(
    (state) => state.getTierUnlockRequirement(tierId)?.tiers,
  )

  const lockReason =
    lockReasonAmount !== undefined
      ? { amount: lockReasonAmount, tiers: lockReasonTiers || '' }
      : null

  return {
    isUnlocked,
    lockReason,
  }
}
