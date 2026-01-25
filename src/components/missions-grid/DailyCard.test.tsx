import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { DailyCard } from './DailyCard';

describe('DailyCard Component', () => {
    beforeEach(() => {
        // DailyCard is completely static, no store reset needed
    });

    it('renders the daily card with correct title', () => {
        render(<DailyCard />);
        expect(screen.getByText('Daily')).toBeInTheDocument();
        expect(screen.getByText('Limit: 5 Days')).toBeInTheDocument();
    });

    it('displays all daily missions', () => {
        render(<DailyCard />);
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Defeat Barbarians (100)')).toBeInTheDocument();
        expect(screen.getByText('Gather 2Million Resources')).toBeInTheDocument();
    });

    it('displays correct token calculations for each mission', () => {
        render(<DailyCard />);
        // Log In: 2 tokens/day * 5 days = 10
        expect(screen.getByText('+10 Total')).toBeInTheDocument();
        // Defeat Barbarians: 10 tokens/day * 5 days = 50
        expect(screen.getByText('+50 Total')).toBeInTheDocument();
        // Gather Resources: 6 tokens/day * 5 days = 30
        expect(screen.getByText('+30 Total')).toBeInTheDocument();
    });

    it('displays correct total daily yield', () => {
        render(<DailyCard />);
        expect(screen.getByText('90 Tokens')).toBeInTheDocument();
    });

    it('shows assumed 5 days label for each mission', () => {
        render(<DailyCard />);
        const assumedLabels = screen.getAllByText('Assumed: 5 Days');
        expect(assumedLabels).toHaveLength(3);
    });
});
