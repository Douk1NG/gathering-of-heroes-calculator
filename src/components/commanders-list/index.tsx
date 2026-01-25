import { Card, CardContent } from "../ui/card";
import { ListHeader } from "./ListHeader";
import { CommanderItems } from "./CommanderItems";
import { ListSummary } from "./ListSummary";

/**
 * CommandersList - Main component for displaying selected commanders
 * Static parent that orchestrates the list display and summary
 */
export function CommandersList() {
    return (
        <Card className="bg-yellow-500 text-black border-none shadow-[0_0_40px_rgba(234,179,8,0.15)] h-full flex flex-col">
            <ListHeader />
            <CardContent className="flex-1 flex flex-col space-y-6 pt-4 overflow-hidden">
                <CommanderItems />
                <ListSummary />
            </CardContent>
        </Card>
    );
}
