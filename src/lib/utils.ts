export const LAST_UPDATED = "Jan 27, 2026";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Helper to get commander image path
// Assumes images are in public/commanders/ with format "name-lower-kebab.png"
export function getCommanderImageSrc(name: string): string {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/['.]/g, '');
    const baseUrl = import.meta.env.BASE_URL;
    return `${baseUrl}commanders/${slug}.png`;
}

// Business Logic
export const COMMANDER_TIERS = {
    TIER_1: {
        id: 1,
        name: "Tier 1",
        cost: 200,
        minSpend: 0
    },
    TIER_2: {
        id: 2,
        name: "Tier 2",
        cost: 500,
        minSpend: 400
    },
    TIER_3: {
        id: 3,
        name: "Tier 3",
        cost: 1000,
        minSpend: 1400
    }
} as const;

export type CommanderTier = typeof COMMANDER_TIERS[keyof typeof COMMANDER_TIERS];

export const MISSION_TYPES = {
    DAILY: "Daily Missions",
    CHALLENGE: "Challenge Missions",
    REPEATABLE: "Repeatable Missions"
} as const;

export const DAILY_MISSIONS = [
    { id: "login", name: "Log In", tokens: 2 },
    { id: "barbs", name: "Defeat Barbarians (100)", tokens: 10 },
    { id: "gather", name: "Gather 2Million Resources", tokens: 6 },
] as const;

export const CHALLENGE_MISSIONS = [
    { id: "login5", name: "Log In 5 Days", tokens: 10 },
    { id: "gems10k", name: "Spend 10k Gems", tokens: 20 },
    { id: "gems50k", name: "Spend 50k Gems", tokens: 100 },
    { id: "troop_power", name: "Increase Troop Power (600k)", tokens: 100 },
] as const;

export const REPEATABLE_MISSIONS = [
    { id: "gems2k", name: "Spend 2k Gems", tokens: 30 },
    { id: "speedups", name: "Use 480m Speedups", tokens: 2 },
] as const;

export const EVENT_DURATION_DAYS = 5;

export const COMMANDER_CATEGORIES = {
    INFANTRY: "Infantry",
    ARCHER: "Archer",
    CAVALRY: "Cavalry",
    LEADERSHIP: "Leadership",
    ENGINEERING: "Engineering"
} as const;

export type CommanderCategory = typeof COMMANDER_CATEGORIES[keyof typeof COMMANDER_CATEGORIES];

export const COMMANDER_DATABASE: Record<number, Record<CommanderCategory, string[]>> = {
    1: {
        [COMMANDER_CATEGORIES.INFANTRY]: [
            "Bai Qi", "William Wallace", "Guan Yu", "Harald Sigurdsson",
            "Zenobia", "K'inich Janaab Pakal", "Leonidas I"
        ],
        [COMMANDER_CATEGORIES.ARCHER]: [
            "Qin Shi Huang", "Shajar al-Durr", "Ramesses II",
            "Amanitore", "Gilgamesh", "Nebuchadnezzar II", "Artemisia I"
        ],
        [COMMANDER_CATEGORIES.CAVALRY]: [
            "Arthur Pendragon", "Gang Gam-chan", "Belisarius",
            "Attila", "William I", "Xiang Yu", "Jadwiga", "Chandragupta Maurya"
        ],
        [COMMANDER_CATEGORIES.LEADERSHIP]: [
            "Philip II", "Hector", "Honda Tadakatsu", "Yi Sun Sin",
            "Trajan", "Theodora", "Moctezuma I", "Suleiman I"
        ],
        [COMMANDER_CATEGORIES.ENGINEERING]: [
            "John Hunyadi", "Alfonso de Albuquerque", "Mary I", "Archimedes"
        ]
    },
    2: {
        [COMMANDER_CATEGORIES.INFANTRY]: [
            "Liu Che", "Gorgo", "Tariq ibn Ziyad", "Sargon the Great", "Flavius Aetius"
        ],
        [COMMANDER_CATEGORIES.ARCHER]: [
            "Zhuge Liang", "Hermann", "Ashurbanipal", "Boudica", "Henry V", "Dido"
        ],
        [COMMANDER_CATEGORIES.CAVALRY]: [
            "Huo Qubing", "Joan of Arc", "Alexander Nevsky", "Justinian I", "Jan Zizka"
        ],
        [COMMANDER_CATEGORIES.LEADERSHIP]: [
            "Heraclius", "Lapulapu"
        ],
        [COMMANDER_CATEGORIES.ENGINEERING]: [
            "Gonzalo de Córdoba", "Gajah Mada", "Margaret I", "Babur"
        ]
    },
    3: {
        [COMMANDER_CATEGORIES.INFANTRY]: [
            "Scipio Africanus", "Tokugawa Ieyasu", "Scipio Aemilianus"
        ],
        [COMMANDER_CATEGORIES.ARCHER]: [
            "Choe Yeong", "Shapur I"
        ],
        [COMMANDER_CATEGORIES.CAVALRY]: [
            "Achilles", "Subutai", "David IV", "Eleanor of Aquitaine"
        ],
        [COMMANDER_CATEGORIES.LEADERSHIP]: [
            "Matthias I"
        ],
        [COMMANDER_CATEGORIES.ENGINEERING]: [
            "Stephen III"
        ]
    }
};

export type SpeedupInputMode = 'auto' | 'days' | 'minutes';

export function parseSpeedupTime(timeStr: string, mode: SpeedupInputMode = 'auto'): number {
    if (!timeStr) return 0;
    const cleanStr = timeStr.trim();
    if (!cleanStr) return 0;

    // 1. Explicit Mode: Days
    if (mode === 'days') {
        const days = parseFloat(cleanStr);
        return isNaN(days) ? 0 : Math.floor(days * 1440);
    }

    // 2. Explicit Mode: Minutes
    if (mode === 'minutes') {
        const minutes = parseFloat(cleanStr);
        return isNaN(minutes) ? 0 : Math.floor(minutes);
    }

    // 3. Auto Mode (Existing logic + enhancements)
    let totalMinutes = 0;

    // Check for HH:MM:SS or HH:MM format first
    const timeMatch = cleanStr.match(/^(\d+):(\d+)(?::(\d+))?$/);
    if (timeMatch) {
        totalMinutes += parseInt(timeMatch[1]) * 60;
        totalMinutes += parseInt(timeMatch[2]);
        // Seconds are ignored for minute calculation logic usually, or round up? 
        // Existing logic didn't account for seconds explicitly in token calculation, just time sum.
        return totalMinutes;
    }

    // Check for "Xd Xh Xm" format
    const dayMatch = cleanStr.match(/(\d+)\s*d/i);
    if (dayMatch) totalMinutes += parseInt(dayMatch[1]) * 1440;

    const hourMatch = cleanStr.match(/(\d+)\s*h/i);
    if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60;

    const minMatch = cleanStr.match(/(\d+)\s*m/i);
    if (minMatch) totalMinutes += parseInt(minMatch[1]);

    // Fallback: if just a number is provided in auto mode, treat as minutes if it looks like an integer
    if (totalMinutes === 0 && /^\d+$/.test(cleanStr)) {
        totalMinutes = parseInt(cleanStr);
    }

    return totalMinutes;
}
