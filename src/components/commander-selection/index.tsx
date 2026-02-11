import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { t } from '@/lib/utils'
import { CategoryTabs } from './CategoryTabs'
import { CommanderList } from './CommanderList'

export function CommanderSelection() {
  return (
    <Card className="border-white/5 bg-white/2 h-full flex flex-col overflow-hidden">
      <CardHeader className="shrink-0">
        <CardTitle className="text-xl text-yellow-500">{t('commanderSelection.title')}</CardTitle>
        <CardDescription>{t('commanderSelection.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 flex flex-col space-y-6">
        <CategoryTabs />
        <CommanderList />
      </CardContent>
    </Card>
  )
}
