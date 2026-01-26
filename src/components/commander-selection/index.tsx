import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CategoryTabs } from "./CategoryTabs";
import { CommanderList } from "./CommanderList";

/**
 * CommanderSelection - Main component for commander selection interface
 * Static parent that orchestrates category selection and commander list display
 */
export function CommanderSelection() {
    return (
        <Card className="border-white/5 bg-white/2">
            <CardHeader>
                <CardTitle className="text-xl text-yellow-500">Target Selection</CardTitle>
                <CardDescription>Select one or more commanders for your gathering plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <CategoryTabs />
                <CommanderList />
            </CardContent>
        </Card>
    );
}
