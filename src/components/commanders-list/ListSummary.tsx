import { useListSummary } from '@/hooks/use-list-summary'
import { TokensNeededHeader } from './TokensNeededHeader'
import { TotalCostRow } from './TotalCostRow'
import { GatheredRow } from './GatheredRow'
import { CompletionRow } from './CompletionRow'

export function ListSummary() {
  const { tokensNeeded, totalCost, totalGathered, progress } = useListSummary()

  return (
    <div className="pt-4 border-t border-black/10 space-y-4 shrink-0 mt-auto">
      <TokensNeededHeader tokensNeeded={tokensNeeded} />
      <div className="space-y-2">
        <TotalCostRow totalCost={totalCost} />
        <GatheredRow totalGathered={totalGathered} />
        <CompletionRow progress={progress} />
      </div>
    </div>
  )
}
