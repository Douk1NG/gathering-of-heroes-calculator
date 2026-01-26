import { Header } from "./components/header";
import { MissionsGrid } from "./components/missions-grid";
import { RequirementsInfo } from "./components/requirements";
import { CommanderSelection } from "./components/commander-selection";
import { CommandersList } from "./components/commanders-list";
import { TipsTricks } from "./components/TipsTricks";

function App() {
    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-4 md:p-8 font-sans selection:bg-yellow-500/30">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-yellow-600/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                <Header />

                {/* Tier 1: Selection & List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="lg:col-span-2">
                        <CommanderSelection />
                    </div>
                    <div className="lg:col-span-1">
                        <CommandersList />
                    </div>
                </div>

                {/* Tier 2: Full Width Missions Grid */}
                <div className="w-full">
                    <MissionsGrid />
                </div>

                {/* Tier 3: Support Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <RequirementsInfo />
                    <TipsTricks />
                </div>

                {/* Footer */}
                <footer className="py-8 border-t border-white/5 text-center text-neutral-600 text-sm">
                </footer>
            </div>
        </div>
    );
}

export default App;
