import { useShallow } from "zustand/react/shallow";
import { useCalculatorStore } from "../../store/use-calculator-store";

/**
 * ListSummary - Displays calculation summary and progress
 * Only re-renders when calculated values change
 */
export function ListSummary() {
    const {
        totalCost,
        tokensNeeded,
        totalGathered,
        progress
    } = useCalculatorStore(useShallow((state) => ({
        totalCost: state.getTotalCost(),
        tokensNeeded: state.getNeededTokens(),
        totalGathered: state.getTotalTokens(),
        progress: state.getProgress()
    })));

    return (
        <div className="pt-4 border-t border-black/10 space-y-4 shrink-0 mt-auto">
            <div>
                <h4 className="text-4xl font-black mb-1">
                    {tokensNeeded}
                </h4>
                <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest">Total Tokens Needed</p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-black/60 uppercase">Total Cost</span>
                    <span>{totalCost} Tokens</span>
                </div>
                <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-black/60 uppercase">Gathered</span>
                    <span>{totalGathered}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-black/60 uppercase">Completion</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
}
