// src/components/Header/Header.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import './index.css'


const tabs: {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}[] = [
  {
    id: 'payment',
    label: '支払い',
    path: '/payment',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5C3 3.89543 3.89543 3 5 3H15C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: '分析',
    path: '/analytics',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17L7 13L10 16L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 9H17V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: '設定',
    path: '/settings',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3243 3.32427C10.1329 2.89191 9.56712 2.89191 9.37573 3.32427L8.92271 4.39565C8.84404 4.57688 8.6776 4.70517 8.48224 4.7354L7.31672 4.90688C6.85235 4.9771 6.66522 5.54509 6.99336 5.87118L7.82455 6.69684C7.96802 6.83941 8.03498 7.04165 8.00434 7.24005L7.8123 8.41632C7.73941 8.88479 8.22044 9.24144 8.64534 9.01755L9.68062 8.48592C9.86109 8.38965 10.0789 8.38965 10.2594 8.48592L11.2947 9.01755C11.7196 9.24144 12.2006 8.88479 12.1277 8.41632L11.9357 7.24005C11.905 7.04165 11.972 6.83941 12.1155 6.69684L12.9466 5.87118C13.2748 5.54509 13.0877 4.9771 12.6233 4.90688L11.4578 4.7354C11.2624 4.70517 11.096 4.57688 11.0173 4.39565L10.5643 3.32427Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="header">
      {/* タイトル部分 */}
      <div className="header-title-wrapper">
        <h1 className="header-title">共同家計簿</h1>
      </div>

      {/* タブナビゲーション */}
      <nav className="header-nav">
        <div className="header-nav-container">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path
            return (
              <Link
                key={tab.id}
                href={tab.path}
                className={`header-tab ${
                  isActive ? 'header-tab-active' : 'header-tab-inactive'
                }`}
              >
                <div className="header-tab-icon">{tab.icon}</div>
                <span className="header-tab-text">{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
