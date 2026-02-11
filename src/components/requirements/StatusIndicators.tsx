import { CheckCircle2 } from 'lucide-react'
import { useStatusIndicators } from '@/hooks/use-requirements'
import { t } from '@/lib/utils'
import { T } from '@/translations'

export function StatusIndicators() {
  const { isUnlocked, hasSelection } = useStatusIndicators()

  return (
    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          {t(T.journeyProgress.gatheredTokens)}
        </span>
      </div>
      {isUnlocked && hasSelection && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">
            {t(T.journeyProgress.tiersUnlocked)}
          </span>
        </div>
      )}
    </div>
  )
}
