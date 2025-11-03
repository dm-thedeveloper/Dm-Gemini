'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Sign out and redirect to homepage
    signOut({ callbackUrl: '/' })
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-semibold">Logging you out...</p>
    </div>
  )
}
