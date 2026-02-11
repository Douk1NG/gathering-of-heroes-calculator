import { useCalculatorStore } from '@/store/use-calculator-store'
import { t } from '@/lib/utils'
import { T } from '@/translations'

export function CategoryHeader() {
  const selectedCategory = useCalculatorStore((state) => state.selectedCategory)

  if (!selectedCategory) return null

  return (
    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
      {t(T.common.categories[selectedCategory as keyof typeof T.common.categories])}{' '}
      {t(T.commanderSelection.commandersHeader)}
    </h4>
  )
}
