// API functions for categories management

export type Category = {
  id: number
  name: string
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories')
  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  const data = await res.json()
  return data.categories
}

export async function createCategory(name: string): Promise<Category> {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) {
    throw new Error('Failed to create category')
  }
  return res.json()
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Failed to delete category')
  }
}

