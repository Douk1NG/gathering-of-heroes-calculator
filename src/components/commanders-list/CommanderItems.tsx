import { useCalculatorStore } from "../../store/use-calculator-store";
import { CommanderItem } from "./CommanderItem";

/**
 * CommanderItems - Container for the list of selected commanders
 * Only re-renders when the commanders array reference changes
 */
export function CommanderItems() {
    const selectedCommanders = useCalculatorStore(state => state.selectedCommanders);

    return (
        <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar max-h-80">
            {selectedCommanders.length > 0 ? (
                selectedCommanders.map((commander) => (
                    <CommanderItem key={commander.name} commander={commander} />
                ))
            ) : (
                <div className="py-8 text-center border-2 border-dashed border-black/10 rounded-xl">
                    <p className="text-sm font-bold opacity-40">No commanders selected</p>
                </div>
            )}
        </div>
    );
}
