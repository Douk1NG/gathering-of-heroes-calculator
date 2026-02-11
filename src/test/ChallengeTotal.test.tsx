import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ChallengeTotal } from '@/components/missions-grid/ChallengeTotal'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { t } from '@/lib/utils'
import { T } from '@/translations'

describe('ChallengeTotal Component', () => {
  beforeEach(() => {
    useCalculatorStore.setState({
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
      selectedCommanders: [],
      speedupTimeStr: '',
      selectedCategory: 'Infantry',
    })
  })

  it('displays zero tokens when no challenges are completed', () => {
    render(<ChallengeTotal />)
    expect(screen.getByText(new RegExp(`0 ${t(T.commandersList.tokens)}`, 'i'))).toBeInTheDocument()
  })

  it('displays correct total for single completed challenge', () => {
    useCalculatorStore.setState({
      missions: {
        daily: {},
        challenge: { login5: 1 }, // 10 tokens
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
    render(<ChallengeTotal />)
    expect(
      screen.getByText(new RegExp(`10 ${t(T.commandersList.tokens)}`, 'i')),
    ).toBeInTheDocument()
  })

  it('displays correct total for multiple completed challenges', () => {
    useCalculatorStore.setState({
      missions: {
        daily: {},
        challenge: {
          login5: 1, // 10 tokens
          gems10k: 1, // 20 tokens
          gems50k: 1, // 100 tokens
          troop_power: 1, // 100 tokens
        },
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
    render(<ChallengeTotal />)
    // 10 + 20 + 100 + 100 = 230
    expect(
      screen.getByText(new RegExp(`230 ${t(T.commandersList.tokens)}`, 'i')),
    ).toBeInTheDocument()
  })

  it('displays milestone total label', () => {
    render(<ChallengeTotal />)
    expect(screen.getByText(t(T.missionsGrid.challenge.total))).toBeInTheDocument()
  })
})
