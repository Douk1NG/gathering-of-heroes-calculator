import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MissionsGrid } from '@/components/missions-grid/index'
import { useCalculatorStore } from '@/store/use-calculator-store'
import { t, translations } from '@/lib/translations'

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
    expect(screen.getByText(t(translations.missionsGrid.daily.title))).toBeInTheDocument()
    expect(screen.getByText(t(translations.missionsGrid.challenge.title))).toBeInTheDocument()
    expect(screen.getByText(t(translations.missionsGrid.repeatable.title))).toBeInTheDocument()
  })

  it('renders daily card with missions', () => {
    render(<MissionsGrid />)
    expect(screen.getByText(t(translations.missionsGrid.daily.login))).toBeInTheDocument()
    expect(screen.getByText(t(translations.missionsGrid.daily.barbs))).toBeInTheDocument()
    expect(screen.getByText(t(translations.missionsGrid.daily.gather))).toBeInTheDocument()
  })

  it('renders all challenge mission buttons', () => {
    render(<MissionsGrid />)
    expect(screen.getByText(t(translations.missionsGrid.challenge.login5))).toBeInTheDocument()
    expect(screen.getByText(t(translations.missionsGrid.challenge.gems10k))).toBeInTheDocument()
    expect(screen.getByText(t(translations.missionsGrid.challenge.gems50k))).toBeInTheDocument()
    expect(screen.getByText(t(translations.missionsGrid.challenge.troop_power))).toBeInTheDocument()
  })

  it('renders repeatable card inputs', () => {
    render(<MissionsGrid />)
    expect(
      screen.getByPlaceholderText(t(translations.missionsGrid.gemsCalculator.placeholder)),
    ).toBeInTheDocument()
    expect(screen.getByText(t(translations.common.speedupCategories.building))).toBeInTheDocument()
    expect(screen.getByText(t(translations.common.speedupCategories.research))).toBeInTheDocument()
  })

  it('displays correct initial totals', () => {
    render(<MissionsGrid />)
    // Daily: 90 tokens
    expect(
      screen.getByText(new RegExp(`90 ${t(translations.commandersList.tokens)}`, 'i')),
    ).toBeInTheDocument()

    // Challenge and Repeatable both show 0 Tokens initially
    const zeroTokens = screen.getAllByText(
      new RegExp(`0 ${t(translations.commandersList.tokens)}`, 'i'),
    )
    expect(zeroTokens.length).toBeGreaterThanOrEqual(2)
  })

  it('displays training calculator only for troop power mission', () => {
    render(<MissionsGrid />)
    const calculatorLinks = screen.getAllByText(
      new RegExp(t(translations.missionsGrid.speedupCalculator.title), 'i'),
    )
    expect(calculatorLinks).toHaveLength(1)
  })
})
