import { CheckCircle2 } from 'lucide-react'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { cn, t } from '@/lib/utils'
import { T } from '@/translations'

interface ChallengeMissionButtonProps {
  missionId: string
  name: string
  tokens: number
}

/**
 * ChallengeMissionButton - Individual challenge mission toggle
 * Only re-renders when this specific mission's state changes
 */
export function ChallengeMissionButton({ missionId, name, tokens }: ChallengeMissionButtonProps) {
  const isCompleted = useCalculatorStore((state) => state.missions.challenge[missionId])
  const updateChallenge = useCalculatorStore((state) => state.updateChallenge)

  return (
    <button
      onClick={() => updateChallenge(missionId, isCompleted ? 0 : 1)}
      className={cn(
        'w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left group',
        isCompleted
          ? 'bg-yellow-500/10 border-yellow-500/50 text-white'
          : 'bg-black/40 border-white/5 text-neutral-500 hover:border-white/10',
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">
          +{tokens} {t(T.commandersList.tokens)}
        </span>
      </div>
      {isCompleted ? (
        <CheckCircle2 className="w-5 h-5 text-yellow-500" />
      ) : (
        <div className="w-5 h-5 rounded-full border border-white/10 group-hover:border-white/20" />
      )}
    </button>
  )
}
