import { Sword, BowArrow, ChessKnight, Flag, Settings } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { cn, t } from '@/lib/utils'
import { T } from '@/translations'
import { COMMANDER_CATEGORIES } from '@/lib/constants'
import { type CategoryTabProps } from '@/types/components/commander-selection'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [COMMANDER_CATEGORIES.INFANTRY]: <Sword className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.ARCHER]: <BowArrow className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.CAVALRY]: <ChessKnight className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.LEADERSHIP]: <Flag className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.ENGINEERING]: <Settings className="w-5 h-5" />,
}

export function CategoryTabs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {Object.values(COMMANDER_CATEGORIES).map((category) => (
        <CategoryTab key={category} category={category} />
      ))}
    </div>
  )
}

function CategoryTab({ category }: CategoryTabProps) {
  const { selectedCategory, setSelectedCategory } = useCalculatorStore(
    useShallow((state) => ({
      selectedCategory: state.selectedCategory,
      setSelectedCategory: state.setSelectedCategory,
    })),
  )

  const isActive = selectedCategory === category

  return (
    <button
      onClick={() => setSelectedCategory(category)}
      className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-lg border transition-all truncate',
        isActive
          ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
          : 'bg-black/40 border-white/5 text-neutral-500 hover:border-white/10',
      )}
    >
      {CATEGORY_ICONS[category]}
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {t(T.common.categories[category as keyof typeof T.common.categories])}
      </span>
    </button>
  )
}
