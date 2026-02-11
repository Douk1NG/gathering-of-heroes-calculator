import { useShallow } from 'zustand/react/shallow'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { type CommanderCategory } from '@/types/commander/commander'

export function useCommanderButton(name: string, category: CommanderCategory, tierId: number) {
  const { isCommanderSelected, toggleCommander, isTierUnlocked } = useCalculatorStore(
    useShallow((state) => ({
      isCommanderSelected: !!state.selectedCommanders.find((commander) => commander.name === name),
      toggleCommander: state.toggleCommander,
      isTierUnlocked: state.isTierUnlocked(tierId),
    })),
  )

  const isDisabled = !isTierUnlocked && !isCommanderSelected

  const handleToggle = () => {
    toggleCommander(name, category, tierId)
  }

  return {
    isCommanderSelected,
    isTierUnlocked,
    isDisabled,
    handleToggle,
  }
}
