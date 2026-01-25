import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { GemsInput } from './GemsInput';
import { useCalculatorStore } from '../../store/use-calculator-store';

describe('GemsInput Component', () => {
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

    it('renders gem input with correct labels', () => {
        render(<GemsInput />);
        expect(screen.getByText('Total Gems Spent')).toBeInTheDocument();
        expect(screen.getByText('30 Per 2k')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Total Gems to spend...')).toBeInTheDocument();
    });

    it('updates store when gems value changes', () => {
        render(<GemsInput />);
        const input = screen.getByPlaceholderText('Total Gems to spend...') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '5000' } });
        expect(useCalculatorStore.getState().missions.totalGemsSpent).toBe(5000);
    });

    it('does not show volume yield when gems is zero', () => {
        render(<GemsInput />);
        expect(screen.queryByText('Volume Yield')).not.toBeInTheDocument();
    });

    it('displays correct token calculation for 2000 gems', () => {
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
                totalGemsSpent: 2000,
            },
        });
        render(<GemsInput />);
        // 2000 / 2000 = 1 * 30 = 30 tokens
        expect(screen.getByText('+30 Tokens')).toBeInTheDocument();
    });

    it('displays correct token calculation for 10000 gems', () => {
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
                totalGemsSpent: 10000,
            },
        });
        render(<GemsInput />);
        // 10000 / 2000 = 5 * 30 = 150 tokens
        expect(screen.getByText('+150 Tokens')).toBeInTheDocument();
    });

    it('floors partial gem groups', () => {
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
                totalGemsSpent: 3999, // Just under 2 groups
            },
        });
        render(<GemsInput />);
        // 3999 / 2000 = 1.9995 -> floor to 1 * 30 = 30 tokens
        expect(screen.getByText('+30 Tokens')).toBeInTheDocument();
    });
});
