'use client'

import { Sparkles } from 'lucide-react'
import Profile from './Profile'
import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50  backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="flex items-center gap-3 px-6 justify-between py-2">
        <Link href={'/'} className="flex gap-2 items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="bg-gradient-to-r text-2xl from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            DM-Gemini
          </h1>
        </Link>

        <Profile />
      </div>
    </header>
  )
}
