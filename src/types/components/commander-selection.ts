import { type CommanderCategory, type CommanderData } from '../commander/commander'

export type CommanderButtonProps = {
  name: string
  tierId: number
  category: CommanderCategory
}

export type TierSectionProps = {
  tierId: number
  category: CommanderCategory
  commanders: CommanderData[]
}

export type CategoryTabProps = {
  category: CommanderCategory
}
