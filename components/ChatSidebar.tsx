'use client'

import { Plus, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'

interface Chat {
  id: string
  title: string
  timestamp: string
}

interface ChatSidebarProps {
  chats: Chat[]
  activeChat: string | null
  onSelectChat: (id: string) => void
  onNewChat: () => void
}

export function ChatSidebar({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
}: ChatSidebarProps) {
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
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left p-4 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                activeChat === chat.id
                  ? 'bg-white/20 border-white/30 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-blue-300 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 truncate">{chat.title}</p>
                  <p className="text-white/50 text-sm mt-1">{chat.timestamp}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
