import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { SpeedupInputs } from './SpeedupInputs';
import { useCalculatorStore } from '../../store/use-calculator-store';

describe('SpeedupInputs Component', () => {
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
            speedupTimeStr: "",
            selectedCommanders: [],
            selectedCategory: "Infantry",
        });
    });

    it('renders all speedup category inputs', () => {
        render(<SpeedupInputs />);
        expect(screen.getByText('building (min)')).toBeInTheDocument();
        expect(screen.getByText('research (min)')).toBeInTheDocument();
        expect(screen.getByText('training (min)')).toBeInTheDocument();
        expect(screen.getByText('healing (min)')).toBeInTheDocument();
        expect(screen.getByText('universal (min)')).toBeInTheDocument();
    });

    it('displays speedup volume label and conversion rate', () => {
        render(<SpeedupInputs />);
        expect(screen.getByText('Speedup Volume (min)')).toBeInTheDocument();
        expect(screen.getByText('2 Per 480m')).toBeInTheDocument();
    });

    it('updates store when speedup value changes for a category', () => {
        render(<SpeedupInputs />);
        const inputs = screen.getAllByPlaceholderText('0');
        const buildingInput = inputs[0]; // First input should be building

        fireEvent.change(buildingInput, { target: { value: '1000' } });
        expect(useCalculatorStore.getState().missions.speedupMinutes.building).toBe(1000);
    });

    it('displays total packaged minutes correctly', () => {
        useCalculatorStore.setState({
            missions: {
                daily: {},
                challenge: {},
                repeatable: {},
                speedupMinutes: {
                    building: 500,
                    research: 300,
                    training: 200,
                    healing: 100,
                    universal: 50,
                },
                totalGemsSpent: 0,
            },
        });
        render(<SpeedupInputs />);
        // 500 + 300 + 200 + 100 + 50 = 1150m
        expect(screen.getByText('1150m')).toBeInTheDocument();
    });

    it('does not show volume yield when total is zero', () => {
        render(<SpeedupInputs />);
        expect(screen.queryByText('Volume Yield')).not.toBeInTheDocument();
    });

    it('displays correct token calculation for 480 minutes', () => {
        useCalculatorStore.setState({
            missions: {
                daily: {},
                challenge: {},
                repeatable: {},
                speedupMinutes: {
                    building: 480,
                    research: 0,
                    training: 0,
                    healing: 0,
                    universal: 0,
                },
                totalGemsSpent: 0,
            },
        });
        render(<SpeedupInputs />);
        // 480 / 480 = 1 * 2 = 2 tokens
        expect(screen.getByText('+2 Tokens')).toBeInTheDocument();
    });

    it('includes calculated speedup time in token calculation', () => {
        useCalculatorStore.setState({
            missions: {
                daily: {},
                challenge: {},
                repeatable: {},
                speedupMinutes: {
                    building: 480,
                    research: 0,
                    training: 0,
                    healing: 0,
                    universal: 0,
                },
                totalGemsSpent: 0,
            },
            speedupTimeStr: '1d 0:00:00', // 1440 minutes
        });
        render(<SpeedupInputs />);
        // Manual: 480, Calc: 1440 = 1920 total
        // 1920 / 480 = 4 * 2 = 8 tokens
        expect(screen.getByText('1920m')).toBeInTheDocument();
        expect(screen.getByText('+8 Tokens')).toBeInTheDocument();
    });
});
