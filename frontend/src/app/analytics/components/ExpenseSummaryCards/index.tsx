'use client'

import './index.css'

type Props = {
  monthlyExpense: number
  totalExpense: number
}

export function ExpenseSummaryCards({
  monthlyExpense,
  totalExpense,
}: Props) {
  return (
    <div className="expense-summary-cards">
      <div className="summary-card monthly">
        <p className="summary-label">今月の支出</p>
        <p className="summary-amount">¥{monthlyExpense.toLocaleString()}</p>
      </div>
      <div className="summary-card total">
        <p className="summary-label">合計支出</p>
        <p className="summary-amount">¥{totalExpense.toLocaleString()}</p>
      </div>
    </div>
  )
}

