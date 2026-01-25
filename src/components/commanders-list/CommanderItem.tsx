import { Trash2 } from "lucide-react";
import { useCalculatorStore, type SelectedCommander } from "../../store/use-calculator-store";

interface CommanderItemProps {
    commander: SelectedCommander;
}

/**
 * CommanderItem - Individual commander card in the list
 * Shows commander details and allows removal
 * Only re-renders when this specific commander changes
 */
export function CommanderItem({ commander }: CommanderItemProps) {
    const toggleCommander = useCalculatorStore(state => state.toggleCommander);

    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-black/5 border border-black/10 group animate-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col">
                <span className="text-sm font-black leading-tight">{commander.name}</span>
                <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest flex items-center gap-1">
                    Tier {commander.tierId} • {commander.category}
                </span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-black">{commander.cost}</span>
                <button
                    onClick={() => toggleCommander(commander.name, commander.category, commander.tierId)}
                    className="p-1.5 rounded-md hover:bg-black/10 text-black/40 hover:text-black transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
