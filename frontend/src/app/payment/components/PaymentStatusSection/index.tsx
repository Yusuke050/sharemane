'use client'

import { PaymentStatus } from '../../types'
import './index.css'

type Props = {
  members: PaymentStatus[]
  totalExpense: number
  perPerson: number
}

export function PaymentStatusSection({ members, totalExpense, perPerson }: Props) {
  return (
    <section className="payment-status-section">
      <h2 className="section-title">支払い状況</h2>

      <div className="members-list">
        {members.map((member) => (
          <div key={member.userId} className="member-card">
            <div className="member-header">
              <span className="member-name">{member.userName}</span>
              <span className="member-total">¥{member.totalPaid.toLocaleString()}</span>
            </div>
            <div className="member-balance">
              {member.balance >= 0 ? (
                <>
                  <svg className="balance-icon positive" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="balance-amount positive">
                    +¥{member.balance.toLocaleString()}
                  </span>
                </>
              ) : (
                <>
                  <svg className="balance-icon negative" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="balance-amount negative">
                    ¥{member.balance.toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="summary-section">
        <div className="summary-row">
          <span className="summary-label">合計支出</span>
          <span className="summary-value">¥{totalExpense.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">一人あたり</span>
          <span className="summary-value">¥{perPerson.toLocaleString()}</span>
        </div>
      </div>
    </section>
  )
}

