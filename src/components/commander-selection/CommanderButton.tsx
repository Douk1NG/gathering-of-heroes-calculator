import { Check, Lock } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useCalculatorStore } from "../../store/use-calculator-store";
import { cn, type CommanderCategory } from "../../lib/utils";

interface CommanderButtonProps {
    name: string;
    tierId: number;
    category: CommanderCategory;
}

/**
 * CommanderButton - Individual commander selection button
 * Shows locked/unlocked state and selection status with visual feedback
 */
export function CommanderButton({ name, tierId, category }: CommanderButtonProps) {
    const {
        isSelected,
        toggleCommander,
        isUnlocked
    } = useCalculatorStore(useShallow((state) => ({
        isSelected: !!state.selectedCommanders.find(c => c.name === name),
        toggleCommander: state.toggleCommander,
        isUnlocked: state.isTierUnlocked(tierId)
    })));

    const disabled = !isUnlocked && !isSelected;

    return (
        <button
            disabled={disabled}
            onClick={() => toggleCommander(name, category, tierId)}
            className={cn(
                "px-3 py-2 rounded-md border text-xs transition-all text-left flex items-center justify-between group relative overflow-hidden",
                isSelected
                    ? "bg-yellow-500 border-yellow-500 text-black font-bold"
                    : disabled
                        ? "bg-black/20 border-white/5 text-neutral-600 cursor-not-allowed"
                        : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
            )}
        >
            <span className="truncate pr-2 z-10">{name}</span>
            <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors z-10",
                isSelected
                    ? "bg-black/20 border-black/40"
                    : disabled
                        ? "border-neutral-800"
                        : "border-white/20 group-hover:border-white/40"
            )}>
                {isSelected && <Check className="w-3 h-3 text-black" />}
                {disabled && <Lock className="w-2.5 h-2.5 text-neutral-700" />}
            </div>
        </button>
    );
}
