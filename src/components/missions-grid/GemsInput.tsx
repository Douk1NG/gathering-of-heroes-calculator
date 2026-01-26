import { Coins } from "lucide-react";
import { useCalculatorStore } from "@/store/use-calculator-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * GemsInput - Gem spending input and calculation
 * Only re-renders when totalGemsSpent changes
 */
export function GemsInput() {
    const totalGemsSpent = useCalculatorStore(state => state.missions.totalGemsSpent);
    const updateGemsSpent = useCalculatorStore(state => state.updateGemsSpent);

    const gemSpendTokens = Math.floor(totalGemsSpent / 2000) * 30;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Gems Spent</Label>
                <span className="text-[10px] font-bold text-yellow-500/60 uppercase">30 Per 2k</span>
            </div>
            <div className="relative">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                <Input
                    type="number"
                    min={0}
                    className="h-10 pl-10 bg-black/40 border-white/5 text-sm font-mono focus-visible:ring-yellow-500/20"
                    value={totalGemsSpent || ""}
                    placeholder="Total Gems to spend..."
                    onChange={(e) => updateGemsSpent(parseInt(e.target.value) || 0)}
                />
            </div>
            {gemSpendTokens > 0 && (
                <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter">Volume Yield</span>
                    <span className="text-sm font-black text-yellow-500">+{gemSpendTokens} Tokens</span>
                </div>
            )}
        </div>
    );
}
