import { ShoppingCart } from 'lucide-react'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { t } from '@/lib/utils'

export function ListHeader() {
  return (
    <CardHeader className="pb-2 shrink-0">
      <div className="flex items-center justify-between">
        <CardTitle className="text-black/80 text-lg flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          {t('commandersList.title')}
        </CardTitle>
        <ItemsCount />
      </div>
    </CardHeader>
  )
}

function ItemsCount() {
  const count = useCalculatorStore((state) => state.selectedCommanders.length)
  return (
    <span className="text-[10px] font-black uppercase tracking-tighter bg-black/10 px-2 py-0.5 rounded">
      {t('commandersList.items')}: {count}
    </span>
  )
}
