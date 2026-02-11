import { describe, it, expect, beforeEach } from 'vitest';
import { useCalculatorStore } from '@/store/use-calculator-store';
import { COMMANDER_TIERS } from '@/lib/constants';
import { t } from '@/lib/utils';
import { T } from '@/translations';

describe('useCalculatorStore - Target Selection', () => {
    beforeEach(() => {
        // Reset the store before each test
        useCalculatorStore.setState({
            selectedCommanders: [],
            selectedCategory: "Infantry",
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
            speedupTimeStr: "",
        });
    });

    it('should toggle a commander selection', () => {
        const { toggleCommander } = useCalculatorStore.getState();

        // Select a commander
        toggleCommander('Bai Qi', 'Infantry', 1);
        expect(useCalculatorStore.getState().selectedCommanders).toHaveLength(1);
        expect(useCalculatorStore.getState().selectedCommanders[0].name).toBe('Bai Qi');
        expect(useCalculatorStore.getState().selectedCommanders[0].cost).toBe(COMMANDER_TIERS.TIER_1.cost);

        // Deselect the same commander
        toggleCommander('Bai Qi', 'Infantry', 1);
        expect(useCalculatorStore.getState().selectedCommanders).toHaveLength(0);
    });

    it('should calculate total cost accounting for minSpend requirements', () => {
        const { toggleCommander, getTotalCost } = useCalculatorStore.getState();

        // Tier 3 has 1400 minSpend. Selecting just one T3 (1000) should cost 2400 
        // (because you MUST spend 1400 on T1/T2 to unlock it)
        toggleCommander('Scipio Africanus', 'Infantry', 3);
        expect(getTotalCost()).toBe(COMMANDER_TIERS.TIER_3.minSpend + COMMANDER_TIERS.TIER_3.cost);

        // If we also select T1/T2 commanders, the total cost should stay at 2400 until we exceed the minSpend
        toggleCommander('Bai Qi', 'Infantry', 1); // +200 actual cost
        expect(getTotalCost()).toBe(2400);

        toggleCommander('Liu Che', 'Infantry', 2); // +500 actual cost (total actual = 1000 + 200 + 500 = 1700)
        expect(getTotalCost()).toBe(2400); // minSpend 1400 + cost 1000 = 2400 is still the ceiling for 1700

        // Add more T2 (total actual = 1000 + 200 + 500 + 500 = 2200)
        toggleCommander('Gorgo', 'Infantry', 2);
        expect(getTotalCost()).toBe(2400);

        // Add another T1 (total actual = 2200 + 200 = 2400)
        toggleCommander('Leonidas I', 'Infantry', 1);
        expect(getTotalCost()).toBe(2400);

        // Add one more T1 (total actual = 2400 + 200 = 2600)
        toggleCommander('Guan Yu', 'Infantry', 1);
        expect(getTotalCost()).toBe(2600);
    });

    it('should calculate needed tokens correctly with minSpend requirements', () => {
        const { toggleCommander, getNeededTokens } = useCalculatorStore.getState();

        // Tier 2 has 400 minSpend. Selecting T2 (500) requires 900 total.
        // Automated dailies give 90 tokens.
        // Needed = 900 - 90 = 810.
        toggleCommander('Liu Che', 'Infantry', 2);
        expect(getNeededTokens()).toBe(810);
    });

    it('should update unlock status based on both tokens AND selection dependencies', () => {
        const { toggleCommander, getUnlockStatus, updateGemsSpent } = useCalculatorStore.getState();

        // Select a Tier 2 commander (minSpend 400)
        toggleCommander('Liu Che', 'Infantry', 2);

        // 1. Check token sufficiency
        // Dailies (90) < 400. Status: false.
        expect(getUnlockStatus()).toBe(false);

        // Add 22k gems (+30*11 = 330 tokens). Total = 90 + 330 = 420.
        // 420 >= 400. BUT we haven't selected any T1 commanders yet! (Selection dependency)
        updateGemsSpent(22000);
        expect(getUnlockStatus()).toBe(false);

        // 2. Check selection dependency
        // Add 2 T1 commanders (cost 400).
        toggleCommander('Bai Qi', 'Infantry', 1); // 200
        toggleCommander('Leonidas I', 'Infantry', 1); // 200

        // Now both tokens >= 400 AND selection in lower tiers >= 400.
        expect(getUnlockStatus()).toBe(true);
    });

    it('should correctly report isTierUnlocked', () => {
        const { toggleCommander, isTierUnlocked } = useCalculatorStore.getState();

        // Tier 1 is always unlocked
        expect(isTierUnlocked(1)).toBe(true);

        // Tier 2 is locked early on
        expect(isTierUnlocked(2)).toBe(false);

        // Add 400 worth of Tier 1
        toggleCommander('Bai Qi', 'Infantry', 1); // 200
        toggleCommander('Leonidas I', 'Infantry', 1); // 200

        expect(isTierUnlocked(2)).toBe(true);
        expect(isTierUnlocked(3)).toBe(false); // Tier 3 still locked (requires 1400)

        // Add more to Tier 1 and 2 to reach 1400
        toggleCommander('Liu Che', 'Infantry', 2); // 500 (Total = 900)
        toggleCommander('Gorgo', 'Infantry', 2); // 500 (Total = 1400)

        expect(isTierUnlocked(3)).toBe(true);
    });

    it('should correctly report getTierUnlockRequirement', () => {
        const { toggleCommander, getTierUnlockRequirement } = useCalculatorStore.getState();

        // Tier 1 is always unlocked
        expect(getTierUnlockRequirement(1)).toBeNull();

        // Tier 2 missing 400
        expect(getTierUnlockRequirement(2)).toBe(t(T.common.tierUnlockRequirement, { amount: 400, tokens: t(T.commandersList.tokens), tiers: '1' }));

        // Add 200 to Tier 1
        toggleCommander('Bai Qi', 'Infantry', 1);
        expect(getTierUnlockRequirement(2)).toBe(t(T.common.tierUnlockRequirement, { amount: 200, tokens: t(T.commandersList.tokens), tiers: '1' }));

        // Tier 3 missing 1400 - 200 = 1200
        expect(getTierUnlockRequirement(3)).toBe(t(T.common.tierUnlockRequirement, { amount: 1200, tokens: t(T.commandersList.tokens), tiers: '1 & 2' }));
    });
});
