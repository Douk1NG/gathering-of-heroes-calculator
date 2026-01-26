import { Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function TipsTricks() {
    return (
        <Card className="h-full border-white/5 bg-white/2 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="w-4 h-4 text-yellow-500" />
                    Tips & Tricks
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-neutral-400 leading-relaxed">
                <p>
                    • Chain <span className="text-blue-400 font-medium">100 barbarians</span> to save Action Points (AP), regular daily AP is usually enough for this, however if you want to save ap bottles for this mission you can save up to <span className="text-blue-400 font-medium">15k  in AP bottles</span>
                </p>
                <p>
                    • Consider the must have commanders <span className="text-blue-400 font-medium">Qin Shi Huang, Aquiles, Arthur, Bai Qi, Liu Che and Sun Tzu Prime</span>
                </p>
            </CardContent>
        </Card>
    );
}
