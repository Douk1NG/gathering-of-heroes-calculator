export type CommanderCategory = 'Infantry' | 'Archer' | 'Cavalry' | 'Leadership' | 'Engineering'

export type CommanderTier = {
  id: number
  name: string
  cost: number
  minSpend: number
}

export type SelectedCommander = {
  name: string
  tierId: number
  category: CommanderCategory
  cost: number
}

export type CommanderData = {
  name: string
  tier: number
  category: CommanderCategory
}
