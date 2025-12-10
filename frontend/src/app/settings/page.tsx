'use client'

import { useEffect, useState } from 'react'
import { SettingsTabs, SettingsTabType } from './components/SettingsTabs'
import { MemberManagement } from './components/MemberManagement'
import { CategoryManagement } from './components/CategoryManagement'
import { RecurringPaymentManagement } from './components/RecurringPaymentManagement'
import {
  AddRecurringPaymentModal,
  RecurringPaymentFormData,
} from './components/AddRecurringPaymentModal'
import { fetchMembers, createMember, deleteMember } from '@/lib/api/members'
import { fetchCategories, createCategory, deleteCategory } from '@/lib/api/categories'
import {
  fetchRecurringPayments,
  createRecurringPayment,
  deleteRecurringPayment,
  type RecurringPayment,
} from '@/lib/api/recurring-payments'
import './page.css'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabType>('members')
  const [members, setMembers] = useState<string[]>(['太郎', '花子'])
  const [categories, setCategories] = useState<string[]>([])
  const [recurringPayments, setRecurringPayments] = useState<
    RecurringPayment[]
  >([])
  const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false)

  // メンバー一覧を取得
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const memberList = await fetchMembers()
        setMembers(memberList.map((m) => m.name))
      } catch (error) {
        console.error('Failed to load members:', error)
      }
    }
    loadMembers()
  }, [])

  // カテゴリ一覧を取得
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await fetchCategories()
        setCategories(categoryList.map((c) => c.name))
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }
    loadCategories()
  }, [])

  // 定期支払い一覧を取得
  useEffect(() => {
    const loadRecurringPayments = async () => {
      try {
        const payments = await fetchRecurringPayments()
        setRecurringPayments(payments)
      } catch (error) {
        console.error('Failed to load recurring payments:', error)
      }
    }
    loadRecurringPayments()
  }, [])

  const handleSaveMembers = async (newMembers: string[]) => {
    try {
      // 既存のメンバーを取得
      const existingMembers = await fetchMembers()
      const existingNames = existingMembers.map((m) => m.name)

      // 追加するメンバー
      const toAdd = newMembers.filter((name) => !existingNames.includes(name))
      for (const name of toAdd) {
        await createMember(name)
      }

      // 削除するメンバー
      const toDelete = existingMembers.filter(
        (m) => !newMembers.includes(m.name)
      )
      for (const member of toDelete) {
        await deleteMember(member.id)
      }

      // 再取得
      const updatedMembers = await fetchMembers()
      setMembers(updatedMembers.map((m) => m.name))
    } catch (error) {
      console.error('Failed to save members:', error)
    }
  }

  const handleSaveCategories = async (newCategories: string[]) => {
    try {
      // 既存のカテゴリを取得
      const existingCategories = await fetchCategories()
      const existingNames = existingCategories.map((c) => c.name)

      // 追加するカテゴリ
      const toAdd = newCategories.filter((name) => !existingNames.includes(name))
      for (const name of toAdd) {
        await createCategory(name)
      }

      // 削除するカテゴリ
      const toDelete = existingCategories.filter(
        (c) => !newCategories.includes(c.name)
      )
      for (const category of toDelete) {
        await deleteCategory(category.id)
      }

      // 再取得
      const updatedCategories = await fetchCategories()
      setCategories(updatedCategories.map((c) => c.name))
    } catch (error) {
      console.error('Failed to save categories:', error)
    }
  }

  const handleAddRecurringPayment = () => {
    setIsRecurringModalOpen(true)
  }

  const handleSaveRecurringPayment = async (data: RecurringPaymentFormData) => {
    try {
      await createRecurringPayment(data)
      // 再取得
      const payments = await fetchRecurringPayments()
      setRecurringPayments(payments)
    } catch (error) {
      console.error('Failed to save recurring payment:', error)
    }
  }

  return (
    <main className="settings-page">
      <div className="settings-container">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'members' && (
          <div className="settings-content">
            <MemberManagement members={members} onSave={handleSaveMembers} />
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="settings-content">
            <CategoryManagement
              categories={categories}
              onSave={handleSaveCategories}
            />
          </div>
        )}

        {activeTab === 'recurring' && (
          <div className="settings-content">
            <RecurringPaymentManagement
              payments={recurringPayments}
              onAddClick={handleAddRecurringPayment}
              onDelete={async (id) => {
                try {
                  await deleteRecurringPayment(id)
                  const payments = await fetchRecurringPayments()
                  setRecurringPayments(payments)
                } catch (error) {
                  console.error('Failed to delete recurring payment:', error)
                }
              }}
            />
          </div>
        )}
      </div>

      <AddRecurringPaymentModal
        isOpen={isRecurringModalOpen}
        onClose={() => setIsRecurringModalOpen(false)}
        onSubmit={handleSaveRecurringPayment}
        members={members}
        categories={categories}
      />
    </main>
  )
}

