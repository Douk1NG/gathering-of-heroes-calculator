import { Swords } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { GemsInput } from "./GemsInput";
import { SpeedupInputs } from "./SpeedupInputs";
import { RepeatableTotal } from "./RepeatableTotal";

/**
 * RepeatableCard - Repeatable missions card for gem and speedup spending
 * Optimized: Each input section is a separate component
 */
export function RepeatableCard() {
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
                <GemsInput />
                <SpeedupInputs />
                <RepeatableTotal />
            </CardContent>
        </Card>
    );
}
