import { describe, it, expect } from 'vitest';
import { parseSpeedupTime } from '@/lib/utils';

describe('parseSpeedupTime', () => {
    describe('Auto Mode', () => {
        it('should parse standard format "Xd Xh Xm"', () => {
            expect(parseSpeedupTime('1d')).toBe(1440);
            expect(parseSpeedupTime('1d 1h')).toBe(1440 + 60);
            expect(parseSpeedupTime('1d 1h 1m')).toBe(1440 + 60 + 1);
            expect(parseSpeedupTime('2h 30m')).toBe(120 + 30);
        });

        it('should parse HH:MM:SS and HH:MM', () => {
            expect(parseSpeedupTime('10:30')).toBe(10 * 60 + 30);
            expect(parseSpeedupTime('1:00:00')).toBe(60);
        });

        it('should fallback to minutes for plain numbers', () => {
            expect(parseSpeedupTime('120')).toBe(120);
        });

        it('should ignore standard garbage', () => {
            expect(parseSpeedupTime('  1d  ')).toBe(1440);
        });
    });

    describe('Days Mode', () => {
        it('should parse plain numbers as days', () => {
            expect(parseSpeedupTime('1', 'days')).toBe(1440);
            expect(parseSpeedupTime('1.5', 'days')).toBe(1440 + 720);
            expect(parseSpeedupTime('0.5', 'days')).toBe(720);
        });

        it('should return 0 for invalid input', () => {
            expect(parseSpeedupTime('abc', 'days')).toBe(0);
        });
    });

    describe('Minutes Mode', () => {
        it('should parse plain numbers as minutes', () => {
            expect(parseSpeedupTime('120', 'minutes')).toBe(120);
            expect(parseSpeedupTime('60', 'minutes')).toBe(60);
        });

        it('should return 0 for invalid input', () => {
            expect(parseSpeedupTime('abc', 'minutes')).toBe(0);
        });
    });
});
