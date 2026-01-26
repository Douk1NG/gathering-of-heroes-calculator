import { useCalculatorStore } from "@/store/use-calculator-store";
import { COMMANDER_DATABASE } from "@/lib/utils";
import { TierSection } from "./TierSection";

/**
 * CommanderList - Displays all commanders for the selected category
 * Organized by tiers with appropriate filtering
 */
export function CommanderList() {
    const selectedCategory = useCalculatorStore(state => state.selectedCategory);

    if (!selectedCategory) {
        return (
            <div className="py-8 text-center text-neutral-600 text-sm italic">
                Select a category to view available commanders
            </div>
        );
    }

    return (
        <div className="pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
            <CategoryHeader />

            {Object.entries(COMMANDER_DATABASE).map(([tierIdString, tierData]) => {
                const tierId = parseInt(tierIdString);
                const commanders = tierData[selectedCategory] || [];

                if (commanders.length === 0) return null;

                return (
                    <TierSection
                        key={tierId}
                        tierId={tierId}
                        category={selectedCategory}
                        commanders={commanders}
                    />
                );
            })}
        </div>
    );
}

function CategoryHeader() {
    const selectedCategory = useCalculatorStore(state => state.selectedCategory);
    return (
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            {selectedCategory} Commanders
        </h4>
    );
}
