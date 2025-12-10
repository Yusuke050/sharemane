'use client'

import { useState } from 'react'
import { DisplayTargetFilter } from './components/DisplayTargetFilter'
import { ExpenseSummaryCards } from './components/ExpenseSummaryCards'
import { CategoryExpenseChart } from './components/CategoryExpenseChart'
import { CategoryDetailsList } from './components/CategoryDetailsList'
import './page.css'

// サンプルデータ
const SAMPLE_CATEGORY_EXPENSES = [
  { category: '家賃', amount: 250003, color: '#475569' }, // slate-600
  { category: '娯楽', amount: 1500, color: '#8b5cf6' }, // violet-500
  { category: '交際費', amount: 500, color: '#94a3b8' }, // slate-400
  { category: '食費', amount: 500, color: '#64748b' }, // slate-500
]

const SAMPLE_TOTAL_EXPENSE = 252503

export default function AnalyticsPage() {
  const [selectedTarget, setSelectedTarget] = useState<'all' | string>('all')
  const members = ['太郎', '花子']

  // カテゴリ別詳細データを準備
  const categoryDetails = SAMPLE_CATEGORY_EXPENSES.map((expense) => ({
    ...expense,
    percentage: Math.round((expense.amount / SAMPLE_TOTAL_EXPENSE) * 100 * 10) / 10,
  }))

  return (
    <main className="analytics-page">
      <div className="analytics-container">
        <DisplayTargetFilter
          selectedTarget={selectedTarget}
          members={members}
          onTargetChange={setSelectedTarget}
        />

        <ExpenseSummaryCards
          monthlyExpense={SAMPLE_TOTAL_EXPENSE}
          totalExpense={SAMPLE_TOTAL_EXPENSE}
        />

        <CategoryExpenseChart
          expenses={SAMPLE_CATEGORY_EXPENSES}
          totalExpense={SAMPLE_TOTAL_EXPENSE}
        />

        <CategoryDetailsList details={categoryDetails} />
      </div>
    </main>
  )
}

