import { Target, Trophy, Swords, CheckCircle2, Coins, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn, DAILY_MISSIONS, CHALLENGE_MISSIONS } from "../lib/utils";
import { useShallow } from "zustand/react/shallow";
import { useCalculatorStore } from "../store/use-calculator-store";

// 1. Reactive Child: Daily Card (Actually mostly static but subscribes for safety if needed)
function DailyCard() {
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

// 2. Reactive Child: Challenge Card
function ChallengeCard() {
    const { challengeMissions, updateChallenge, speedupTimeStr, updateSpeedupTime, getSpeedupMinutes } = useCalculatorStore(useShallow((state) => ({
        challengeMissions: state.missions.challenge,
        updateChallenge: state.updateChallenge,
        speedupTimeStr: state.speedupTimeStr,
        updateSpeedupTime: state.updateSpeedupTime,
        getSpeedupMinutes: state.getSpeedupMinutes,
    })));

    const challengeTotal = CHALLENGE_MISSIONS.reduce((acc, m) => {
        return acc + (challengeMissions[m.id] ? m.tokens : 0);
    }, 0);

    return (
        <Card className="flex flex-col border-white/5 bg-white/2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <CardHeader className="bg-yellow-500/5 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Challenge</CardTitle>
                        <CardDescription>Milestone Rewards</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-6 flex-1">
                {CHALLENGE_MISSIONS.map((m) => (
                    <div key={m.id} className="space-y-2">
                        <button
                            onClick={() => updateChallenge(m.id, challengeMissions[m.id] ? 0 : 1)}
                            className={cn(
                                "w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left group",
                                challengeMissions[m.id]
                                    ? "bg-yellow-500/10 border-yellow-500/50 text-white"
                                    : "bg-black/40 border-white/5 text-neutral-500 hover:border-white/10"
                            )}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{m.name}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">
                                    +{m.tokens} Tokens
                                </span>
                            </div>
                            {challengeMissions[m.id] ? (
                                <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <div className="w-5 h-5 rounded-full border border-white/10 group-hover:border-white/20" />
                            )}
                        </button>

                        {m.id === 'troop_power' && (
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

                                {getSpeedupMinutes() > 0 && (
                                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-center items-center text-center space-y-1 animate-in zoom-in-95 duration-300">
                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Calculated Addition</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-white">+{Math.floor(getSpeedupMinutes() / 480) * 2}</span>
                                            <span className="text-xs font-bold text-neutral-500">Tokens</span>
                                        </div>
                                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter text-center">
                                            Added to accumulator ({getSpeedupMinutes()}m total)
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Milestone Total</span>
                    <span className="text-xl font-black text-yellow-500">{challengeTotal} Tokens</span>
                </div>
            </CardContent>
        </Card>
    );
}

// 3. Reactive Child: Repeatable Card
function RepeatableCard() {
    const { totalGemsSpent, speedupMinutes, updateGemsSpent, updateSpeedupMinutes, getSpeedupMinutes } = useCalculatorStore(useShallow((state) => ({
        totalGemsSpent: state.missions.totalGemsSpent,
        speedupMinutes: state.missions.speedupMinutes,
        updateGemsSpent: state.updateGemsSpent,
        updateSpeedupMinutes: state.updateSpeedupMinutes,
        getSpeedupMinutes: state.getSpeedupMinutes,
        speedupTimeStr: state.speedupTimeStr
    })));

    const gemSpendTokens = Math.floor(totalGemsSpent / 2000) * 30;
    const manualSpeedupMinutes = Object.values(speedupMinutes).reduce((a, b) => a + b, 0);
    const calcMinutes = getSpeedupMinutes();
    const totalSpeedupTokens = Math.floor((manualSpeedupMinutes + calcMinutes) / 480) * 2;

    const repeatableTotal = gemSpendTokens + totalSpeedupTokens;

    return (
        <Card className="flex flex-col border-white/5 bg-white/2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <CardHeader className="bg-red-500/5 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <Swords className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Repeatable</CardTitle>
                        <CardDescription>Spending Yields</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 flex-1">
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

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Spending Result</span>
                    <span className="text-xl font-black text-red-500">{repeatableTotal} Tokens</span>
                </div>
            </CardContent>
        </Card>
    );
}

// Static Parent
export function MissionsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DailyCard />
            <ChallengeCard />
            <RepeatableCard />
        </div>
    );
}
