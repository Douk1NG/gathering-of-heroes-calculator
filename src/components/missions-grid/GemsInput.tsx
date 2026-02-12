import { Coins } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { t, translations } from '@/lib/translations'

import { useGemsInput } from '@/hooks/use-gems-input'

export function GemsInput() {
  const { gemSpendTokens, handleInputChange, displayValue } = useGemsInput()

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <Label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
          {t(translations.missionsGrid.gemsCalculator.title)}
        </Label>
        <span className="text-[10px] font-bold text-yellow-500/60 uppercase">
          {t(translations.missionsGrid.gemsCalculator.ratio)}
        </span>
      </div>
      <div className="relative">
        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
        <Input
          type="text"
          className="h-10 pl-10 bg-black/40 border-white/5 text-sm font-mono focus-visible:ring-yellow-500/20"
          value={displayValue}
          placeholder={t(translations.missionsGrid.gemsCalculator.placeholder)}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {gemSpendTokens > 0 && (
        <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex justify-between items-center">
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter">
            {t(translations.missionsGrid.gemsCalculator.yield)}
          </span>
          <span className="text-sm font-black text-yellow-500">
            +{gemSpendTokens} {t(translations.commandersList.tokens)}
          </span>
        </div>
      )}
    </div>
  )
}
