// API functions for recurring payments management

export type RecurringPayment = {
  id: number
  paidBy: string
  amount: number
  category: string
  frequency: 'weekly' | 'monthly'
  memo: string
}

export async function fetchRecurringPayments(): Promise<RecurringPayment[]> {
  const res = await fetch('/api/recurring-payments')
  if (!res.ok) {
    throw new Error('Failed to fetch recurring payments')
  }
  const data = await res.json()
  return data.recurringPayments
}

export async function createRecurringPayment(data: {
  paidBy: string
  amount: string
  category: string
  frequency: 'weekly' | 'monthly'
  memo: string
}): Promise<RecurringPayment> {
  const res = await fetch('/api/recurring-payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      amount: parseInt(data.amount),
    }),
  })
  if (!res.ok) {
    throw new Error('Failed to create recurring payment')
  }
  return res.json()
}

export async function deleteRecurringPayment(id: number): Promise<void> {
  const res = await fetch(`/api/recurring-payments/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Failed to delete recurring payment')
  }
}

