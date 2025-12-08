'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

export function MockProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass', 
        }).then(() => {
          setIsReady(true)
        })
      })
    } else {
      setIsReady(true)
    }
  }, [])

  if (!isReady) {
    return <div>モック準備中...</div>
  }

  return <>{children}</>
}