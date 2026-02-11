import { t } from '@/lib/utils'
import { T } from '@/translations'
import { useRepeatableTotal } from '@/hooks/use-repeatable-total'

export function RepeatableTotal() {
  const { repeatableTotal } = useRepeatableTotal()

  return (
    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
        {t(T.missionsGrid.repeatable.total)}
      </span>
      <span className="text-xl font-black text-red-500">
        {repeatableTotal} {t(T.commandersList.tokens)}
      </span>
    </div>
  )
}
