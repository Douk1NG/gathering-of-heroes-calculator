import { Trash2, ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useCalculatorStore, type SelectedCommander } from "../store/use-calculator-store";

export function CommandersList() {
    const {
        selectedCommanders,
        toggleCommander,
        getTotalTokens,
        getTotalCost,
        getNeededTokens,
        getProgress
    } = useCalculatorStore();

    const totalCost = getTotalCost();
    const tokensNeeded = getNeededTokens();
    const totalGathered = getTotalTokens();
    const progress = getProgress();

    return (
        <Card className="bg-yellow-500 text-black border-none shadow-[0_0_40px_rgba(234,179,8,0.15)] h-full flex flex-col">
            <CardHeader className="pb-2 shrink-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-black/80 text-lg flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Commanders List
                    </CardTitle>
                    <span className="text-[10px] font-black uppercase tracking-tighter bg-black/10 px-2 py-0.5 rounded">
                        Items: {selectedCommanders.length}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-6 pt-4 overflow-hidden">
                {/* Selected Commanders List */}
                <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar min-h-30">
                    {selectedCommanders.length > 0 ? (
                        selectedCommanders.map((c: SelectedCommander) => (
                            <div key={c.name} className="flex items-center justify-between p-3 rounded-lg bg-black/5 border border-black/10 group animate-in slide-in-from-right-4 duration-300">
                                <div className="flex flex-col">
                                    <span className="text-sm font-black leading-tight">{c.name}</span>
                                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest flex items-center gap-1">
                                        Tier {c.tierId} • {c.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black">{c.cost}</span>
                                    <button
                                        onClick={() => toggleCommander(c.name, c.category, c.tierId)}
                                        className="p-1.5 rounded-md hover:bg-black/10 text-black/40 hover:text-black transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center border-2 border-dashed border-black/10 rounded-xl">
                            <p className="text-sm font-bold opacity-40">No commanders selected</p>
                        </div>
                    )}
                </div>

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
            </CardContent>
        </Card>
    );
}
