'use client'

import './index.css'

type RecurringPayment = {
  id: number
  paidBy: string
  amount: number
  category: string
  frequency: 'weekly' | 'monthly'
  memo: string
}

type Props = {
  payments: RecurringPayment[]
  onAddClick: () => void
}

export function RecurringPaymentManagement({
  payments,
  onAddClick,
}: Props) {
  return (
    <div className="recurring-payment-management">
      {/* 追加ボタン */}
      <button className="add-recurring-payment-button" onClick={onAddClick}>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="add-icon"
        >
          <path
            d="M10 5V15M5 10H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="button-text">定期支払いを追加</span>
      </button>

      {/* コンテンツエリア */}
      {payments.length === 0 ? (
        <div className="empty-state-card">
          <p className="empty-state-text">定期支払いが登録されていません</p>
        </div>
      ) : (
        <div className="payments-list">
          {payments.map((payment) => (
            <div key={payment.id} className="payment-item">
              {/* TODO: 定期支払いアイテムの表示を実装 */}
              <p>{payment.paidBy} - ¥{payment.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

