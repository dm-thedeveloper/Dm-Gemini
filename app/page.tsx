'use client'
import { useState, useEffect } from 'react'

import { Header } from '../components/Header'
import { ChatSidebar } from '../components/ChatSidebar'
import { ChatArea } from '../components/ChatArea'
import { InputBar } from '../components/InputBar'
import { Message } from '@/types'
import { appEndpoint } from '@/constants'

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
  const [activeChat, setActiveChat] = useState<string | null>(null)
  // const [messages, setMessages] = useState<Message[]>([])
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('dm_gemini_messages')
      if (saved && saved !== 'undefined') {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to parse sessionStorage messages:', e)
          return []
        }
      }
    }
    return []
  })

  const [chatLoading, setChatLoading] = useState(false)
  const [sectionId, setSectionId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const storedSectionId = sessionStorage.getItem('sectionId')
      return storedSectionId ? storedSectionId : null
    }
    return null
  })

  useEffect(() => {
    const storedSectionId = sessionStorage.getItem('sectionId')
    if (storedSectionId) {
      setSectionId(storedSectionId)
    }
  }, [sectionId, messages])

  // console.log('sectionId', sectionId)

  const handleNewChat = () => {
    setActiveChat(null)
    setMessages([])
    // update to null SessionId from Session Storage
    // sessionStorage.removeItem('sectionId')
    sessionStorage.removeItem('sectionId') // ✅ proper way
    setSectionId(null) // ✅ reset in state also
  }

  const handleSelectChat = async (chatId: string) => {
    setActiveChat(chatId)
    // alert(chatId)
    // Load mock messages for the selected chat

    try {
      const response = await fetch(`${appEndpoint}/api/chats/${chatId}`, {
        method: 'GET',
      })

      const data = await response.json()
      if (data) {
        const filteredChats = data.chatSession.chats?.map((chat: any) => ({
          id: chat._id,
          title: chat.title,
          response: chat.response || '', // first message response
        }))

        sessionStorage.setItem(
          'dm_gemini_messages',
          JSON.stringify(filteredChats),
        )
        sessionStorage.setItem('sectionId', chatId)
        setMessages(filteredChats)
        // console.log('filtered', filteredChats)
      }
      // console.log('A Section Data', data.chatSession.chats)
      // const chatsSectionsObjects = data.chatSession.chats
    } catch (error) {
      console.log('A Section  Fetched Failed', error)
    }
    // setMessages([])
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
        // chats={chats}

        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      <main className="fixed top-16 left-72  right-0 bottom-0 flex flex-col">
        <ChatArea messages={messages} loading={chatLoading} />
        <InputBar
          onSendMessage={handleSendMessage}
          setChatLoading={setChatLoading}
          sectionId={sectionId}
          setSectionId={setSectionId}
        />
      </main>
    </div>
  )
}
