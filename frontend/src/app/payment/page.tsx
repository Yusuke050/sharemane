'use client'

import { useEffect, useState } from 'react'
import { PaymentSummary } from './types'
import { fetchPaymentSummary, deletePayment, createPayment } from '@/lib/api/payment'
import { PaymentStatusSection } from './components/PaymentStatusSection'
import { AddPaymentButton } from './components/AddPaymentButton'
import { PaymentHistorySection } from './components/PaymentHistorySection'
import { AddPaymentModal, PaymentFormData } from './components/AddPaymentModal'
import './page.css'

export default function PaymentPage() {
  const [data, setData] = useState<PaymentSummary | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const summary = await fetchPaymentSummary()
        setData(summary)
      } catch (error) {
        console.error('Failed to load payment data:', error)
      }
    }
    loadData()
  }, [])

  const handleAddPayment = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handlePaymentSubmit = async (formData: PaymentFormData) => {
    try {
      await createPayment({
        paidBy: formData.paidBy,
        amount: formData.amount,
        category: formData.category,
        description: formData.memo,
        date: formData.date,
      })
      // 追加成功後、データを再取得
      const summary = await fetchPaymentSummary()
      setData(summary)
    } catch (error) {
      console.error('Failed to add payment:', error)
    }
  }

  // メンバーリストを取得（dataから取得、またはデフォルト値）
  const members = data?.members.map((m) => m.userName) || ['太郎', '花子']

  const handleDeletePayment = async (id: number) => {
    try {
      await deletePayment(id)
      // 削除成功後、データを再取得
      const summary = await fetchPaymentSummary()
      setData(summary)
    } catch (error) {
      console.error('Failed to delete payment:', error)
    }
  }

  if (!data) {
    return (
      <main className="payment-page">
        <div className="loading">読み込み中...</div>
      </main>
    )
  }

  return (
    <main className="payment-page">
      <div className="payment-container">
        <PaymentStatusSection
          members={data.members}
          totalExpense={data.totalExpense}
          perPerson={data.perPerson}
        />

        <AddPaymentButton onClick={handleAddPayment} />

        <PaymentHistorySection
          history={data.history}
          onDelete={handleDeletePayment}
        />
      </div>

      <AddPaymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handlePaymentSubmit}
        members={members}
      />
    </main>
  )
}

