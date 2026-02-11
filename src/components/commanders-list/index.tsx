import { Card, CardContent } from '@/components/ui/card'
import { ListHeader } from './ListHeader'
import { CommanderItems } from './CommanderItems'
import { ListSummary } from './ListSummary'

export function CommandersList() {
  return (
    <Card className="bg-yellow-500 text-black border-none shadow-[0_0_40px_rgba(234,179,8,0.15)] h-full flex flex-col overflow-hidden">
      <ListHeader />
      <CardContent className="flex-1 min-h-0 flex flex-col space-y-6 pt-4">
        <CommanderItems />
        <ListSummary />
      </CardContent>
    </Card>
  )
}
