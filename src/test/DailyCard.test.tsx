import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { DailyCard } from '@/components/missions-grid/DailyCard'
import { t } from '@/lib/utils'
import { T } from '@/translations'

describe('DailyCard Component', () => {
  beforeEach(() => {
    // DailyCard is completely static, no store reset needed
  })

  it('renders the daily card with correct title', () => {
    render(<DailyCard />)
    expect(screen.getByText(t(T.missionsGrid.daily.title))).toBeInTheDocument()
  })

  it('displays all daily missions', () => {
    render(<DailyCard />)
    expect(screen.getByText(t(T.missionsGrid.daily.login))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.daily.barbs))).toBeInTheDocument()
    expect(screen.getByText(t(T.missionsGrid.daily.gather))).toBeInTheDocument()
  })

  it('displays correct token calculations for each mission', () => {
    render(<DailyCard />)
    // Log In: 2 tokens/day * 5 days = 10
    expect(
      screen.getByText(new RegExp(`\\+10 ${t(T.missionsGrid.daily.totalSuffix)}`, 'i')),
    ).toBeInTheDocument()
    // Defeat Barbarians: 10 tokens/day * 5 days = 50
    expect(
      screen.getByText(new RegExp(`\\+50 ${t(T.missionsGrid.daily.totalSuffix)}`, 'i')),
    ).toBeInTheDocument()
    // Gather Resources: 6 tokens/day * 5 days = 30
    expect(
      screen.getByText(new RegExp(`\\+30 ${t(T.missionsGrid.daily.totalSuffix)}`, 'i')),
    ).toBeInTheDocument()
  })

  it('displays correct total daily yield', () => {
    render(<DailyCard />)
    expect(
      screen.getByText(new RegExp(`90 ${t(T.commandersList.tokens)}`, 'i')),
    ).toBeInTheDocument()
  })

  it('shows assumed 5 days label for each mission', () => {
    render(<DailyCard />)
    const assumedLabels = screen.getAllByText(t(T.missionsGrid.daily.assumed))
    expect(assumedLabels).toHaveLength(3)
  })
})
