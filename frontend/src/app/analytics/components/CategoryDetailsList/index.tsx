'use client'

import './index.css'

export type CategoryDetail = {
  category: string
  amount: number
  percentage: number
  color: string
}

type Props = {
  details: CategoryDetail[]
}

export function CategoryDetailsList({ details }: Props) {
  return (
    <div className="category-details-list">
      <h2 className="details-title">カテゴリ別詳細</h2>
      <div className="details-list">
        {details.map((detail, index) => (
          <div key={index} className="detail-item">
            <div className="detail-header">
              <span className="detail-category">{detail.category}</span>
              <div className="detail-amounts">
                <span className="detail-amount">
                  ¥{detail.amount.toLocaleString()}
                </span>
                <span className="detail-percentage">{detail.percentage}%</span>
              </div>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${detail.percentage}%`,
                  backgroundColor: detail.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

