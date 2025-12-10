'use client'

import { useState } from 'react'
import './index.css'

const CATEGORIES = [
  '食費',
  '日用品',
  '交通費',
  '娯楽',
  '光熱費',
  '家賃',
  '医療',
  'その他',
  '交際費',
]

export type PaymentFormData = {
  paidBy: string
  amount: string
  category: string
  memo: string
}

export function AddPaymentModal({
  isOpen,
  onClose,
  onSubmit,
  members = ['太郎', '花子'],
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: PaymentFormData) => void
  members?: string[]
}) {
  const [formData, setFormData] = useState<PaymentFormData>({
    paidBy: members[0] || '',
    amount: '',
    category: '',
    memo: '',
  })

  if (!isOpen) return null

  const handleSubmit = () => {
    if (formData.paidBy && formData.amount && formData.category) {
      onSubmit?.(formData)
      // フォームをリセット
      setFormData({
        paidBy: members[0] || '',
        amount: '',
        category: '',
        memo: '',
      })
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">支払いを登録</h2>

        <div className="modal-body">
          {/* 支払った人 */}
          <div className="form-section">
            <label className="form-label">支払った人</label>
            <div className="button-group">
              {members.map((member) => (
                <button
                  key={member}
                  className={`member-button ${
                    formData.paidBy === member ? 'selected' : ''
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, paidBy: member }))}
                >
                  {member}
                </button>
              ))}
            </div>
          </div>

          {/* 金額 */}
          <div className="form-section">
            <label className="form-label">金額</label>
            <div className="amount-input-wrapper">
              <span className="amount-symbol">¥</span>
              <input
                type="number"
                className="amount-input"
                placeholder="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
            </div>
          </div>

          {/* カテゴリ */}
          <div className="form-section">
            <label className="form-label">カテゴリ</label>
            <div className="category-grid">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`category-button ${
                    formData.category === category ? 'selected' : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, category }))
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* メモ */}
          <div className="form-section">
            <label className="form-label">メモ（任意）</label>
            <input
              type="text"
              className="text-input"
              placeholder="例：スーパーで買い物"
              value={formData.memo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, memo: e.target.value }))
              }
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="modal-footer">
          <button className="footer-button cancel" onClick={onClose}>
            キャンセル
          </button>
          <button
            className="footer-button submit"
            onClick={handleSubmit}
            disabled={!formData.paidBy || !formData.amount || !formData.category}
          >
            登録
          </button>
        </div>
      </div>
    </div>
  )
}

