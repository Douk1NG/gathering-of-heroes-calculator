export const LAST_UPDATED = 'Feb 05, 2026'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { en } from '@/translations'
import { type TranslationKey, type Translations } from '@/types/common/translations'

export function t(path: TranslationKey, params?: Record<string, string | number>): string {
  const keys = (path as string).split('.')
  let value: Translations | string | undefined = en

  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, string | object>)[key] as Translations | string | undefined
    } else {
      value = undefined
      break
    }
  }

  if (!value || typeof value !== 'string') return path

  if (params) {
    let result = value
    Object.entries(params).forEach(([k, v]) => {
      result = result.replace(`{${k}}`, String(v))
    })
    return result
  }

  return value
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to get commander image path
// Assumes images are in public/commanders/ with format "name-lower-kebab.png"
export function getCommanderImageSrc(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/['.]/g, '')
  const baseUrl = import.meta.env.BASE_URL
  return `${baseUrl}commanders/${slug}.png`
}

export function formatGemValue(val: number): string {
  // Fix: Strictly check for null/undefined to allow 0 to be formatted correctly
  if (val === null || val === undefined) return ''

  // Use browser locale if available, fallback to de-DE for dot-separators if needed
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'de-DE'
  return new Intl.NumberFormat(locale).format(val)
}

export function parseGemValue(val: string): number {
  // Support both dot and comma as thousands separators for safety
  const rawValue = val.replace(/[.,]/g, '')
  if (/^\d*$/.test(rawValue)) {
    return parseInt(rawValue) || 0
  }
  return 0
}

// Explicit Exports (Replacing dangerous Barrel File 'export *')
// This prevents circular dependencies and name collisions, and improves tree-shaking

export {
  parseSpeedupTime,
  formatSpeedupValue,
  calculateSpeedupTokens,
  calculateTotalTokens,
  calculateTotalCost,
  checkUnlockStatus,
  checkTierUnlock,
  getTierUnlockRequirement,
} from './calculations'

export { COMMANDERS } from './data/commanders'

export {
  COMMANDER_TIERS,
  MISSION_TYPES,
  DAILY_MISSIONS,
  CHALLENGE_MISSIONS,
  REPEATABLE_MISSIONS,
  EVENT_DURATION_DAYS,
  COMMANDER_CATEGORIES,
} from './constants'
