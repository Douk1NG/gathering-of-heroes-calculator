import common from './en/common.json'
import header from './en/header.json'
import commandersList from './en/commanders-list.json'
import commanderSelection from './en/commander-selection.json'
import missionsGrid from './en/missions-grid.json'
import tipsTricks from './en/tips-tricks.json'
import githubActions from './en/github-actions.json'
import journeyProgress from './en/journey-progress.json'

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

export type Translations = typeof en

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

export type Leaves<T> = T extends object ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T] : ''

export type TranslationKey = Leaves<Translations>

// Strictly typed dictionary of translation keys
// This allows us to use T.missionsGrid.daily.title instead of magic strings
export const T = {
  common: {
    tiers: {
      1: 'common.tiers.1',
      2: 'common.tiers.2',
      3: 'common.tiers.3',
      4: 'common.tiers.4',
      5: 'common.tiers.5',
    } as const,
    categories: {
      Infantry: 'common.categories.Infantry',
      Cavalry: 'common.categories.Cavalry',
      Archer: 'common.categories.Archer',
      Leadership: 'common.categories.Leadership',
      Integration: 'common.categories.Integration',
      Engineering: 'common.categories.Engineering',
    } as const,
    speedupCategories: {
      building: 'common.speedupCategories.building',
      research: 'common.speedupCategories.research',
      training: 'common.speedupCategories.training',
      healing: 'common.speedupCategories.healing',
      universal: 'common.speedupCategories.universal' as const,
    },
    tierUnlockRequirement: 'common.tierUnlockRequirement' as const,
  },
  header: {
    title: 'header.title',
    description: 'header.description',
    lastUpdated: 'header.lastUpdated',
    subtitle: 'header.subtitle',
    disclaimer: 'header.disclaimer',
  } as const,
  commandersList: {
    title: 'commandersList.title',
    tokens: 'commandersList.tokens',
    cost: 'commandersList.cost',
  } as const,
  commanderSelection: {
    title: 'commanderSelection.title',
    description: 'commanderSelection.description',
    placeholder: 'commanderSelection.placeholder',
    search: 'commanderSelection.search',
    commandersHeader: 'commanderSelection.commandersHeader',
  } as const,
  missionsGrid: {
    daily: {
      title: 'missionsGrid.daily.title',
      login: 'missionsGrid.daily.login',
      barbs: 'missionsGrid.daily.barbs',
      gather: 'missionsGrid.daily.gather',
      limit: 'missionsGrid.daily.limit',
      assumed: 'missionsGrid.daily.assumed',
      perDay: 'missionsGrid.daily.perDay',
      totalSuffix: 'missionsGrid.daily.totalSuffix',
      yield: 'missionsGrid.daily.yield',
    } as const,
    challenge: {
      title: 'missionsGrid.challenge.title',
      login5: 'missionsGrid.challenge.login5',
      gems10k: 'missionsGrid.challenge.gems10k',
      gems50k: 'missionsGrid.challenge.gems50k',
      troop_power: 'missionsGrid.challenge.troop_power',
      rewards: 'missionsGrid.challenge.rewards',
      total: 'missionsGrid.challenge.total',
    } as const,
    repeatable: {
      title: 'missionsGrid.repeatable.title',
      gems2k: 'missionsGrid.repeatable.gems2k',
      speedups: 'missionsGrid.repeatable.speedups',
      yields: 'missionsGrid.repeatable.yields',
      total: 'missionsGrid.repeatable.total',
    } as const,
    speedupCalculator: {
      title: 'missionsGrid.speedupCalculator.title',
      total: 'missionsGrid.speedupCalculator.total',
      calculate: 'missionsGrid.speedupCalculator.calculate',
      useResults: 'missionsGrid.speedupCalculator.useResults',
      calculatedAddition: 'missionsGrid.speedupCalculator.calculatedAddition',
      ratio: 'missionsGrid.speedupCalculator.ratio',
      manualTitle: 'missionsGrid.speedupCalculator.manualTitle',
      totalPackaged: 'missionsGrid.speedupCalculator.totalPackaged',
      yield: 'missionsGrid.speedupCalculator.yield',
      accumulatorNote: 'missionsGrid.speedupCalculator.accumulatorNote',
      manualPlaceholder: 'missionsGrid.speedupCalculator.manualPlaceholder',
    } as const,
    gemsCalculator: {
      title: 'missionsGrid.gemsCalculator.title',
      available: 'missionsGrid.gemsCalculator.available',
      placeholder: 'missionsGrid.gemsCalculator.placeholder',
      ratio: 'missionsGrid.gemsCalculator.ratio',
      yield: 'missionsGrid.gemsCalculator.yield',
    } as const,
  },
  tipsTricks: {
    title: 'tipsTricks.title',
    tip1: {
      part1: 'tipsTricks.tip1.part1',
      part2: 'tipsTricks.tip1.part2',
      part3: 'tipsTricks.tip1.part3',
      part4: 'tipsTricks.tip1.part4',
    } as const,
    tip2: {
      part1: 'tipsTricks.tip2.part1',
      part2: 'tipsTricks.tip2.part2',
    } as const,
  },
  githubActions: {
    star: 'githubActions.star',
    githubUser: 'githubActions.githubUser',
  } as const,
  journeyProgress: {
    title: 'journeyProgress.title',
    started: 'journeyProgress.started',
    complete: 'journeyProgress.complete',
    gatheredTokens: 'journeyProgress.gatheredTokens',
    tiersUnlocked: 'journeyProgress.tiersUnlocked',
  } as const,
} as const
