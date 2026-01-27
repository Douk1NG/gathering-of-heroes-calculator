import { create } from 'zustand';
import {
    COMMANDER_TIERS,
    CHALLENGE_MISSIONS,
    type CommanderCategory,
    parseSpeedupTime,
    type SpeedupInputMode
} from '@/lib/utils';

export interface MissionState {
    daily: Record<string, number>;
    challenge: Record<string, number>;
    repeatable: Record<string, number>;
    speedupMinutes: {
        building: number;
        research: number;
        training: number;
        healing: number;
        universal: number;
    };
    totalGemsSpent: number;
}

export interface SelectedCommander {
    name: string;
    tierId: number;
    category: CommanderCategory;
    cost: number;
}

interface CalculatorState {
    selectedCommanders: SelectedCommander[];
    missions: MissionState;
    selectedCategory: CommanderCategory | null;
    speedupTimeStr: string;
    speedupInputMode: SpeedupInputMode;

    // Actions
    toggleCommander: (name: string, category: CommanderCategory, tierId: number) => void;
    setSelectedCategory: (category: CommanderCategory | null) => void;
    setSpeedupInputMode: (mode: SpeedupInputMode) => void;
    updateDaily: () => void;
    updateChallenge: (id: string, value: number) => void;
    updateRepeatable: (id: string, value: number) => void;
    updateSpeedupMinutes: (category: keyof MissionState['speedupMinutes'], value: number) => void;
    updateGemsSpent: (value: number) => void;
    updateSpeedupTime: (timeStr: string) => void;

    // Selectors/Computed values
    getTotalTokens: () => number;
    getTotalCost: () => number;
    getNeededTokens: () => number;
    getUnlockStatus: () => boolean;
    getProgress: () => number;
    getSpeedupMinutes: () => number;
    isTierUnlocked: (tierId: number) => boolean;
    getTierUnlockRequirement: (tierId: number) => string | null;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
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
    selectedCategory: "Infantry",
    speedupTimeStr: "",
    speedupInputMode: "auto",

    toggleCommander: (name, category, tierId) => set((state) => {
        const isSelected = state.selectedCommanders.find(c => c.name === name);
        if (isSelected) {
            return {
                selectedCommanders: state.selectedCommanders.filter(c => c.name !== name)
            };
        } else {
            const tierKey = `TIER_${tierId}` as keyof typeof COMMANDER_TIERS;
            const cost = COMMANDER_TIERS[tierKey].cost;
            return {
                selectedCommanders: [...state.selectedCommanders, { name, category, tierId, cost }]
            };
        }
    }),

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    setSpeedupInputMode: (mode) => set({ speedupInputMode: mode }),

    updateDaily: () => { }, // Dailies are now automated

    updateChallenge: (id, value) => set((state) => ({
        missions: { ...state.missions, challenge: { ...state.missions.challenge, [id]: value } }
    })),

    updateRepeatable: (id, value) => set((state) => ({
        missions: { ...state.missions, repeatable: { ...state.missions.repeatable, [id]: Math.max(0, value) } }
    })),

    updateSpeedupMinutes: (category, value) => set((state) => ({
        missions: {
            ...state.missions,
            speedupMinutes: {
                ...state.missions.speedupMinutes,
                [category]: Math.max(0, value)
            }
        }
    })),

    updateGemsSpent: (value) => set((state) => ({
        missions: { ...state.missions, totalGemsSpent: Math.max(0, value) }
    })),

    updateSpeedupTime: (timeStr) => set({ speedupTimeStr: timeStr }),

    getSpeedupMinutes: () => {
        const str = get().speedupTimeStr;
        const mode = get().speedupInputMode;
        return parseSpeedupTime(str, mode);
    },

    getTotalTokens: () => {
        const { missions, getSpeedupMinutes } = get();

        // 1. Automated Dailies (5 days * 18 tokens per day = 90)
        const dailyTotal = 90;

        // 2. Challenge Milestones (Checked challenges only)
        const challengeTotal = CHALLENGE_MISSIONS.reduce((acc, m) => {
            return acc + (missions.challenge[m.id] || 0) * m.tokens;
        }, 0);

        // 3. Spending Yields (Strictly from raw volume)
        const gemSpendTokens = Math.floor(missions.totalGemsSpent / 2000) * 30;

        // 4. Accumulator Yields (Manual Minutes + Calc Minutes)
        const manualMinutes = Object.values(missions.speedupMinutes).reduce((a, b) => a + b, 0);
        const calcMinutes = getSpeedupMinutes();
        const speedupTokens = Math.floor((manualMinutes + calcMinutes) / 480) * 2;

        return dailyTotal + challengeTotal + gemSpendTokens + speedupTokens;
    },

    getTotalCost: () => {
        const { selectedCommanders } = get();
        if (selectedCommanders.length === 0) return 0;

        // 1. Calculate actual cost of selected commanders
        const baseCost = selectedCommanders.reduce((acc, c) => acc + c.cost, 0);

        // 2. Identify the highest tier selected and its minSpend requirement
        let maxMinSpend = 0;
        let highestTierId = 0;

        selectedCommanders.forEach(c => {
            const tierKey = `TIER_${c.tierId}` as keyof typeof COMMANDER_TIERS;
            const minSpend = COMMANDER_TIERS[tierKey].minSpend;
            if (minSpend > maxMinSpend) {
                maxMinSpend = minSpend;
            }
            if (c.tierId > highestTierId) {
                highestTierId = c.tierId;
            }
        });

        // 3. Cost of commanders in the highest tier selected
        const highestTierCost = selectedCommanders
            .filter(c => c.tierId === highestTierId)
            .reduce((sum, c) => sum + c.cost, 0);

        // Total cost must be at least minSpend of highest tier (spent on lower tiers) + cost of highest tier items
        return Math.max(baseCost, maxMinSpend + highestTierCost);
    },

    getNeededTokens: () => {
        const totalCost = get().getTotalCost();
        const totalTokens = get().getTotalTokens();
        return Math.max(0, totalCost - totalTokens);
    },

    getUnlockStatus: () => {
        const { selectedCommanders, getTotalTokens } = get();
        if (selectedCommanders.length === 0) return true;

        const totalTokens = getTotalTokens();

        // 1. Find the highest tier selected
        let maxMinSpend = 0;
        let highestTierId = 0;

        selectedCommanders.forEach(c => {
            const tierKey = `TIER_${c.tierId}` as keyof typeof COMMANDER_TIERS;
            const minSpend = COMMANDER_TIERS[tierKey].minSpend;
            if (minSpend > maxMinSpend) {
                maxMinSpend = minSpend;
            }
            if (c.tierId > highestTierId) {
                highestTierId = c.tierId;
            }
        });

        // 2. Check if total tokens meet the highest tier's minSpend
        if (totalTokens < maxMinSpend) return false;

        // 3. Check if current selections in lower tiers meet the requirements for higher tiers
        for (const c of selectedCommanders) {
            const tierKey = `TIER_${c.tierId}` as keyof typeof COMMANDER_TIERS;
            const requiredLowerSpend = COMMANDER_TIERS[tierKey].minSpend;

            if (requiredLowerSpend > 0) {
                const actualLowerSpend = selectedCommanders
                    .filter(lower => lower.name !== c.name && lower.tierId < c.tierId)
                    .reduce((sum, lower) => sum + lower.cost, 0);

                if (actualLowerSpend < requiredLowerSpend) return false;
            }
        }

        return true;
    },

    getProgress: () => {
        const totalCost = get().getTotalCost();
        if (totalCost === 0) return 0;
        return Math.min(100, (get().getTotalTokens() / totalCost) * 100);
    },

    isTierUnlocked: (tierId: number) => {
        const { selectedCommanders } = get();
        const tierKey = `TIER_${tierId}` as keyof typeof COMMANDER_TIERS;
        const requiredLowerSpend = COMMANDER_TIERS[tierKey].minSpend;

        if (requiredLowerSpend === 0) return true;

        const actualLowerSpend = selectedCommanders
            .filter(c => c.tierId < tierId)
            .reduce((sum, c) => sum + c.cost, 0);

        return actualLowerSpend >= requiredLowerSpend;
    },

    getTierUnlockRequirement: (tierId: number) => {
        const { selectedCommanders } = get();
        const tierKey = `TIER_${tierId}` as keyof typeof COMMANDER_TIERS;
        const requiredLowerSpend = COMMANDER_TIERS[tierKey].minSpend;

        if (requiredLowerSpend === 0) return null;

        const actualLowerSpend = selectedCommanders
            .filter(c => c.tierId < tierId)
            .reduce((sum, c) => sum + c.cost, 0);

        if (actualLowerSpend >= requiredLowerSpend) return null;

        const difference = requiredLowerSpend - actualLowerSpend;
        const lowerTiersString = Array.from({ length: tierId - 1 }, (_, i) => (i + 1)).join(' & ');

        return `Spend ${difference} more tokens on Tier ${lowerTiersString}`;
    },
}));
