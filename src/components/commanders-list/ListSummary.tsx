import { useCalculatorStore } from "../../store/use-calculator-store";

/**
 * ListSummary - Displays calculation summary and progress
 * Optimized: Each metric is a separate component that only re-renders when its value changes
 */
export function ListSummary() {
    return (
        <div className="pt-4 border-t border-black/10 space-y-4 shrink-0 mt-auto">
            <TokensNeededHeader />
            <div className="space-y-2">
                <TotalCostRow />
                <GatheredRow />
                <CompletionRow />
            </div>
        </div>
    );
}

function TokensNeededHeader() {
    const tokensNeeded = useCalculatorStore(state => state.getNeededTokens());
    return (
        <div>
            <h4 className="text-4xl font-black mb-1">
                {tokensNeeded}
            </h4>
            <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest">Total Tokens Needed</p>
        </div>
    );
}

function TotalCostRow() {
    const totalCost = useCalculatorStore(state => state.getTotalCost());
    return (
        <div className="flex items-center justify-between text-xs font-black">
            <span className="text-black/60 uppercase">Total Cost</span>
            <span>{totalCost} Tokens</span>
        </div>
    );
}

function GatheredRow() {
    const totalGathered = useCalculatorStore(state => state.getTotalTokens());
    return (
        <div className="flex items-center justify-between text-xs font-black">
            <span className="text-black/60 uppercase">Gathered</span>
            <span>{totalGathered}</span>
        </div>
    );
}

function CompletionRow() {
    const progress = useCalculatorStore(state => state.getProgress());
    return (
        <div className="flex items-center justify-between text-xs font-black">
            <span className="text-black/60 uppercase">Completion</span>
            <span>{Math.round(progress)}%</span>
        </div>
    );
}
