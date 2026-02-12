import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ChallengeMissionButton } from '@/components/missions-grid/ChallengeMissionButton'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { t, translations } from '@/lib/translations'

describe('ChallengeMissionButton Component', () => {
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
      speedupTimeStr: '',
      selectedCategory: 'Infantry',
    })
  })

  it('renders uncompleted mission button', () => {
    render(<ChallengeMissionButton missionId="login5" name="Log In 5 Days" tokens={10} />)
    expect(screen.getByText('Log In 5 Days')).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`\\+10 ${t(translations.commandersList.tokens)}`, 'i')),
    ).toBeInTheDocument()
  })

  it('shows inactive state when mission is not completed', () => {
    render(<ChallengeMissionButton missionId="login5" name="Log In 5 Days" tokens={10} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-black/40')
  })

  it('shows active state when mission is completed', () => {
    useCalculatorStore.setState({
      missions: {
        daily: {},
        challenge: { login5: 1 },
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
    })

    render(<ChallengeMissionButton missionId="login5" name="Log In 5 Days" tokens={10} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-yellow-500/10')
  })

  it('toggles mission state when clicked', () => {
    render(<ChallengeMissionButton missionId="login5" name="Log In 5 Days" tokens={10} />)

    const button = screen.getByRole('button')

    // Initially uncompleted
    expect(useCalculatorStore.getState().missions.challenge.login5).toBeUndefined()

    // Click to complete
    fireEvent.click(button)
    expect(useCalculatorStore.getState().missions.challenge.login5).toBe(1)

    // Click again to uncomplete
    fireEvent.click(button)
    expect(useCalculatorStore.getState().missions.challenge.login5).toBe(0)
  })
})
