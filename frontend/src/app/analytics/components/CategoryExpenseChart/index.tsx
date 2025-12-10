'use client'

import './index.css'

export type CategoryExpense = {
  category: string
  amount: number
  color: string
}

type Props = {
  expenses: CategoryExpense[]
  totalExpense: number
}

export function CategoryExpenseChart({ expenses, totalExpense }: Props) {
  // 円グラフのデータを準備
  const calculateAngle = (amount: number, total: number) => {
    return (amount / total) * 360
  }

  const paths = expenses.reduce<
    Array<CategoryExpense & { pathData: string; angle: number }>
  >((acc, expense) => {
    const angle = calculateAngle(expense.amount, totalExpense)
    const previousAngle = acc.reduce((sum, item) => sum + item.angle, 0)
    const startAngle = previousAngle
    const endAngle = previousAngle + angle

    const startX =
      50 + 50 * Math.cos(((startAngle - 90) * Math.PI) / 180)
    const startY =
      50 + 50 * Math.sin(((startAngle - 90) * Math.PI) / 180)
    const endX = 50 + 50 * Math.cos(((endAngle - 90) * Math.PI) / 180)
    const endY = 50 + 50 * Math.sin(((endAngle - 90) * Math.PI) / 180)

    const largeArcFlag = angle > 180 ? 1 : 0

    const pathData = [
      `M 50 50`,
      `L ${startX} ${startY}`,
      `A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `Z`,
    ].join(' ')

    return [...acc, { ...expense, pathData, angle }]
  }, [])

  return (
    <div className="category-expense-chart">
      <h2 className="chart-title">カテゴリ別支出</h2>
      <div className="chart-container">
        <svg
          viewBox="0 0 100 100"
          className="pie-chart"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((item, index) => (
            <path
              key={index}
              d={item.pathData}
              fill={item.color}
              className="chart-segment"
            />
          ))}
        </svg>
        <div className="chart-legend">
          {expenses.map((expense, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: expense.color }}
              />
              <span className="legend-label">{expense.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

