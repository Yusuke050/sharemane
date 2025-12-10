// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

// モックデータストア（簡易的な実装）
// eslint-disable-next-line prefer-const
let mockPayments: Array<{
  id: number
  category: string
  amount: number
  description: string
  paidBy: string
  date: string
}> = [
  {
    id: 1,
    category: '交際費',
    amount: 500,
    description: '500',
    paidBy: '太郎',
    date: '12/1',
  },
  {
    id: 2,
    category: '家賃',
    amount: 3,
    description: '',
    paidBy: '太郎',
    date: '12/1',
  },
  {
    id: 3,
    category: '家賃',
    amount: 100000,
    description: '',
    paidBy: '太郎',
    date: '12/1',
  },
  {
    id: 4,
    category: '食費',
    amount: 5000,
    description: 'スーパーで買い物',
    paidBy: '太郎',
    date: '12/2',
  },
  {
    id: 5,
    category: '光熱費',
    amount: 15000,
    description: '電気代',
    paidBy: '花子',
    date: '12/3',
  },
  {
    id: 6,
    category: '通信費',
    amount: 8500,
    description: '携帯料金',
    paidBy: '太郎',
    date: '12/5',
  },
]

// eslint-disable-next-line prefer-const
let mockMembers: Array<{ id: number; name: string }> = [
  { id: 1, name: '太郎' },
  { id: 2, name: '花子' },
]

// eslint-disable-next-line prefer-const
let mockCategories: Array<{ id: number; name: string }> = [
  { id: 1, name: '食費' },
  { id: 2, name: '日用品' },
  { id: 3, name: '交通費' },
  { id: 4, name: '娯楽' },
  { id: 5, name: '光熱費' },
  { id: 6, name: '家賃' },
  { id: 7, name: '医療' },
  { id: 8, name: 'その他' },
  { id: 9, name: '交際費' },
]

// eslint-disable-next-line prefer-const
let mockRecurringPayments: Array<{
  id: number
  paidBy: string
  amount: number
  category: string
  frequency: 'weekly' | 'monthly'
  memo: string
}> = []

// 日付をMM/DD形式に変換
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${month}/${day}`
}

// 支払いサマリーを計算
function calculatePaymentSummary() {
  const members = mockMembers.map((m) => ({
    userId: m.id,
    userName: m.name,
    totalPaid: mockPayments
      .filter((p) => p.paidBy === m.name)
      .reduce((sum, p) => sum + p.amount, 0),
    balance: 0,
  }))

  const totalExpense = mockPayments.reduce((sum, p) => sum + p.amount, 0)
  const perPerson = Math.floor(totalExpense / members.length)

  members.forEach((member) => {
    member.balance = member.totalPaid - perPerson
  })

  return {
    members,
    totalExpense,
    perPerson,
    history: mockPayments,
  }
}

export const handlers = [
  // GET /api/events/1/summary のモック（既存）
  http.get('/api/events/:eventId/summary', ({ params }) => {
    const { eventId } = params
    return HttpResponse.json({
      event_id: Number(eventId),
      members: [
        { user_id: 1, user_name: 'yusuke', paid: 9000, should_pay: 3000, balance: 6000 },
        { user_id: 2, user_name: 'alice', paid: 0, should_pay: 3000, balance: -3000 },
        { user_id: 3, user_name: 'bob', paid: 0, should_pay: 3000, balance: -3000 },
      ],
      settlements: [
        { from: 2, to: 1, amount: 3000 },
        { from: 3, to: 1, amount: 3000 },
      ],
    })
  }),

  // ========== 支払い関連 ==========

  // GET /api/payment/summary
  http.get('/api/payment/summary', () => {
    return HttpResponse.json(calculatePaymentSummary())
  }),

  // POST /api/payment
  http.post('/api/payment', async ({ request }) => {
    const body = (await request.json()) as {
      category: string
      amount: number
      description?: string
      paidBy: string
      date: string
    }
    const newPayment = {
      id: Math.max(...mockPayments.map((p) => p.id), 0) + 1,
      category: body.category,
      amount: body.amount,
      description: body.description || '',
      paidBy: body.paidBy,
      date: formatDate(body.date),
    }
    mockPayments.push(newPayment)
    return HttpResponse.json(newPayment, { status: 201 })
  }),

  // DELETE /api/payment/:id
  http.delete('/api/payment/:id', ({ params }) => {
    const id = Number(params.id)
    const index = mockPayments.findIndex((p) => p.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Not found', message: `Payment with id ${id} not found` },
        { status: 404 }
      )
    }
    mockPayments.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // ========== メンバー関連 ==========

  // GET /api/members
  http.get('/api/members', () => {
    return HttpResponse.json({ members: mockMembers })
  }),

  // POST /api/members
  http.post('/api/members', async ({ request }) => {
    const body = (await request.json()) as { name: string }
    if (!body.name || body.name.trim() === '') {
      return HttpResponse.json(
        { error: 'Validation error', message: 'name: メンバー名は必須です' },
        { status: 400 }
      )
    }
    const newMember = {
      id: Math.max(...mockMembers.map((m) => m.id), 0) + 1,
      name: body.name.trim(),
    }
    mockMembers.push(newMember)
    return HttpResponse.json(newMember, { status: 201 })
  }),

  // DELETE /api/members/:id
  http.delete('/api/members/:id', ({ params }) => {
    const id = Number(params.id)
    const index = mockMembers.findIndex((m) => m.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Not found', message: `Member with id ${id} not found` },
        { status: 404 }
      )
    }
    mockMembers.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // ========== カテゴリ関連 ==========

  // GET /api/categories
  http.get('/api/categories', () => {
    return HttpResponse.json({ categories: mockCategories })
  }),

  // POST /api/categories
  http.post('/api/categories', async ({ request }) => {
    const body = (await request.json()) as { name: string }
    if (!body.name || body.name.trim() === '') {
      return HttpResponse.json(
        { error: 'Validation error', message: 'name: カテゴリ名は必須です' },
        { status: 400 }
      )
    }
    const newCategory = {
      id: Math.max(...mockCategories.map((c) => c.id), 0) + 1,
      name: body.name.trim(),
    }
    mockCategories.push(newCategory)
    return HttpResponse.json(newCategory, { status: 201 })
  }),

  // DELETE /api/categories/:id
  http.delete('/api/categories/:id', ({ params }) => {
    const id = Number(params.id)
    const index = mockCategories.findIndex((c) => c.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Not found', message: `Category with id ${id} not found` },
        { status: 404 }
      )
    }
    mockCategories.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // ========== 定期支払い関連 ==========

  // GET /api/recurring-payments
  http.get('/api/recurring-payments', () => {
    return HttpResponse.json({ recurringPayments: mockRecurringPayments })
  }),

  // POST /api/recurring-payments
  http.post('/api/recurring-payments', async ({ request }) => {
    const body = (await request.json()) as {
      paidBy: string
      amount: number
      category: string
      frequency: 'weekly' | 'monthly'
      memo?: string
    }
    if (!body.paidBy || !body.amount || !body.category || !body.frequency) {
      return HttpResponse.json(
        { error: 'Validation error', message: '必須フィールドが不足しています' },
        { status: 400 }
      )
    }
    const newRecurringPayment = {
      id: Math.max(...mockRecurringPayments.map((p) => p.id), 0) + 1,
      paidBy: body.paidBy,
      amount: body.amount,
      category: body.category,
      frequency: body.frequency,
      memo: body.memo || '',
    }
    mockRecurringPayments.push(newRecurringPayment)
    return HttpResponse.json(newRecurringPayment, { status: 201 })
  }),

  // DELETE /api/recurring-payments/:id
  http.delete('/api/recurring-payments/:id', ({ params }) => {
    const id = Number(params.id)
    const index = mockRecurringPayments.findIndex((p) => p.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Not found', message: `Recurring payment with id ${id} not found` },
        { status: 404 }
      )
    }
    mockRecurringPayments.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // ========== 分析関連 ==========

  // GET /api/analytics/summary
  http.get('/api/analytics/summary', ({ request }) => {
    try {
      const url = new URL(request.url)
      const target = url.searchParams.get('target') || 'all'

      // 対象に応じてフィルタリング
      let filteredPayments = mockPayments
      if (target !== 'all') {
        filteredPayments = mockPayments.filter((p) => p.paidBy === target)
      }

      // 合計支出を計算
      const totalExpense = filteredPayments.reduce((sum, p) => sum + p.amount, 0)
      const monthlyExpense = totalExpense // 今月の支出として同じ値を使用（簡易実装）

      // カテゴリ別に集計
      const categoryMap = new Map<string, number>()
      filteredPayments.forEach((p) => {
        const current = categoryMap.get(p.category) || 0
        categoryMap.set(p.category, current + p.amount)
      })

      // カテゴリ別支出データを準備
      const colors = ['#475569', '#8b5cf6', '#94a3b8', '#64748b', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899']
      const categoryExpenses = Array.from(categoryMap.entries())
        .map(([category, amount], index) => ({
          category,
          amount,
          percentage: totalExpense > 0 ? Math.round((amount / totalExpense) * 1000) / 10 : 0,
          color: colors[index % colors.length],
        }))
        .sort((a, b) => b.amount - a.amount)

      return HttpResponse.json({
        monthlyExpense,
        totalExpense,
        categoryExpenses,
        members: mockMembers.map((m) => m.name),
      })
    } catch (error) {
      console.error('Error in analytics handler:', error)
      return HttpResponse.json(
        { error: 'Internal server error', message: String(error) },
        { status: 500 }
      )
    }
  }),
]
