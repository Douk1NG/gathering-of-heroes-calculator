import { CHALLENGE_MISSIONS, COMMANDER_TIERS } from './constants'
import { type SelectedCommander } from '@/types/commander/commander'
import { type MissionState, type SpeedupInputMode } from '@/types/mission/mission'

export function parseSpeedupTime(timeStr: string, mode: SpeedupInputMode = 'auto'): number {
  if (!timeStr) return 0
  const cleanStr = timeStr.trim()
  if (!cleanStr) return 0

  // 1. Explicit Mode: Days
  if (mode === 'days') {
    const days = parseFloat(cleanStr)
    return isNaN(days) ? 0 : Math.floor(days * 1440)
  }

  // 2. Explicit Mode: Minutes
  if (mode === 'minutes') {
    const minutes = parseFloat(cleanStr)
    return isNaN(minutes) ? 0 : Math.floor(minutes)
  }

  // 3. Auto Mode (Existing logic + enhancements)
  let totalMinutes = 0

  // Check for HH:MM:SS or HH:MM format (anywhere in string)
  const timeMatch = cleanStr.match(/(\d+):(\d+)(?::(\d+))?/)
  if (timeMatch) {
    totalMinutes += parseInt(timeMatch[1]) * 60
    totalMinutes += parseInt(timeMatch[2])
  }

  // Check for "Xd Xh Xm" format
  const dayMatch = cleanStr.match(/(\d+)\s*d/i)
  if (dayMatch) totalMinutes += parseInt(dayMatch[1]) * 1440

  const hourMatch = cleanStr.match(/(\d+)\s*h/i)
  // Only match "h" if it's NOT part of the HH:MM extraction?
  // Actually, usually inputs are either "1d 2h" OR "1d 12:00:00".
  // Does "12:00" contain "h"? No.
  if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60

  const minMatch = cleanStr.match(/(\d+)\s*m/i)
  if (minMatch) totalMinutes += parseInt(minMatch[1])

  // Fallback: if just a number is provided in auto mode, treat as minutes if it looks like an integer
  if (totalMinutes === 0 && /^\d+$/.test(cleanStr)) {
    totalMinutes = parseInt(cleanStr)
  }

  return totalMinutes
}

export function formatSpeedupValue(val: number, mode: SpeedupInputMode): string {
  if (val === null || val === undefined) return ''
  if (mode === 'days') {
    const days = val / 1440
    // Show up to 2 decimal places if needed, otherwise integer
    return days % 1 === 0 ? days.toString() : days.toFixed(2)
  }
  return val.toString()
}

// --- Pure Calculation Functions ---

export function calculateSpeedupTokens(
  speedupMinutes: MissionState['speedupMinutes'],
  timeStr: string,
  mode: SpeedupInputMode,
): number {
  const manualMinutes = Object.values(speedupMinutes).reduce((a, b) => a + b, 0)
  const calcMinutes = parseSpeedupTime(timeStr, mode)
  return Math.floor((manualMinutes + calcMinutes) / 480) * 2
}

export function calculateTotalTokens(missions: MissionState, speedupTokens: number): number {
  // 1. Automated Dailies (5 days * 18 tokens per day = 90)
  const dailyTotal = 90

  // 2. Challenge Milestones (Checked challenges only)
  const challengeTotal = CHALLENGE_MISSIONS.reduce((acc, m) => {
    return acc + (missions.challenge[m.id] || 0) * m.tokens
  }, 0)

  // 3. Spending Yields (Strictly from raw volume)
  const gemSpendTokens = Math.floor(missions.totalGemsSpent / 2000) * 30

  return dailyTotal + challengeTotal + gemSpendTokens + speedupTokens
}

export function calculateTotalCost(selectedCommanders: SelectedCommander[]): number {
  if (selectedCommanders.length === 0) return 0

  // 1. Calculate actual cost of selected commanders
  const baseCost = selectedCommanders.reduce((acc, c) => acc + c.cost, 0)

  // 2. Identify the highest tier selected and its minSpend requirement
  let maxMinSpend = 0
  let highestTierId = 0

  selectedCommanders.forEach((c) => {
    const tierKey = `TIER_${c.tierId}` as keyof typeof COMMANDER_TIERS
    const minSpend = COMMANDER_TIERS[tierKey].minSpend
    if (minSpend > maxMinSpend) {
      maxMinSpend = minSpend
    }
    if (c.tierId > highestTierId) {
      highestTierId = c.tierId
    }
  })

  // 3. Cost of commanders in the highest tier selected
  const highestTierCost = selectedCommanders
    .filter((c) => c.tierId === highestTierId)
    .reduce((sum, c) => sum + c.cost, 0)

  // Total cost must be at least minSpend of highest tier (spent on lower tiers) + cost of highest tier items
  return Math.max(baseCost, maxMinSpend + highestTierCost)
}

export function checkUnlockStatus(
  selectedCommanders: SelectedCommander[],
  totalTokens: number,
): boolean {
  if (selectedCommanders.length === 0) return true

  // 1. Find the highest tier selected
  let maxMinSpend = 0
  let highestTierId = 0

  selectedCommanders.forEach((c) => {
    const tierKey = `TIER_${c.tierId}` as keyof typeof COMMANDER_TIERS
    const minSpend = COMMANDER_TIERS[tierKey].minSpend
    if (minSpend > maxMinSpend) {
      maxMinSpend = minSpend
    }
    if (c.tierId > highestTierId) {
      highestTierId = c.tierId
    }
  })

  // 2. Check if total tokens meet the highest tier's minSpend
  if (totalTokens < maxMinSpend) return false

  // 3. Check if current selections in lower tiers meet the requirements for higher tiers
  for (const c of selectedCommanders) {
    const tierKey = `TIER_${c.tierId}` as keyof typeof COMMANDER_TIERS
    const requiredLowerSpend = COMMANDER_TIERS[tierKey].minSpend

    if (requiredLowerSpend > 0) {
      const actualLowerSpend = selectedCommanders
        .filter((lower) => lower.name !== c.name && lower.tierId < c.tierId)
        .reduce((sum, lower) => sum + lower.cost, 0)

      if (actualLowerSpend < requiredLowerSpend) return false
    }
  }

  return true
}

export function checkTierUnlock(selectedCommanders: SelectedCommander[], tierId: number): boolean {
  const tierKey = `TIER_${tierId}` as keyof typeof COMMANDER_TIERS
  const requiredLowerSpend = COMMANDER_TIERS[tierKey].minSpend

  if (requiredLowerSpend === 0) return true

  const actualLowerSpend = selectedCommanders
    .filter((c) => c.tierId < tierId)
    .reduce((sum, c) => sum + c.cost, 0)

  return actualLowerSpend >= requiredLowerSpend
}

export function getTierUnlockRequirement(
  selectedCommanders: SelectedCommander[],
  tierId: number,
): { amount: number; tiers: string } | null {
  const tierKey = `TIER_${tierId}` as keyof typeof COMMANDER_TIERS
  const requiredLowerSpend = COMMANDER_TIERS[tierKey].minSpend

  if (requiredLowerSpend === 0) return null

  const actualLowerSpend = selectedCommanders
    .filter((c) => c.tierId < tierId)
    .reduce((sum, c) => sum + c.cost, 0)

  if (actualLowerSpend >= requiredLowerSpend) return null

  const difference = requiredLowerSpend - actualLowerSpend
  const lowerTiersString = Array.from({ length: tierId - 1 }, (_, i) => i + 1).join(' & ')

  return { amount: difference, tiers: lowerTiersString }
}
