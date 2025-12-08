// 支払いページの型定義

export type PaymentStatus = {
  userId: number
  userName: string
  totalPaid: number
  balance: number
}

export type PaymentHistory = {
  id: number
  category: string
  amount: number
  description: string
  paidBy: string
  date: string
}

export type PaymentSummary = {
  members: PaymentStatus[]
  totalExpense: number
  perPerson: number
  history: PaymentHistory[]
}

