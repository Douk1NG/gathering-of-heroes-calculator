# Commander Selection Component

This folder contains the refactored `CommanderSelection` component, split into smaller, more maintainable files.

## Structure

```
commander-selection/
├── index.tsx              # Main export and parent component
├── CategoryTabs.tsx       # Category selection tabs (Infantry, Archer, etc.)
├── CommanderButton.tsx    # Individual commander button with lock/unlock state
├── TierSection.tsx        # Groups commanders by tier with lock requirements
└── CommanderList.tsx      # Displays filtered commanders by category
```

## Component Hierarchy

```
CommanderSelection (index.tsx)
├── CategoryTabs
└── CommanderList
    └── TierSection (multiple)
        └── CommanderButton (multiple)
```

## Responsibilities

- **index.tsx**: Static parent that composes the main UI structure
- **CategoryTabs.tsx**: Handles category selection with visual feedback
- **CommanderButton.tsx**: Individual commander selection with lock/unlock states
- **TierSection.tsx**: Groups commanders by tier and displays unlock requirements
- **CommanderList.tsx**: Filters and displays commanders based on selected category

## Usage

```tsx
import { CommanderSelection } from "./components/commander-selection";

// In your app
<CommanderSelection />
```

## Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Clean Code**: Readable and maintainable, even for non-developers
3. **Reactive**: Uses Zustand with shallow comparison to prevent unnecessary re-renders
4. **Self-Documenting**: JSDoc comments explain component purpose
