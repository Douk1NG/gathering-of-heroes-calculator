import { useCalculatorStore } from '@/store/use-calculator-store'
import { t, translations } from '@/lib/translations'

export function CategoryHeader() {
  const selectedCategory = useCalculatorStore((state) => state.selectedCategory)

  if (!selectedCategory) return null

  return (
    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
      {t(translations.common.categories[selectedCategory])}{' '}
      {t(translations.commanderSelection.commandersHeader)}
    </h4>
  )
}
