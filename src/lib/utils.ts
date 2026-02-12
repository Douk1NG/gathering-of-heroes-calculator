export const LAST_UPDATED = 'Feb 05, 2026'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
