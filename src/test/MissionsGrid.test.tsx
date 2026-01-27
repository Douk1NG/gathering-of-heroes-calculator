import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MissionsGrid } from '@/components/missions-grid/index';
import { useCalculatorStore } from '@/store/use-calculator-store';

describe('MissionsGrid Integration Tests', () => {
    beforeEach(() => {
        useCalculatorStore.setState({
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
            speedupTimeStr: "",
            selectedCategory: "Infantry",
        });
    });

    it('renders all three mission cards', () => {
        render(<MissionsGrid />);
        expect(screen.getByText('Daily')).toBeInTheDocument();
        expect(screen.getByText('Challenge')).toBeInTheDocument();
        expect(screen.getByText('Repeatable')).toBeInTheDocument();
    });

    it('renders daily card with missions', () => {
        render(<MissionsGrid />);
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Defeat Barbarians (100)')).toBeInTheDocument();
        expect(screen.getByText('Gather 2Million Resources')).toBeInTheDocument();
    });

    it('renders all challenge mission buttons', () => {
        render(<MissionsGrid />);
        expect(screen.getByText('Log In 5 Days')).toBeInTheDocument();
        expect(screen.getByText('Spend 10k Gems')).toBeInTheDocument();
        expect(screen.getByText('Spend 50k Gems')).toBeInTheDocument();
        expect(screen.getByText('Increase Troop Power (600k)')).toBeInTheDocument();
    });

    it('renders repeatable card inputs', () => {
        render(<MissionsGrid />);
        expect(screen.getByPlaceholderText('Total Gems to spend...')).toBeInTheDocument();
        expect(screen.getByText('building')).toBeInTheDocument();
        expect(screen.getByText('research')).toBeInTheDocument();
    });

    it('displays correct initial totals', () => {
        render(<MissionsGrid />);
        // Daily: 90 tokens
        expect(screen.getByText('90 Tokens')).toBeInTheDocument();

        // Challenge and Repeatable both show 0 Tokens initially
        const zeroTokens = screen.getAllByText('0 Tokens');
        expect(zeroTokens.length).toBeGreaterThanOrEqual(2);
    });

    it('displays training calculator only for troop power mission', () => {
        render(<MissionsGrid />);
        const calculatorLinks = screen.getAllByText('Training Calculator ↗');
        expect(calculatorLinks).toHaveLength(1);
    });
});
