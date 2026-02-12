import common from '@/translations/en/common.json'
import header from '@/translations/en/header.json'
import commandersList from '@/translations/en/commanders-list.json'
import commanderSelection from '@/translations/en/commander-selection.json'
import missionsGrid from '@/translations/en/missions-grid.json'
import tipsTricks from '@/translations/en/tips-tricks.json'
import githubActions from '@/translations/en/github-actions.json'
import journeyProgress from '@/translations/en/journey-progress.json'

import type { TranslationKey, TranslationKeys, Translations } from '@/types/common/translations'

export const en = {
  common,
  header,
  commandersList,
  commanderSelection,
  missionsGrid,
  tipsTricks,
  githubActions,
  journeyProgress,
}

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

export function createTranslationKeys<T extends Record<string, unknown>, Prefix extends string>(
  prefix: Prefix,
  obj: T,
): TranslationKeys<T, `${Prefix}.`> {
  const result = {} as Record<string, unknown>

  for (const key in obj) {
    const value = obj[key]
    const fullKey = `${prefix}.${key}` as const

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = createTranslationKeys(fullKey, value as Record<string, unknown>)
    } else {
      result[key] = fullKey
    }
  }

  return result as TranslationKeys<T, `${Prefix}.`>
}

export const translations = {
  common: createTranslationKeys('common', common),
  header: createTranslationKeys('header', header),
  commandersList: createTranslationKeys('commandersList', commandersList),
  commanderSelection: createTranslationKeys('commanderSelection', commanderSelection),
  missionsGrid: createTranslationKeys('missionsGrid', missionsGrid),
  tipsTricks: createTranslationKeys('tipsTricks', tipsTricks),
  githubActions: createTranslationKeys('githubActions', githubActions),
  journeyProgress: createTranslationKeys('journeyProgress', journeyProgress),
} as const
