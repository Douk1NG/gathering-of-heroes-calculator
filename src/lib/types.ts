import { type CommanderCategory } from './constants'

export type SpeedupInputMode = 'auto' | 'days' | 'minutes'

export interface MissionState {
  daily: Record<string, number>
  challenge: Record<string, number>
  repeatable: Record<string, number>
  speedupMinutes: {
    building: number
    research: number
    training: number
    healing: number
    universal: number
  }
  totalGemsSpent: number
}

export interface SelectedCommander {
  name: string
  tierId: number
  category: CommanderCategory
  cost: number
}

export interface CommanderData {
  name: string
  tier: number
  category: CommanderCategory
}
