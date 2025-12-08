// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // GET /api/events/1/summary のモック
  http.get('/api/events/:eventId/summary', ({ params }) => {
    const { eventId } = params

    // とりあえず eventId は無視して固定レスポンスでOK
    return HttpResponse.json({
      event_id: Number(eventId),
      members: [
        { user_id: 1, user_name: 'yusuke', paid: 9000, should_pay: 3000, balance: 6000 },
        { user_id: 2, user_name: 'alice',  paid: 0,    should_pay: 3000, balance: -3000 },
        { user_id: 3, user_name: 'bob',    paid: 0,    should_pay: 3000, balance: -3000 },
      ],
      settlements: [
        { from: 2, to: 1, amount: 3000 },
        { from: 3, to: 1, amount: 3000 },
      ],
    })
  }),

  // 支払いページ用API
  http.get('/api/payment/summary', () => {
    return HttpResponse.json({
      members: [
        {
          userId: 1,
          userName: '太郎',
          totalPaid: 251003,
          balance: 124752,
        },
        {
          userId: 2,
          userName: '花子',
          totalPaid: 1500,
          balance: -124751,
        },
      ],
      totalExpense: 252503,
      perPerson: 126252,
      history: [
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
      ],
    })
  }),
]