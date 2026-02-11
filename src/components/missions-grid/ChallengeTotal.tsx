import { t } from '@/lib/utils'
import { T } from '@/translations'
import { useChallengeTotal } from '@/hooks/use-challenge-total'

export function ChallengeTotal() {
  const { challengeTotal } = useChallengeTotal()

  return (
    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
        {t(T.missionsGrid.challenge.total)}
      </span>
      <span className="text-xl font-black text-yellow-500">
        {challengeTotal} {t(T.commandersList.tokens)}
      </span>
    </div>
  )
}
