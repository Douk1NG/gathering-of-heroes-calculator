import { t, translations } from '@/lib/translations'

export function GatheredRow({ totalGathered }: { totalGathered: number }) {
  return (
    <div className="flex items-center justify-between text-xs font-black">
      <span className="text-black/60 uppercase">{t(translations.commandersList.gathered)}</span>
      <span>{totalGathered}</span>
    </div>
  )
}
