import { en } from '@/lib/translations'

export type Translations = typeof en

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

export type Leaves<T> = T extends object ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T] : ''

export type TranslationKey = Leaves<Translations>

export type TranslationKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? TranslationKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`
}
