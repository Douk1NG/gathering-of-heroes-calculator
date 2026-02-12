import { Trophy } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChallengeMissionButton } from './ChallengeMissionButton'
import { SpeedupCalculator } from './SpeedupCalculator'
import { ChallengeTotal } from './ChallengeTotal'
import { t, translations } from '@/lib/translations'

import { useChallengeMissions } from '@/hooks/use-challenge-missions'

export function ChallengeCard() {
  const { challengeMissions } = useChallengeMissions()

  return (
    <Card className="flex flex-col border-white/5 bg-white/2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <CardHeader className="bg-yellow-500/5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <CardTitle className="text-lg text-white">
              {t(translations.missionsGrid.challenge.title)}
            </CardTitle>
            <CardDescription>{t(translations.missionsGrid.challenge.rewards)}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-6 flex-1">
        {challengeMissions.map((mission) => (
          <div key={mission.id} className="space-y-2">
            <ChallengeMissionButton
              missionId={mission.id}
              name={t(translations.missionsGrid.challenge[mission.id])}
              tokens={mission.tokens}
            />
            {mission.id === 'troop_power' && <SpeedupCalculator />}
          </div>
        ))}
        <ChallengeTotal />
      </CardContent>
    </Card>
  )
}
