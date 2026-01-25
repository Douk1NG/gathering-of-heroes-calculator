import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { SpeedupCalculator } from './SpeedupCalculator';
import { useCalculatorStore } from '../../store/use-calculator-store';

describe('SpeedupCalculator Component', () => {
    beforeEach(() => {
        useCalculatorStore.setState({
            speedupTimeStr: "",
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
        });
    });

    it('renders the speedup calculator with input field', () => {
        render(<SpeedupCalculator />);
        expect(screen.getByText('Training Calculator ↗')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('EX: 138d 21:20:00')).toBeInTheDocument();
    });

    it('updates input value when typing', () => {
        render(<SpeedupCalculator />);
        const input = screen.getByPlaceholderText('EX: 138d 21:20:00') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '10d 5:30:00' } });
        expect(input.value).toBe('10d 5:30:00');
        expect(useCalculatorStore.getState().speedupTimeStr).toBe('10d 5:30:00');
    });

    it('does not show calculated result when input is empty', () => {
        render(<SpeedupCalculator />);
        expect(screen.queryByText(/Calculated Addition/i)).not.toBeInTheDocument();
    });

    it('displays calculated tokens for valid time input (days + time)', () => {
        useCalculatorStore.setState({ speedupTimeStr: '1d 0:00:00' });
        render(<SpeedupCalculator />);

        // 1 day = 1440 minutes
        // 1440 / 480 = 3 * 2 = 6 tokens
        expect(screen.getByText('Calculated Addition')).toBeInTheDocument();
        expect(screen.getByText('+6')).toBeInTheDocument();
    });

    it('displays calculated tokens for complex time input', () => {
        // 138 days 21 hours 20 minutes
        // = 138 * 1440 + 21 * 60 + 20
        // = 198720 + 1260 + 20 = 200000 minutes
        // 200000 / 480 = 416.66... -> 416 * 2 = 832 tokens
        useCalculatorStore.setState({ speedupTimeStr: '138d 21:20:00' });
        render(<SpeedupCalculator />);

        expect(screen.getByText('+832')).toBeInTheDocument();
    });

    it('shows link to external training calculator', () => {
        render(<SpeedupCalculator />);
        const link = screen.getByText('Training Calculator ↗').closest('a');
        expect(link).toHaveAttribute('href', 'https://rok-calc.vercel.app/mge-training');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
