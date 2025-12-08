'use client'

import { useEffect, useState } from 'react'
import { PaymentSummary } from './types'
import { fetchPaymentSummary, deletePayment } from '@/lib/api/payment'
import { PaymentStatusSection } from './components/PaymentStatusSection'
import { AddPaymentButton } from './components/AddPaymentButton'
import { PaymentHistorySection } from './components/PaymentHistorySection'
import './page.css'

export default function PaymentPage() {
  const [data, setData] = useState<PaymentSummary | null>(null)

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
    console.log('支払いを追加')
    // TODO: 支払い追加モーダルを開く
  }

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
    </main>
  )
}

