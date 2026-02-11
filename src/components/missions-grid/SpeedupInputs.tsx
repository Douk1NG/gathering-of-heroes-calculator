import { t } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { T } from '@/translations'
import { useSpeedupInputs } from '@/hooks/use-speedup-inputs'

/**
 * SpeedupInputs - Manual speedup minutes input grid
 * Logic extracted to useSpeedupInputs hook for better maintainability
 */
export function SpeedupInputs() {
  const {
    speedupMinutes,
    speedupInputMode,
    setSpeedupInputMode,
    manualSpeedupMinutes,
    calcMinutes,
    totalSpeedupTokens,
    handleInputChange,
    getDisplayValue,
  } = useSpeedupInputs()

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-between items-center px-1">
        <Label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
          {t(T.missionsGrid.speedupCalculator.manualTitle)}
        </Label>
        <span className="text-[10px] font-bold text-blue-500/60 uppercase">
          {t(T.missionsGrid.speedupCalculator.ratio)}
        </span>
      </div>

      <div className="flex gap-1 bg-black/40 p-1 rounded-md border border-white/5 mb-2">
        {(['auto', 'days', 'minutes'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setSpeedupInputMode(mode)}
            className={`
                            flex-1 px-2 py-1.5 text-[10px] font-bold uppercase rounded transition-all
                            ${
                              speedupInputMode === mode
                                ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_10px_-3px_rgba(59,130,246,0.3)]'
                                : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                            }
                        `}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {Object.entries(speedupMinutes).map(([cat, val]) => (
          <div key={cat} className="space-y-1">
            <Label className="text-[9px] font-bold text-neutral-500 uppercase pl-1">
              {t(T.common.speedupCategories[cat as keyof typeof T.common.speedupCategories])}
            </Label>
            <Input
              type="text"
              className="h-8 bg-black/40 border-white/5 text-xs font-mono focus-visible:ring-blue-500/20"
              value={getDisplayValue(val)}
              placeholder={speedupInputMode === 'days' ? '0d' : '0m'}
              onChange={(e) => handleInputChange(cat, e.target.value)}
            />
          </div>
        ))}
        <div className="col-span-1 p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-center items-center">
          <span className="text-[8px] text-neutral-500 font-bold uppercase">
            {t(T.missionsGrid.speedupCalculator.totalPackaged)}
          </span>
          <span className="text-xs font-black text-white">
            {manualSpeedupMinutes + calcMinutes}m
          </span>
        </div>
      </div>
      {totalSpeedupTokens > 0 && (
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex justify-between items-center animate-in fade-in duration-300">
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">
            {t(T.missionsGrid.speedupCalculator.yield)}
          </span>
          <span className="text-sm font-black text-blue-400">
            +{totalSpeedupTokens} {t(T.commandersList.tokens)}
          </span>
        </div>
      )}
    </div>
  )
}
