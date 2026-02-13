import { t, translations } from '@/lib/translations'

export function CompletionRow({ progress }: { progress: number }) {
  return (
    <div className="flex items-center justify-between text-xs font-black">
      <span className="text-black/60 uppercase">{t(translations.commandersList.completion)}</span>
      <span>{Math.round(progress)}%</span>
    </div>
  )
}
