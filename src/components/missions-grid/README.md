# Missions Grid Component

This folder contains the refactored `MissionsGrid` component, split into focused, optimized files to minimize re-renders.

## Structure

```
missions-grid/
├── index.tsx                    # Main export and parent component
├── DailyCard.tsx               # Daily missions (static)
├── ChallengeCard.tsx           # Challenge missions card
├── ChallengeMissionButton.tsx  # Individual challenge button
├── SpeedupCalculator.tsx       # Training time calculator
├── ChallengeTotal.tsx          # Challenge tokens total
├── RepeatableCard.tsx          # Repeatable missions card
├── GemsInput.tsx               # Gem spending input
├── SpeedupInputs.tsx           # Manual speedup inputs
└── RepeatableTotal.tsx         # Repeatable tokens total
```

## Component Hierarchy

```
MissionsGrid (index.tsx)
├── DailyCard (completely static)
├── ChallengeCard
│   ├── ChallengeMissionButton (per mission)
│   ├── SpeedupCalculator (only for troop_power)
│   └── ChallengeTotal
└── RepeatableCard
    ├── GemsInput
    ├── SpeedupInputs
    └── RepeatableTotal
```

## Responsibilities

### Main Cards
- **DailyCard.tsx**: Displays automated daily missions (completely static, no state)
- **ChallengeCard.tsx**: Container for challenge missions
- **RepeatableCard.tsx**: Container for repeatable spending missions

### Challenge Components
- **ChallengeMissionButton.tsx**: Individual toggle button - only re-renders when that specific mission changes
- **SpeedupCalculator.tsx**: Training time input and calculation - only re-renders when speedupTimeStr changes
- **ChallengeTotal.tsx**: Sum display - only re-renders when challenge missions change

### Repeatable Components
- **GemsInput.tsx**: Gem spending tracker - only re-renders when totalGemsSpent changes
- **SpeedupInputs.tsx**: Manual speedup inputs - only re-renders when speedupMinutes changes
- **RepeatableTotal.tsx**: Sum display - only re-renders when gems or speedups change

## Usage

```tsx
import { MissionsGrid } from "./components/missions-grid";

// In your app
<MissionsGrid />
```

## Optimization Strategy

1. **Static components**: DailyCard has zero state subscriptions
2. **Micro-components**: Each input/button/total is its own component
3. **Granular subscriptions**: Components only subscribe to the exact data they display
4. **No function references in useShallow**: Functions are subscribed separately to avoid triggering re-renders

## Re-render Behavior

- ✅ **Daily missions**: Never re-renders (static)
- ✅ **Challenge button**: Only that button re-renders when toggled
- ✅ **Speedup calculator**: Only re-renders when input changes
- ✅ **Gems input**: Only re-renders when gem value changes
- ✅ **Speedup inputs**: Only re-renders when speedup values change

**Result**: Maximum performance with minimal unnecessary re-renders! 🚀
