'use client'

import './index.css'

export type SettingsTabType = 'members' | 'categories' | 'recurring'



export function SettingsTabs({ activeTab, onTabChange }: {
    activeTab: SettingsTabType
    onTabChange: (tab: SettingsTabType) => void
  }) {
  const tabs: {
    id: SettingsTabType
    label: string
    icon: React.ReactNode
  }[] = [
    {
      id: 'members',
      label: 'メンバー',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.33334 17.5C3.33334 15.0147 6.3181 13 10 13C13.6819 13 16.6667 15.0147 16.6667 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 7.5C15.8284 7.5 16.5 6.82843 16.5 6C16.5 5.17157 15.8284 4.5 15 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6667 12.5C17.4951 12.5 18.1667 13.1716 18.1667 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'categories',
      label: 'カテゴリ',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9 11C9 12.1046 9.89543 13 11 13H15C16.1046 13 17 12.1046 17 11V7C17 5.89543 16.1046 5 15 5H11C9.89543 5 9 5.89543 9 7V11Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V17C11 18.1046 10.1046 19 9 19H5C3.89543 19 3 18.1046 3 17V15Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      id: 'recurring',
      label: '定期支払い',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 3V10L14 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M16 4L18 2M2 2L4 4M18 18L16 16M4 16L2 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="settings-tabs">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            className={`settings-tab ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <div className="settings-tab-icon">{tab.icon}</div>
            <span className="settings-tab-text">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

