import { Info, Clock } from 'lucide-react'
import { LAST_UPDATED, t } from '@/lib/utils'
import { T } from '@/translations'

export function Disclaimer() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10 text-yellow-500/60 text-xs">
      <div className="flex items-center gap-3">
        <Info className="w-4 h-4 shrink-0" />
        <p>{t(T.header.disclaimer)}</p>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 whitespace-nowrap self-start md:self-auto">
        <Clock className="w-3 h-3" />
        <span>
          {t(T.header.lastUpdated)}: {LAST_UPDATED}
        </span>
      </div>
    </div>
  )
}
