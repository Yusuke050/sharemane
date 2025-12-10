'use client'

import { useState } from 'react'
import './index.css'

type Props = {
  members: string[]
  onSave?: (members: string[]) => void
}

export function MemberManagement({ members: initialMembers, onSave }: Props) {
  const [members, setMembers] = useState<string[]>(initialMembers)
  const [newMemberName, setNewMemberName] = useState('')

  const handleAddMember = () => {
    if (newMemberName.trim() && !members.includes(newMemberName.trim())) {
      setMembers([...members, newMemberName.trim()])
      setNewMemberName('')
    }
  }

  const handleDeleteMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave?.(members)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMember()
    }
  }

  return (
    <div className="member-management-card">
      {/* アイコンとタイトル */}
      <div className="member-management-header">
        <div className="member-icon-wrapper">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="member-icon"
          >
            <path
              d="M24 24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C19.5817 8 16 11.5817 16 16C16 20.4183 19.5817 24 24 24Z"
              stroke="#1d293d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 42C8 33.1634 15.1634 26 24 26C32.8366 26 40 33.1634 40 42"
              stroke="#1d293d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 20C33.6569 20 35 18.6569 35 17C35 15.3431 33.6569 14 32 14"
              stroke="#1d293d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M40 30C41.6569 30 43 31.3431 43 33C43 34.6569 41.6569 36 40 36"
              stroke="#1d293d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="member-management-title">メンバー管理</h2>
        <p className="member-management-description">
          家計簿を共有するメンバーを登録してください
        </p>
      </div>

      {/* フォーム */}
      <div className="member-management-form">
        {/* 既存メンバーリスト */}
        <div className="members-list">
          {members.map((member, index) => (
            <div key={index} className="member-item">
              <span className="member-name">{member}</span>
              <button
                className="member-delete-button"
                onClick={() => handleDeleteMember(index)}
                aria-label={`${member}を削除`}
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

        {/* メンバー追加 */}
        <div className="add-member-section">
          <label className="add-member-label">メンバー名</label>
          <div className="add-member-input-group">
            <input
              type="text"
              className="add-member-input"
              placeholder="名前を入力"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="add-member-button"
              onClick={handleAddMember}
              disabled={!newMemberName.trim()}
              aria-label="メンバーを追加"
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

        {/* 保存ボタン */}
        <button className="save-button" onClick={handleSave}>
          保存
        </button>
      </div>
    </div>
  )
}

