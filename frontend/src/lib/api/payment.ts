// API functions for payment page

import { PaymentSummary } from '@/app/payment/types'

export async function fetchPaymentSummary(): Promise<PaymentSummary> {
  const res = await fetch('/api/payment/summary')
  if (!res.ok) {
    throw new Error('Failed to fetch payment summary')
  }
  return res.json()
}

export async function createPayment(data: {
  category: string
  amount: number
  description?: string
  paidBy: string
  date: string
}): Promise<void> {
  const res = await fetch('/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to create payment')
  }
}

export async function deletePayment(id: number): Promise<void> {
  const res = await fetch(`/api/payment/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Failed to delete payment')
  }
}

