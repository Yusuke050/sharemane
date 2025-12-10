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
  onDelete?: (id: number) => void
}

export function RecurringPaymentManagement({
  payments,
  onAddClick,
  onDelete,
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
              <div className="payment-info">
                <span className="payment-paid-by">{payment.paidBy}</span>
                <span className="payment-amount">¥{payment.amount.toLocaleString()}</span>
                <span className="payment-category">{payment.category}</span>
                <span className="payment-frequency">
                  {payment.frequency === 'weekly' ? '毎週' : '毎月'}
                </span>
                {payment.memo && <span className="payment-memo">{payment.memo}</span>}
              </div>
              {onDelete && (
                <button
                  className="payment-delete-button"
                  onClick={() => onDelete(payment.id)}
                  aria-label={`定期支払いを削除`}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="delete-icon"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

