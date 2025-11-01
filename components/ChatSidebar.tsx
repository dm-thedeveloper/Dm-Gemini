'use client'

import { Plus, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useState } from 'react'
import { appEndpoint } from '@/constants'

interface Chat {
  _id: string
  title: string
  timestamp: string
}

interface ChatSidebarProps {
  // chats: Chat[]
  activeChat: string | null
  onSelectChat: (id: string) => void
  onNewChat: () => void
}

export function ChatSidebar({
  // chats,
  activeChat,
  onSelectChat,
  onNewChat,
}: ChatSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([
    // {
    //   id: '1',
    //   title: 'What is artificial intelligence?',
    //   timestamp: '2 hours ago',
    // },
    // {
    //   id: '2',
    //   title: 'Help me write a story',
    //   timestamp: 'Yesterday',
    // },
    // {
    //   id: '3',
    //   title: 'Explain quantum computing',
    //   timestamp: '3 days ago',
    // },
    // {
    //   id: '4',
    //   title: 'Creative writing tips',
    //   timestamp: '1 week ago',
    // },
  ])

  const [loading, setLoading] = useState<Boolean>(false)

  const fetchAllChats = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${appEndpoint}/api/get-side-bar-chats`, {
        method: 'GET',
      })

      const data = await response.json()

      if (data.chatSessions?.length > 0) {
        // console.log('Data', data.chatSessions)
        setChats(data.chatSessions)
        // console.log('Side Bar Data', data)
      }
    } catch (error) {
      console.log('Error on Ferch Chats', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    ;(async () => {
      await fetchAllChats()
    })()
  }, [])
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-72 backdrop-blur-xl bg-white/10 border-r border-white/20 flex flex-col">
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 pb-4">
          {loading ? (
            <>
              {Array.from({ length: 7 }).map((_, idx) => (
                <>
                  <button
                    key={idx * 1222}
                    className={`w-full cursor-not-allowed animate-pulse text-left p-4 rounded-xl backdrop-blur-md transition-all duration-300 border bg-white/5 border-white/10 `}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-blue-300 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 bg-white/10 rounded-lg h-3 w-[70%] animate-pulse truncate">
                          {' '}
                        </p>
                        <p className="text-white/50 text-sm mt-1 h-2 w-[50%] bg-white/5 animate-pulse"></p>
                      </div>
                    </div>
                  </button>
                </>
              ))}
            </>
          ) : (
            <>
              {chats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => onSelectChat(chat._id)}
                  className={`w-full text-left p-4 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                    activeChat === chat._id
                      ? 'bg-white/20 border-white/30 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-blue-300 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/90 truncate">{chat.title}</p>
                      <p className="text-white/50 text-sm mt-1">12:50 PM</p>
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  )
}
