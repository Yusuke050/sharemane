import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { MockProvider } from './MockProvider'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Warikan App',
  description: '割り勘アプリ',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <MockProvider>
          <Header />
          {children}
        </MockProvider>
      </body>
    </html>
  )
}