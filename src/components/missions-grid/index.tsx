import { DailyCard } from './DailyCard'
import { ChallengeCard } from './ChallengeCard'
import { RepeatableCard } from './RepeatableCard'

export function MissionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DailyCard />
      <ChallengeCard />
      <RepeatableCard />
    </div>
  )
}
