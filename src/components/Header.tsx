import { Info, Clock } from "lucide-react";
import { LAST_UPDATED } from "@/lib/utils";
import { GithubActions } from "@/components/GithubActions";

interface HeaderProps {
    // Props removed since tier is now automatic
}

export function Header({ }: HeaderProps) {
    return (
        <div className="space-y-6 mb-12">
            {/* Disclaimer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10 text-yellow-500/60 text-xs">
                <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 shrink-0" />
                    <p>
                        This is a fan-made tool to help the community. It is not an official tool;
                        data may not be 100% precise due to constant game updates.
                    </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 whitespace-nowrap self-start md:self-auto">
                    <Clock className="w-3 h-3" />
                    <span>Last Updated: {LAST_UPDATED}</span>
                </div>
            </div>

            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-white via-white to-white/40 mb-2">
                        GATHERING OF <span className="text-yellow-500">HEROES</span>
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-xl">
                        Calculate tokens, track missions, and optimize your path to legendary commanders.
                    </p>
                </div>

                <div className="shrink-0">
                    <GithubActions />
                </div>
            </header>
        </div>
    );
}
