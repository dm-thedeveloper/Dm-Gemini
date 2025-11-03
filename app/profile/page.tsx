'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Profile() {
  const { data: session } = useSession()

  if (!session) return <div>Not logged in</div>
  return (
    <div className="flex items-center gap-3">
      {/* <Image
        src={session.user?.image || '/profile-placeholder.jpg'}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full"
      /> */}
      <div>
        <p className="font-semibold">{session.user?.name}</p>
        <p className="text-sm text-gray-500">{session.user?.email}</p>
      </div>
    </div>
  )
}
