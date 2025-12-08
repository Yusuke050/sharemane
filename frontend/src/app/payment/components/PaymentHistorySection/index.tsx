'use client'

import { useState } from 'react'
import { PaymentHistory } from '../../types'
import './index.css'

type Props = {
  history: PaymentHistory[]
  onDelete?: (id: number) => void
}

export function PaymentHistorySection({ history, onDelete }: Props) {
  const [showAll, setShowAll] = useState(false)
  const displayHistory = showAll ? history : history.slice(0, 3)

  return (
    <section className="payment-history-section">
      <h2 className="section-title">支払い履歴</h2>

      <div className="history-list">
        {displayHistory.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-content">
              <div className="history-main">
                <span className="history-category">{item.category}</span>
                <span className="history-amount">¥{item.amount.toLocaleString()}</span>
              </div>
              {item.description && (
                <p className="history-description">{item.description}</p>
              )}
              <div className="history-meta">
                <span className="history-user">{item.paidBy}</span>
                <div className="history-date">
                  <svg className="date-icon" viewBox="0 0 12 12" fill="none">
                    <rect x="2" y="3" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
                    <path d="M4 1v2M8 1v2M2 5h8" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
            <button 
              className="delete-button"
              onClick={() => onDelete?.(item.id)}
              aria-label="削除"
            >
              <svg className="delete-icon" viewBox="0 0 20 20" fill="none">
                <path d="M8 4h4M4 6h12M5 6l1 10h8l1-10M9 9v4M11 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {history.length > 3 && (
        <button 
          className="show-all-button"
          onClick={() => setShowAll(!showAll)}
        >
          <svg className="chevron-icon" viewBox="0 0 16 16" fill="none" style={{ transform: showAll ? 'rotate(180deg)' : 'none' }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            {showAll ? '一部を表示' : `すべて表示 (${history.length}件)`}
          </span>
        </button>
      )}
    </section>
  )
}

