import { Lock } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useCalculatorStore } from "@/store/use-calculator-store";
import { cn, t } from "@/lib/utils";
import { T } from "@/translations";
import { type CommanderCategory } from "@/lib/constants";
import { type CommanderData } from "@/lib/types";
import { CommanderButton } from "./CommanderButton";

interface TierSectionProps {
    tierId: number;
    category: CommanderCategory;
    commanders: CommanderData[];
}

/**
 * TierSection - Displays commanders grouped by tier
 * Shows tier lock status and unlock requirements
 */
export function TierSection({ tierId, category, commanders }: TierSectionProps) {
    const {
        isUnlocked,
        lockReason
    } = useCalculatorStore(useShallow((state) => ({
        isUnlocked: state.isTierUnlocked(tierId),
        lockReason: state.getTierUnlockRequirement(tierId)
    })));

    return (
        <div className={cn("space-y-2 transition-opacity duration-300", !isUnlocked && "opacity-50")}>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white/10">
                    {!isUnlocked && <Lock className="w-2.5 h-2.5 text-yellow-500/60" />}
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">
                        {t(T.common.tiers[tierId as keyof typeof T.common.tiers])}
                    </span>
                </div>
                <div className="h-px flex-1 bg-white/5" />
                {!isUnlocked && lockReason && (
                    <span className="text-[10px] font-bold text-yellow-500/60 uppercase tracking-widest whitespace-nowrap bg-yellow-500/5 px-2 py-0.5 rounded-full border border-yellow-500/10">
                        {lockReason}
                    </span>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {commanders.map((commander) => (
                    <CommanderButton key={commander.name} name={commander.name} tierId={tierId} category={category} />
                ))}
            </div>
        </div>
    );
}
