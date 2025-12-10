// API functions for analytics page

export type CategoryExpense = {
  category: string
  amount: number
  percentage: number
  color: string
}

export type AnalyticsSummary = {
  monthlyExpense: number
  totalExpense: number
  categoryExpenses: CategoryExpense[]
  members: string[]
}

export async function fetchAnalyticsSummary(
  target: 'all' | string = 'all'
): Promise<AnalyticsSummary> {
  const url = `/api/analytics/summary?target=${encodeURIComponent(target)}`
  const res = await fetch(url)
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error')
    throw new Error(
      `Failed to fetch analytics summary: ${res.status} ${res.statusText} - ${errorText}`
    )
  }
  return res.json()
}

