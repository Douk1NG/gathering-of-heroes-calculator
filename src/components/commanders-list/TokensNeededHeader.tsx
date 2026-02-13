import { t, translations } from '@/lib/translations'

export function TokensNeededHeader({ tokensNeeded }: { tokensNeeded: number }) {
  return (
    <div>
      <h4 className="text-4xl font-black mb-1">{tokensNeeded}</h4>
      <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest">
        {t(translations.commandersList.totalTokensNeeded)}
      </p>
    </div>
  )
}
