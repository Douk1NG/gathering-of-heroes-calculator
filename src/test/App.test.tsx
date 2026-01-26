import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('App Component', () => {
    it('renders the header', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: /GATHERING OF HEROES/i })).toBeInTheDocument();
    });

    it('renders the target selection section', () => {
        render(<App />);
        expect(screen.getByText(/Target Selection/i)).toBeInTheDocument();
    });
});
