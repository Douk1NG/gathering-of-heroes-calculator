import { Lock } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { cn } from '@/lib/utils'
import { t, translations } from '@/lib/translations'

import { type TierSectionProps } from '@/types/components/commander-selection'
import { CommanderButton } from './CommanderButton'

export function TierSection({ tierId, category, commanders }: TierSectionProps) {
  const { isUnlocked, lockReason } = useCalculatorStore(
    useShallow((state) => ({
      isUnlocked: state.isTierUnlocked(tierId),
      lockReason: state.getTierUnlockRequirement(tierId),
    })),
  )

  return (
    <div className={cn('space-y-2 transition-opacity duration-300', !isUnlocked && 'opacity-50')}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white/10">
          {!isUnlocked && <Lock className="w-2.5 h-2.5 text-yellow-500/60" />}
          <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">
            {t(
              translations.common.tiers[
                tierId.toString() as keyof typeof translations.common.tiers
              ],
            )}
          </span>
        </div>
        <div className="h-px flex-1 bg-white/5" />
        {!isUnlocked && lockReason && (
          <span className="text-[10px] font-bold text-yellow-500/60 uppercase tracking-widest whitespace-nowrap bg-yellow-500/5 px-2 py-0.5 rounded-full border border-yellow-500/10">
            {t(translations.common.tierUnlockRequirement, {
              amount: lockReason.amount,
              tokens: t(translations.commandersList.tokens),
              tiers: lockReason.tiers,
            })}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {commanders.map((commander) => (
          <CommanderButton
            key={commander.name}
            name={commander.name}
            tierId={tierId}
            category={category}
          />
        ))}
      </div>
    </div>
  )
}
