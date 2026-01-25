# Commanders List Component

This folder contains the refactored `CommandersList` component, split into focused, maintainable files.

## Structure

```
commanders-list/
├── index.tsx          # Main export and parent component
├── ListHeader.tsx     # Header with title and item count
├── CommanderItem.tsx  # Individual commander card
├── CommanderItems.tsx # Container for all commander items
└── ListSummary.tsx    # Calculation summary and progress
```

## Component Hierarchy

```
CommandersList (index.tsx)
├── ListHeader
├── CommanderItems
│   └── CommanderItem (multiple)
└── ListSummary
```

## Responsibilities

- **index.tsx**: Static parent that composes the list UI structure
- **ListHeader.tsx**: Displays title and selected commander count
- **CommanderItem.tsx**: Individual commander card with details and remove button
- **CommanderItems.tsx**: Renders the list of commanders or empty state
- **ListSummary.tsx**: Shows total cost, tokens needed, gathered, and completion percentage

## Usage

```tsx
import { CommandersList } from "./components/commanders-list";

// In your app
<CommandersList />
```

## Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Optimized Re-renders**: Uses selective Zustand subscriptions to prevent unnecessary updates
3. **Clean Code**: Readable and self-documenting with JSDoc comments
4. **User Feedback**: Smooth animations and clear visual hierarchy
