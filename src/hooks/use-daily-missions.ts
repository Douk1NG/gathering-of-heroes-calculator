import { DAILY_MISSIONS } from '@/lib/constants'

export function useDailyMissions() {
  const totalDailyYield = 90 // 18 tokens/day * 5 days

  const getDailyMissions = () => {
    return DAILY_MISSIONS.map((mission) => ({
      ...mission,
      fiveDayTotal: mission.tokens * 5,
    }))
  }

  return {
    dailyMissions: getDailyMissions(),
    totalDailyYield,
  }
}
