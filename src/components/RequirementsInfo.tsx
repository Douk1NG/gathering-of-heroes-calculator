import { CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useShallow } from "zustand/react/shallow";
import { useCalculatorStore } from "@/store/use-calculator-store";

// 1. Reactive Child: Progress Section
function JourneyProgress() {
    const { totalTokens, totalCost, progress } = useCalculatorStore(useShallow((state) => ({
        totalTokens: state.getTotalTokens(),
        totalCost: state.getTotalCost(),
        progress: state.getProgress()
    })));

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-end">
                    <CardTitle className="text-sm uppercase tracking-widest font-black opacity-60">Journey Progress</CardTitle>
                    <span className="text-sm font-black font-mono text-neutral-400">
                        {totalTokens} / {totalCost}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Progress value={progress} className="h-4" />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-neutral-500 px-1">
                        <span>Started</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                </div>

                <StatusIndicators />
            </CardContent>
        </Card>
    );
}

// 2. Reactive Child: Status Indicators
function StatusIndicators() {
    const { isUnlocked, hasSelection } = useCalculatorStore(useShallow((state) => ({
        isUnlocked: state.getUnlockStatus(),
        hasSelection: state.selectedCommanders.length > 0
    })));

    return (
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Gathered Tokens</span>
            </div>
            {isUnlocked && hasSelection && (
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Tiers Unlocked</span>
                </div>
            )}
        </div>
    );
}

// Static Parent
export function RequirementsInfo() {
    return (
        <JourneyProgress />
    );
}
