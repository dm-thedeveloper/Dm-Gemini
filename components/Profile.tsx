'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import TooltipComp from './TooltipComponent'
import { User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSession, signOut } from 'next-auth/react'
import { appEndpoint } from '@/constants'

interface UserProfile {
  name: string
  email: string
  image: string
  GoogleId?: string
}

const Profile = () => {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Fetch profile from API
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${appEndpoint}/api/get-profile/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setProfile(data.profile))
        .catch((err) => console.error('Profile fetch error:', err))
    }
  }, [session])

  // console.log('Profile', profile)

  if (!session) return <div className="text-white">Loading...</div>

  return (
    <DropdownMenu>
      <TooltipComp text={profile?.name ? profile.name : 'Your Profile'}>
        <DropdownMenuTrigger>
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-400 ring-offset-2 hover:scale-105 transition-transform cursor-pointer">
            <Image
              src={`${profile?.image ? profile?.image : '/public/logo.png'}`}
              alt="Profile"
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
        </DropdownMenuTrigger>
      </TooltipComp>

      <DropdownMenuContent className="w-48 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-md p-2">
        <div className="px-3 py-2 border-b border-white/20">
          <p className="font-semibold text-lg">{profile?.name}</p>
          {/* <p className="text-sm text-white/70">{profile?.email}</p> */}
        </div>

        <DropdownMenuItem className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 mt-2">
          <User className="w-5 h-5" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-3 cursor-pointer hover:bg-red-500 mt-1"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
