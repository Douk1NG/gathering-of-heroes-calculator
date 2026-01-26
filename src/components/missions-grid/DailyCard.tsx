import { Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DAILY_MISSIONS } from "@/lib/utils";

/**
 * DailyCard - Displays automated daily missions
 * Completely static component with no state subscriptions
 */
export function DailyCard() {
    return (
        <Card className="flex flex-col border-white/5 bg-white/2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <CardHeader className="bg-blue-500/5 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Daily</CardTitle>
                        <CardDescription>Limit: 5 Days</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 flex-1">
                {DAILY_MISSIONS.map((m) => (
                    <div key={m.id} className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-2 relative group overflow-hidden">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-bold text-neutral-300">{m.name}</Label>
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 uppercase tracking-tighter">
                                Assumed: 5 Days
                            </span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{m.tokens} Tokens / Day</span>
                            <span className="text-lg font-black text-white">+{m.tokens * 5} Total</span>
                        </div>
                        {m.id === 'barbs' && (
                            <div className="absolute inset-0 bg-blue-500 border border-blue-400 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                        )}
                    </div>
                ))}
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Daily Yield</span>
                    <span className="text-xl font-black text-blue-400">90 Tokens</span>
                </div>
            </CardContent>
        </Card>
    );
}
