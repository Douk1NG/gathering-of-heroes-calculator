import { Sword, BowArrow, ChessKnight, Flag, Settings } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useCalculatorStore } from "../../store/use-calculator-store";
import { cn, COMMANDER_CATEGORIES } from "../../lib/utils";

/**
 * Maps each commander category to its corresponding icon
 */
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    [COMMANDER_CATEGORIES.INFANTRY]: <Sword className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.ARCHER]: <BowArrow className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.CAVALRY]: <ChessKnight className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.LEADERSHIP]: <Flag className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.ENGINEERING]: <Settings className="w-5 h-5" />,
};

/**
 * CategoryTabs - Displays category selection tabs for filtering commanders
 * Users can switch between Infantry, Archer, Cavalry, Leadership, and Engineering
 */
export function CategoryTabs() {
    const {
        selectedCategory,
        setSelectedCategory
    } = useCalculatorStore(useShallow((state) => ({
        selectedCategory: state.selectedCategory,
        setSelectedCategory: state.setSelectedCategory
    })));

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.values(COMMANDER_CATEGORIES).map((cat) => {
                const isActive = selectedCategory === cat;

                return (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all truncate",
                            isActive
                                ? "bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                                : "bg-black/40 border-white/5 text-neutral-500 hover:border-white/10"
                        )}
                    >
                        {CATEGORY_ICONS[cat]}
                        <span className="text-[10px] font-bold uppercase tracking-wider">{cat}</span>
                    </button>
                );
            })}
        </div>
    );
}
