import { useCalculatorStore } from "@/store/use-calculator-store";
import { CHALLENGE_MISSIONS } from "@/lib/constants";
import { t } from "@/lib/utils";
import { T } from "@/translations";

/**
 * ChallengeTotal - Displays total tokens from challenge missions
 * Only re-renders when challenge missions change
 */
export function ChallengeTotal() {
    const challengeMissions = useCalculatorStore(state => state.missions.challenge);

    const challengeTotal = CHALLENGE_MISSIONS.reduce((acc, m) => {
        return acc + (challengeMissions[m.id] ? m.tokens : 0);
    }, 0);

    return (
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t(T.missionsGrid.challenge.total)}</span>
            <span className="text-xl font-black text-yellow-500">{challengeTotal} {t(T.commandersList.tokens)}</span>
        </div>
    );
}
