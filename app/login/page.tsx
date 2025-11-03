'use client'

import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/') // redirect after login
  }, [session])

  return (
    <div className="fixed inset-0 bg-gradient-to-br  from-blue-900 via-purple-900 to-cyan-900 overflow-hidden flex justify-center flex-col space-y-4 items-center ">
      <h1 className="text-4xl font-bold text-white ">
        Login to{' '}
        <span className="bg-gradient-to-r  from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {' '}
          DM-Gemini
        </span>{' '}
      </h1>
      <button
        className="px-6 items-center hover:scale-110 active:scale-90 flex gap-3 py-3 bg-white text-blue-900 text-2xl  rounded-lg hover:bg-white/70 transition"
        onClick={() => signIn('google')}
      >
        <Image
          src="/Google.png"
          className="h-[50px] w-[50px] rounded-full"
          height={50} // match your tailwind size or actual image size
          width={50} // match your tailwind size or actual image size
          alt="Logo"
        />
        Sign in with Google
      </button>
    </div>
  )
}
