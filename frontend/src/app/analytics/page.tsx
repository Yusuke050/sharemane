'use client'

import { useEffect, useState } from 'react'
import { DisplayTargetFilter } from './components/DisplayTargetFilter'
import { ExpenseSummaryCards } from './components/ExpenseSummaryCards'
import { CategoryExpenseChart } from './components/CategoryExpenseChart'
import { CategoryDetailsList } from './components/CategoryDetailsList'
import { fetchAnalyticsSummary } from '@/lib/api/analytics'
import type { AnalyticsSummary, CategoryExpense } from '@/lib/api/analytics'
import './page.css'

export default function AnalyticsPage() {
  const [selectedTarget, setSelectedTarget] = useState<'all' | string>('all')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(
    null
  )

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalyticsSummary(selectedTarget)
        setAnalyticsData(data)
      } catch (error) {
        console.error('Failed to load analytics data:', error)
      }
    }
    loadAnalytics()
  }, [selectedTarget])

  if (!analyticsData) {
    return (
      <main className="analytics-page">
        <div className="loading">読み込み中...</div>
      </main>
    )
  }

  // カテゴリ別詳細データを準備
  const categoryDetails: Array<CategoryExpense & { percentage: number }> =
    analyticsData.categoryExpenses.map((expense) => ({
      ...expense,
      percentage: expense.percentage,
    }))

  return (
    <main className="analytics-page">
      <div className="analytics-container">
        <DisplayTargetFilter
          selectedTarget={selectedTarget}
          members={analyticsData.members}
          onTargetChange={setSelectedTarget}
        />

        <ExpenseSummaryCards
          monthlyExpense={analyticsData.monthlyExpense}
          totalExpense={analyticsData.totalExpense}
        />

        <CategoryExpenseChart
          expenses={analyticsData.categoryExpenses}
          totalExpense={analyticsData.totalExpense}
        />

        <CategoryDetailsList details={categoryDetails} />
      </div>
    </main>
  )
}

