'use client'

import { useState } from 'react'
import './index.css'

const DEFAULT_CATEGORIES = [
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

export type RecurringPaymentFormData = {
  paidBy: string
  amount: string
  category: string
  frequency: 'weekly' | 'monthly'
  memo: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: RecurringPaymentFormData) => void
  members?: string[]
  categories?: string[]
}

export function AddRecurringPaymentModal({
  isOpen,
  onClose,
  onSubmit,
  members = ['太郎', '花子'],
  categories = DEFAULT_CATEGORIES,
}: Props) {
  const [formData, setFormData] = useState<RecurringPaymentFormData>({
    paidBy: members[0] || '',
    amount: '',
    category: '',
    frequency: 'monthly',
    memo: '',
  })

  if (!isOpen) return null

  const handleSubmit = () => {
    if (
      formData.paidBy &&
      formData.amount &&
      formData.category &&
      formData.frequency
    ) {
      onSubmit?.(formData)
      // フォームをリセット
      setFormData({
        paidBy: members[0] || '',
        amount: '',
        category: '',
        frequency: 'monthly',
        memo: '',
      })
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">定期支払いを登録</h2>

        <div className="modal-body">
          {/* 支払う人 */}
          <div className="form-section">
            <label className="form-label">支払う人</label>
            <div className="button-group">
              {members.map((member) => (
                <button
                  key={member}
                  className={`member-button ${
                    formData.paidBy === member ? 'selected' : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, paidBy: member }))
                  }
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
            <select
              className="category-select"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">選択してください</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* 頻度 */}
          <div className="form-section">
            <label className="form-label">頻度</label>
            <div className="button-group">
              <button
                className={`frequency-button ${
                  formData.frequency === 'weekly' ? 'selected' : ''
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, frequency: 'weekly' }))
                }
              >
                毎週
              </button>
              <button
                className={`frequency-button ${
                  formData.frequency === 'monthly' ? 'selected' : ''
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, frequency: 'monthly' }))
                }
              >
                毎月
              </button>
            </div>
          </div>

          {/* メモ */}
          <div className="form-section">
            <label className="form-label">メモ</label>
            <input
              type="text"
              className="text-input"
              placeholder="例：家賃"
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
            disabled={
              !formData.paidBy ||
              !formData.amount ||
              !formData.category ||
              !formData.frequency
            }
          >
            登録
          </button>
        </div>
      </div>
    </div>
  )
}

