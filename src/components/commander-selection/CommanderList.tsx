import { useCalculatorStore } from "@/store/use-calculator-store";
import { COMMANDERS } from "@/lib/utils";
import { COMMANDER_TIERS } from "@/lib/constants";
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

            {Object.values(COMMANDER_TIERS).map((tier) => {
                const commandersInTier = COMMANDERS.filter(
                    c => c.tier === tier.id && c.category === selectedCategory
                );

                if (commandersInTier.length === 0) return null;

                return (
                    <TierSection
                        key={tier.id}
                        tierId={tier.id}
                        category={selectedCategory}
                        commanders={commandersInTier}
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
