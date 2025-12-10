// API functions for members management

export type Member = {
  id: number
  name: string
}

export async function fetchMembers(): Promise<Member[]> {
  const res = await fetch('/api/members')
  if (!res.ok) {
    throw new Error('Failed to fetch members')
  }
  const data = await res.json()
  return data.members
}

export async function createMember(name: string): Promise<Member> {
  const res = await fetch('/api/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) {
    throw new Error('Failed to create member')
  }
  return res.json()
}

export async function deleteMember(id: number): Promise<void> {
  const res = await fetch(`/api/members/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Failed to delete member')
  }
}

