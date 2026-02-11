export const COMMANDER_TIERS = {
  TIER_1: {
    id: 1,
    name: 'Tier 1',
    cost: 200,
    minSpend: 0,
  },
  TIER_2: {
    id: 2,
    name: 'Tier 2',
    cost: 500,
    minSpend: 400,
  },
  TIER_3: {
    id: 3,
    name: 'Tier 3',
    cost: 1000,
    minSpend: 1400,
  },
} as const

export const MISSION_TYPES = {
  DAILY: 'Daily Missions',
  CHALLENGE: 'Challenge Missions',
  REPEATABLE: 'Repeatable Missions',
} as const

export const DAILY_MISSIONS = [
  { id: 'login', name: 'Log In', tokens: 2 },
  { id: 'barbs', name: 'Defeat Barbarians (100)', tokens: 10 },
  { id: 'gather', name: 'Gather 2Million Resources', tokens: 6 },
] as const

export const CHALLENGE_MISSIONS = [
  { id: 'login5', name: 'Log In 5 Days', tokens: 10 },
  { id: 'gems10k', name: 'Spend 10k Gems', tokens: 20 },
  { id: 'gems50k', name: 'Spend 50k Gems', tokens: 100 },
  { id: 'troop_power', name: 'Increase Troop Power (600k)', tokens: 100 },
] as const

export const REPEATABLE_MISSIONS = [
  { id: 'gems2k', name: 'Spend 2k Gems', tokens: 30 },
  { id: 'speedups', name: 'Use 480m Speedups', tokens: 2 },
] as const

export const EVENT_DURATION_DAYS = 5

export const COMMANDER_CATEGORIES = {
  INFANTRY: 'Infantry',
  ARCHER: 'Archer',
  CAVALRY: 'Cavalry',
  LEADERSHIP: 'Leadership',
  ENGINEERING: 'Engineering',
} as const
