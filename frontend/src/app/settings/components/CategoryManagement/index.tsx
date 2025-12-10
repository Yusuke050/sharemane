'use client'

import { useState } from 'react'
import './index.css'

type Props = {
  categories: string[]
  onSave?: (categories: string[]) => void
}

export function CategoryManagement({
  categories: initialCategories,
  onSave,
}: Props) {
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [newCategoryName, setNewCategoryName] = useState('')

  const handleAddCategory = () => {
    if (
      newCategoryName.trim() &&
      !categories.includes(newCategoryName.trim())
    ) {
      setCategories([...categories, newCategoryName.trim()])
      setNewCategoryName('')
    }
  }

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave?.(categories)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCategory()
    }
  }

  return (
    <div className="category-management-card">
      {/* タイトル */}
      <h2 className="category-management-title">カテゴリ管理</h2>

      {/* 新しいカテゴリ追加 */}
      <div className="new-category-section">
        <label className="new-category-label">新しいカテゴリ</label>
        <div className="new-category-input-group">
          <input
            type="text"
            className="new-category-input"
            placeholder="カテゴリ名を入力"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="new-category-button"
            onClick={handleAddCategory}
            disabled={!newCategoryName.trim()}
            aria-label="カテゴリを追加"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="add-icon"
            >
              <path
                d="M8 4V12M4 8H12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 登録済みカテゴリ */}
      <div className="registered-categories-section">
        <h3 className="registered-categories-title">登録済みカテゴリ</h3>
        <div className="categories-list">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <span className="category-name">{category}</span>
              <button
                className="category-delete-button"
                onClick={() => handleDeleteCategory(index)}
                aria-label={`${category}を削除`}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="delete-icon"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

