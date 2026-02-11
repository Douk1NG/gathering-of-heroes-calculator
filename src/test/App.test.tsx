import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';
import { t } from '@/lib/utils';
import { T } from '@/translations';

describe('App Component', () => {
    it('renders the header', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: new RegExp(t(T.header.title).split(' ')[0], 'i') })).toBeInTheDocument();
    });

    it('renders the target selection section', () => {
        render(<App />);
        expect(screen.getByText(t(T.commanderSelection.title))).toBeInTheDocument();
    });
});
