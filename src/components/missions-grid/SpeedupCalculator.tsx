import { Zap } from "lucide-react";
import { useCalculatorStore } from "@/store/use-calculator-store";
import { Input } from "@/components/ui/input";

/**
 * SpeedupCalculator - Training speedup time calculator
 * Only re-renders when speedupTimeStr changes
 */
export function SpeedupCalculator() {
    const speedupTimeStr = useCalculatorStore(state => state.speedupTimeStr);
    const updateSpeedupTime = useCalculatorStore(state => state.updateSpeedupTime);
    const getSpeedupMinutes = useCalculatorStore(state => state.getSpeedupMinutes);

    const calculatedMinutes = getSpeedupMinutes();
    const calculatedTokens = Math.floor(calculatedMinutes / 480) * 2;

    return (
        <div className="p-4 rounded-lg bg-black/40 border border-blue-500/20 space-y-4 mt-1 shadow-inner group/calc">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-blue-400 animate-pulse" />
                    <a
                        href="https://rok-calc.vercel.app/mge-training"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                        Training Calculator ↗
                    </a>
                </div>
                <span className="text-[10px] text-neutral-500 italic font-medium">Use results below</span>
            </div>
            <Input
                type="text"
                className="h-10 bg-black/60 border-white/10 font-mono text-xs placeholder:opacity-30 text-center focus-visible:ring-blue-500/20"
                value={speedupTimeStr}
                placeholder="EX: 138d 21:20:00"
                onChange={(e) => updateSpeedupTime(e.target.value)}
            />

            {calculatedMinutes > 0 && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-center items-center text-center space-y-1 animate-in zoom-in-95 duration-300">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Calculated Addition</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">+{calculatedTokens}</span>
                        <span className="text-xs font-bold text-neutral-500">Tokens</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter text-center">
                        Added to accumulator ({calculatedMinutes}m total)
                    </span>
                </div>
            )}
        </div>
    );
}
