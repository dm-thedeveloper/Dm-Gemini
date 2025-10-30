'use client'
import { useState, useEffect } from 'react'

import { Header } from '../components/Header'
import { ChatSidebar } from '../components/ChatSidebar'
import { ChatArea } from '../components/ChatArea'
import { InputBar } from '../components/InputBar'

interface Message {
  id: string
  // role: 'user' | 'assistant'
  response: string
  title: string
}

interface Chat {
  id: string
  title: string
  timestamp: string
}
interface CurrentChat {
  id: string
  title: string
  responses: string
  timestamp?: string
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'What is artificial intelligence?',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      title: 'Help me write a story',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      title: 'Explain quantum computing',
      timestamp: '3 days ago',
    },
    {
      id: '4',
      title: 'Creative writing tips',
      timestamp: '1 week ago',
    },
  ])

  const [activeChat, setActiveChat] = useState<string | null>(null)
  // const [messages, setMessages] = useState<Message[]>([])
  const [messages, setMessages] = useState<Message[]>(() => {
    // ✅ Load from sessionStorage (on first render)
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('dm_gemini_messages')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [chatLoading, setChatLoading] = useState(false)

  const handleNewChat = () => {
    setActiveChat(null)
    setMessages([])
  }

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId)
    // Load mock messages for the selected chat

    setMessages([])
  }

  const handleSendMessage = (object: CurrentChat) => {
    setMessages((prev) => {
      const existingIndex = prev.findIndex((msg) => msg.id === object.id)

      let updatedMessages
      if (existingIndex >= 0) {
        // Update existing message with AI response
        updatedMessages = [...prev]
        updatedMessages[existingIndex] = {
          ...updatedMessages[existingIndex],
          response: object.responses,
        }
      } else {
        // Add new user message
        updatedMessages = [
          ...prev,
          {
            id: object.id,
            title: object.title,
            response: object.responses,
          },
        ]
      }

      // ✅ Save updated messages immediately to sessionStorage
      sessionStorage.setItem(
        'dm_gemini_messages',
        JSON.stringify(updatedMessages),
      )

      return updatedMessages
    })
  }

  useEffect(() => {
    // ✅ Save to sessionStorage whenever messages change
    sessionStorage.setItem('dm_gemini_messages', JSON.stringify(messages))
  }, [messages])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 overflow-hidden">
      {/* Animated glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Main layout */}
      <Header />
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      <main className="fixed top-16 left-72  right-0 bottom-0 flex flex-col">
        <ChatArea messages={messages} loading={chatLoading} />
        <InputBar
          onSendMessage={handleSendMessage}
          setChatLoading={setChatLoading}
        />
      </main>
    </div>
  )
}
