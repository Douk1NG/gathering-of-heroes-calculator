import { Sword, BowArrow, ChessKnight, Flag, Settings, Check, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { cn, COMMANDER_CATEGORIES, COMMANDER_DATABASE } from "../lib/utils";
import { useCalculatorStore } from "../store/use-calculator-store";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    [COMMANDER_CATEGORIES.INFANTRY]: <Sword className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.ARCHER]: <BowArrow className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.CAVALRY]: <ChessKnight className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.LEADERSHIP]: <Flag className="w-5 h-5" />,
    [COMMANDER_CATEGORIES.ENGINEERING]: <Settings className="w-5 h-5" />,
};

export function CommanderSelection() {
    const {
        selectedCategory,
        setSelectedCategory,
        selectedCommanders,
        toggleCommander
    } = useCalculatorStore();

    return (
        <Card className="border-white/5 bg-white/2">
            <CardHeader>
                <CardTitle className="text-xl text-yellow-500">Target Selection</CardTitle>
                <CardDescription>Select one or more commanders for your gathering plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.values(COMMANDER_CATEGORIES).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all truncate",
                                selectedCategory === cat
                                    ? "bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                                    : "bg-black/40 border-white/5 text-neutral-500 hover:border-white/10"
                            )}
                        >
                            {CATEGORY_ICONS[cat]}
                            <span className="text-[10px] font-bold uppercase tracking-wider">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* Commander List */}
                {selectedCategory && (
                    <div className="pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            {selectedCategory} Commanders
                        </h4>

                        {Object.entries(COMMANDER_DATABASE).map(([tierIdString, tierData]) => {
                            const tierId = parseInt(tierIdString);
                            const commanders = tierData[selectedCategory] || [];
                            if (commanders.length === 0) return null;

                            const isUnlocked = useCalculatorStore.getState().isTierUnlocked(tierId);
                            const lockReason = useCalculatorStore.getState().getTierUnlockRequirement(tierId);

                            return (
                                <div key={tierId} className={cn("space-y-2 transition-opacity duration-300", !isUnlocked && "opacity-50")}>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white/10">
                                            {!isUnlocked && <Lock className="w-2.5 h-2.5 text-yellow-500/60" />}
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">
                                                Tier {tierId}
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
                                        {commanders.map((name: string) => {
                                            const isSelected = !!selectedCommanders.find((c: any) => c.name === name);
                                            const disabled = !isUnlocked && !isSelected;

                                            return (
                                                <button
                                                    key={name}
                                                    disabled={disabled}
                                                    onClick={() => toggleCommander(name, selectedCategory as any, tierId)}
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
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {!selectedCategory && (
                    <div className="py-8 text-center text-neutral-600 text-sm italic">
                        Select a category to view available commanders
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
