import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  parseSpeedupTime,
  calculateSpeedupTokens,
  calculateTotalTokens,
  calculateTotalCost,
  checkUnlockStatus,
  checkTierUnlock,
  getTierUnlockRequirement,
} from '@/lib/calculations'

import { COMMANDER_TIERS } from '@/lib/constants'
import { type CalculatorState } from '@/types/store/calculator-store'

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      selectedCommanders: [],
      missions: {
        daily: {},
        challenge: {},
        repeatable: {},
        speedupMinutes: {
          building: 0,
          research: 0,
          training: 0,
          healing: 0,
          universal: 0,
        },
        totalGemsSpent: 0,
      },
      selectedCategory: 'Infantry',
      speedupTimeStr: '',
      speedupInputMode: 'auto',

      reset: () =>
        set({
          selectedCommanders: [],
          missions: {
            daily: {},
            challenge: {},
            repeatable: {},
            speedupMinutes: {
              building: 0,
              research: 0,
              training: 0,
              healing: 0,
              universal: 0,
            },
            totalGemsSpent: 0,
          },
          speedupTimeStr: '',
          speedupInputMode: 'auto',
          // We keep selectedCategory as it was
        }),

      toggleCommander: (name, category, tierId) =>
        set((state) => {
          const isSelected = state.selectedCommanders.find((c) => c.name === name)
          if (isSelected) {
            return {
              selectedCommanders: state.selectedCommanders.filter((c) => c.name !== name),
            }
          } else {
            const tierKey = `TIER_${tierId}` as keyof typeof COMMANDER_TIERS
            const cost = COMMANDER_TIERS[tierKey].cost
            return {
              selectedCommanders: [...state.selectedCommanders, { name, category, tierId, cost }],
            }
          }
        }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      setSpeedupInputMode: (mode) => set({ speedupInputMode: mode }),

      updateDaily: () => {}, // Dailies are now automated

      updateChallenge: (id, value) =>
        set((state) => ({
          missions: { ...state.missions, challenge: { ...state.missions.challenge, [id]: value } },
        })),

      updateRepeatable: (id, value) =>
        set((state) => ({
          missions: {
            ...state.missions,
            repeatable: { ...state.missions.repeatable, [id]: Math.max(0, value) },
          },
        })),

      updateSpeedupMinutes: (category, value) =>
        set((state) => ({
          missions: {
            ...state.missions,
            speedupMinutes: {
              ...state.missions.speedupMinutes,
              [category]: Math.max(0, value),
            },
          },
        })),

      updateGemsSpent: (value) =>
        set((state) => ({
          missions: { ...state.missions, totalGemsSpent: Math.max(0, value) },
        })),

      updateSpeedupTime: (timeStr) => set({ speedupTimeStr: timeStr }),

      getSpeedupMinutes: () => {
        const str = get().speedupTimeStr
        const mode = get().speedupInputMode
        return parseSpeedupTime(str, mode)
      },

      getTotalTokens: () => {
        const { missions, speedupTimeStr, speedupInputMode } = get()
        const speedupTokens = calculateSpeedupTokens(
          missions.speedupMinutes,
          speedupTimeStr,
          speedupInputMode,
        )
        return calculateTotalTokens(missions, speedupTokens)
      },

      getTotalCost: () => {
        return calculateTotalCost(get().selectedCommanders)
      },

      getNeededTokens: () => {
        const totalCost = get().getTotalCost()
        const totalTokens = get().getTotalTokens()
        return Math.max(0, totalCost - totalTokens)
      },

      getUnlockStatus: () => {
        return checkUnlockStatus(get().selectedCommanders, get().getTotalTokens())
      },

      getProgress: () => {
        const totalCost = get().getTotalCost()
        if (totalCost === 0) return 0
        return Math.min(100, (get().getTotalTokens() / totalCost) * 100)
      },

      isTierUnlocked: (tierId: number) => {
        return checkTierUnlock(get().selectedCommanders, tierId)
      },

      getTierUnlockRequirement: (tierId: number) => {
        return getTierUnlockRequirement(get().selectedCommanders, tierId)
      },
    }),
    {
      name: 'goh-calculator-storage',
      partialize: (state) => ({
        selectedCommanders: state.selectedCommanders,
        missions: state.missions,
        selectedCategory: state.selectedCategory,
        speedupTimeStr: state.speedupTimeStr,
        speedupInputMode: state.speedupInputMode,
      }),
    },
  ),
)
