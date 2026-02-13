import { COMMANDER_CATEGORIES } from '@/lib/constants'
import { CategoryTab } from './CategoryTab'

export function CategoryTabs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {Object.values(COMMANDER_CATEGORIES).map((category) => (
        <CategoryTab key={category} category={category} />
      ))}
    </div>
  )
}
