import { t, translations } from '@/lib/translations'

export function TitleSection() {
  return (
    <div className="text-center lg:text-left">
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-white via-white to-white/40 mb-2">
        {t(translations.header.title).split(' ')[0]}{' '}
        {t(translations.header.title).split(' ').slice(1).join(' ')} OF{' '}
        <span className="text-yellow-500">{t(translations.header.subtitle).split(' ')[0]}</span>
      </h1>
      <p className="text-neutral-400 text-lg max-w-xl">{t(translations.header.disclaimer)}</p>
    </div>
  )
}
