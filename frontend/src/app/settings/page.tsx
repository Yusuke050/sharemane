'use client'

import { useState } from 'react'
import { SettingsTabs, SettingsTabType } from './components/SettingsTabs'
import { MemberManagement } from './components/MemberManagement'
import { CategoryManagement } from './components/CategoryManagement'
import { RecurringPaymentManagement } from './components/RecurringPaymentManagement'
import {
  AddRecurringPaymentModal,
  RecurringPaymentFormData,
} from './components/AddRecurringPaymentModal'
import './page.css'

const DEFAULT_CATEGORIES = [
  '食費',
  '日用品',
  '交通費',
  '娯楽',
  '光熱費',
  '家賃',
  '医療',
  'その他',
  '交際費',
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabType>('members')
  const [members, setMembers] = useState<string[]>(['太郎', '花子'])
  const [categories, setCategories] =
    useState<string[]>(DEFAULT_CATEGORIES)
  const [recurringPayments, setRecurringPayments] = useState<any[]>([])
  const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false)

  const handleSaveMembers = (newMembers: string[]) => {
    setMembers(newMembers)
    // TODO: API呼び出しを実装
    console.log('メンバーを保存:', newMembers)
  }

  const handleSaveCategories = (newCategories: string[]) => {
    setCategories(newCategories)
    // TODO: API呼び出しを実装
    console.log('カテゴリを保存:', newCategories)
  }

  const handleAddRecurringPayment = () => {
    setIsRecurringModalOpen(true)
  }

  const handleSaveRecurringPayment = (data: RecurringPaymentFormData) => {
    // TODO: API呼び出しを実装
    console.log('定期支払いを保存:', data)
    // 仮の実装
    const newPayment = {
      id: Date.now(),
      ...data,
      amount: parseInt(data.amount),
    }
    setRecurringPayments([...recurringPayments, newPayment])
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

