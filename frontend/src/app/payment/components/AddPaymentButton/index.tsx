'use client'

import './index.css'


export function AddPaymentButton({ onClick }: {
  onClick?: () => void
}) {
  return (
    <button className="add-payment-button" onClick={onClick}>
      <svg className="button-icon" viewBox="0 0 20 20" fill="none">
        <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="button-text">支払いを追加</span>
    </button>
  )
}

