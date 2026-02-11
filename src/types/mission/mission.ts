export type SpeedupInputMode = 'auto' | 'days' | 'minutes'

export type SpeedupMinutes = {
  building: number
  research: number
  training: number
  healing: number
  universal: number
}

export type MissionState = {
  daily: Record<string, number>
  challenge: Record<string, number>
  repeatable: Record<string, number>
  speedupMinutes: SpeedupMinutes
  totalGemsSpent: number
}
