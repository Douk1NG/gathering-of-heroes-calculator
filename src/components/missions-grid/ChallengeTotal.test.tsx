import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ChallengeTotal } from './ChallengeTotal';
import { useCalculatorStore } from '../../store/use-calculator-store';

describe('ChallengeTotal Component', () => {
    beforeEach(() => {
        useCalculatorStore.setState({
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
            selectedCommanders: [],
            speedupTimeStr: "",
            selectedCategory: "Infantry",
        });
    });

    it('displays zero tokens when no challenges are completed', () => {
        render(<ChallengeTotal />);
        expect(screen.getByText('0 Tokens')).toBeInTheDocument();
    });

    it('displays correct total for single completed challenge', () => {
        useCalculatorStore.setState({
            missions: {
                daily: {},
                challenge: { login5: 1 }, // 10 tokens
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
        });
        render(<ChallengeTotal />);
        expect(screen.getByText('10 Tokens')).toBeInTheDocument();
    });

    it('displays correct total for multiple completed challenges', () => {
        useCalculatorStore.setState({
            missions: {
                daily: {},
                challenge: {
                    login5: 1,      // 10 tokens
                    gems10k: 1,     // 20 tokens
                    gems50k: 1,     // 100 tokens
                    troop_power: 1, // 100 tokens
                },
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
        });
        render(<ChallengeTotal />);
        // 10 + 20 + 100 + 100 = 230
        expect(screen.getByText('230 Tokens')).toBeInTheDocument();
    });

    it('displays milestone total label', () => {
        render(<ChallengeTotal />);
        expect(screen.getByText('Milestone Total')).toBeInTheDocument();
    });
});
