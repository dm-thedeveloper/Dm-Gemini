'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from './Loading'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 🚫 Redirect to login if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // 🕐 Loading state
  if (status === 'loading') {
    return <Loading />
  }

  // ✅ Show protected content if session exists
  if (status === 'authenticated') {
    return <>{children}</>
  }

  // 🚫 Return null while redirecting
  return null
}
