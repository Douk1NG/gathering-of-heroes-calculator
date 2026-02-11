import { useCalculatorStore } from "@/store/use-calculator-store";
import { t } from "@/lib/utils";
import { T } from "@/translations";

/**
 * RepeatableTotal - Displays total tokens from repeatable missions
 * Only re-renders when gems or speedup values change
 */
export function RepeatableTotal() {
    const totalGemsSpent = useCalculatorStore(state => state.missions.totalGemsSpent);
    const speedupMinutes = useCalculatorStore(state => state.missions.speedupMinutes);
    const getSpeedupMinutes = useCalculatorStore(state => state.getSpeedupMinutes);

    const gemSpendTokens = Math.floor(totalGemsSpent / 2000) * 30;
    const manualSpeedupMinutes = Object.values(speedupMinutes).reduce((a, b) => a + b, 0);
    const calcMinutes = getSpeedupMinutes();
    const totalSpeedupTokens = Math.floor((manualSpeedupMinutes + calcMinutes) / 480) * 2;
    const repeatableTotal = gemSpendTokens + totalSpeedupTokens;

    return (
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t(T.missionsGrid.repeatable.total)}</span>
            <span className="text-xl font-black text-red-500">{repeatableTotal} {t(T.commandersList.tokens)}</span>
        </div>
    );
}
