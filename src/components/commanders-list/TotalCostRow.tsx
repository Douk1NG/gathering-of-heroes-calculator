import { t, translations } from '@/lib/translations'

export function TotalCostRow({ totalCost }: { totalCost: number }) {
  return (
    <div className="flex items-center justify-between text-xs font-black">
      <span className="text-black/60 uppercase">{t(translations.commandersList.totalCost)}</span>
      <span>
        {totalCost} {t(translations.commandersList.tokens)}
      </span>
    </div>
  )
}
