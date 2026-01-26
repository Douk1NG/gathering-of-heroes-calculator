import { useCalculatorStore } from "@/store/use-calculator-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * SpeedupInputs - Manual speedup minutes input grid
 * Only re-renders when speedupMinutes changes
 */
export function SpeedupInputs() {
    const speedupMinutes = useCalculatorStore(state => state.missions.speedupMinutes);
    const updateSpeedupMinutes = useCalculatorStore(state => state.updateSpeedupMinutes);
    const getSpeedupMinutes = useCalculatorStore(state => state.getSpeedupMinutes);

    const manualSpeedupMinutes = Object.values(speedupMinutes).reduce((a, b) => a + b, 0);
    const calcMinutes = getSpeedupMinutes();
    const totalSpeedupTokens = Math.floor((manualSpeedupMinutes + calcMinutes) / 480) * 2;

    return (
        <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Speedup Volume (min)</Label>
                <span className="text-[10px] font-bold text-blue-500/60 uppercase">2 Per 480m</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Object.entries(speedupMinutes).map(([cat, val]) => (
                    <div key={cat} className="space-y-1">
                        <Label className="text-[9px] font-bold text-neutral-500 uppercase pl-1">{cat} (min)</Label>
                        <Input
                            type="number"
                            min={0}
                            className="h-8 bg-black/40 border-white/5 text-xs font-mono focus-visible:ring-blue-500/20"
                            value={val || ""}
                            placeholder="0"
                            onChange={(e) => updateSpeedupMinutes(cat as any, parseInt(e.target.value) || 0)}
                        />
                    </div>
                ))}
                <div className="col-span-1 p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-center items-center">
                    <span className="text-[8px] text-neutral-500 font-bold uppercase">Total Packaged</span>
                    <span className="text-xs font-black text-white">{manualSpeedupMinutes + calcMinutes}m</span>
                </div>
            </div>
            {totalSpeedupTokens > 0 && (
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex justify-between items-center animate-in fade-in duration-300">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">Volume Yield</span>
                    <span className="text-sm font-black text-blue-400">+{totalSpeedupTokens} Tokens</span>
                </div>
            )}
        </div>
    );
}
