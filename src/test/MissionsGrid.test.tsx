import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MissionsGrid } from '@/components/missions-grid/index'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { t } from '@/lib/utils'
import { T } from '@/translations'

describe('MissionsGrid Integration Tests', () => {
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

  it('renders all three mission cards', () => {
    render(<MissionsGrid />)
    expect(screen.getByText(t(T.missionsGrid.daily.title))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.challenge.title))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.repeatable.title))).toBeInTheDocument()
  })

  it('renders daily card with missions', () => {
    render(<MissionsGrid />)
    expect(screen.getByText(t(T.missionsGrid.daily.login))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.daily.barbs))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.daily.gather))).toBeInTheDocument()
  })

  it('renders all challenge mission buttons', () => {
    render(<MissionsGrid />)
    expect(screen.getByText(t(T.missionsGrid.challenge.login5))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.challenge.gems10k))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.challenge.gems50k))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.challenge.troop_power))).toBeInTheDocument()
  })

  it('renders repeatable card inputs', () => {
    render(<MissionsGrid />)
    expect(
      screen.getByPlaceholderText(t(T.missionsGrid.gemsCalculator.placeholder)),
    ).toBeInTheDocument()
    expect(screen.getByText(t(T.common.speedupCategories.building))).toBeInTheDocument()
    expect(screen.getByText(t(T.common.speedupCategories.research))).toBeInTheDocument()
  })

  it('displays correct initial totals', () => {
    render(<MissionsGrid />)
    // Daily: 90 tokens
    expect(
      screen.getByText(new RegExp(`90 ${t(T.commandersList.tokens)}`, 'i')),
    ).toBeInTheDocument()

    // Challenge and Repeatable both show 0 Tokens initially
    const zeroTokens = screen.getAllByText(new RegExp(`0 ${t(T.commandersList.tokens)}`, 'i'))
    expect(zeroTokens.length).toBeGreaterThanOrEqual(2)
  })

  it('displays training calculator only for troop power mission', () => {
    render(<MissionsGrid />)
    const calculatorLinks = screen.getAllByText(
      new RegExp(t(T.missionsGrid.speedupCalculator.title), 'i'),
    )
    expect(calculatorLinks).toHaveLength(1)
  })
})
