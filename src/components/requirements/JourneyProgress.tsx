import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useJourneyProgress } from "@/hooks/use-requirements";
import { StatusIndicators } from "./StatusIndicators";
import { t } from "@/lib/utils";
import { T } from "@/translations";

export function JourneyProgress() {
    const { totalTokens, totalCost, progress } = useJourneyProgress();

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-end">
                    <CardTitle className="text-sm uppercase tracking-widest font-black opacity-60">{t(T.journeyProgress.title)}</CardTitle>
                    <span className="text-sm font-black font-mono text-neutral-400">
                        {totalTokens} / {totalCost}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Progress value={progress} className="h-4" />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-neutral-500 px-1">
                        <span>{t(T.journeyProgress.started)}</span>
                        <span>{Math.round(progress)}{t(T.journeyProgress.complete)}</span>
                    </div>
                </div>

                <StatusIndicators />
            </CardContent>
        </Card>
    );
}
