import { useCategoryTabs } from '@/hooks/use-category-tabs'
import { cn } from '@/lib/utils'
import { t, translations } from '@/lib/translations'
import { type CategoryTabProps } from '@/types/components/commander-selection'
import { COMMANDER_CATEGORIES } from '@/lib/constants'
import { Sword, BowArrow, ChessKnight, Flag, Settings } from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [COMMANDER_CATEGORIES.INFANTRY]: <Sword className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.ARCHER]: <BowArrow className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.CAVALRY]: <ChessKnight className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.LEADERSHIP]: <Flag className="w-5 h-5" />,
  [COMMANDER_CATEGORIES.ENGINEERING]: <Settings className="w-5 h-5" />,
}

export function CategoryTab({ category }: CategoryTabProps) {
  const { selectedCategory, handleCategorySelect } = useCategoryTabs()
  const isActive = selectedCategory === category

  return (
    <button
      onClick={() => handleCategorySelect(category)}
      className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-lg border transition-all truncate',
        isActive
          ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
          : 'bg-black/40 border-white/5 text-neutral-500 hover:border-white/10',
      )}
    >
      {CATEGORY_ICONS[category]}
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {t(translations.common.categories[category])}
      </span>
    </button>
  )
}
