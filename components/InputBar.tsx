'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { appEndpoint } from '@/constants'
import { title } from 'process'

interface InputBarProps {
  onSendMessage: any
  disabled?: boolean
  setChatLoading: any
  sectionId: string | null
  setSectionId: any
}

export function InputBar({
  onSendMessage,
  disabled,
  setChatLoading,
  sectionId,
  setSectionId,
}: InputBarProps) {
  const [message, setMessage] = useState('')
  const InputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    if (!message.trim()) {
      e.preventDefault()
      // alert("Message can't be empty")
      InputRef.current?.focus()
      return
    }
    e.preventDefault()

    try {
      setChatLoading(true)

      // Add user message (no response yet)
      const tempId = `${Date.now()}`
      onSendMessage({
        id: tempId,
        title: message,
        responses: null,
      })

      // API call
      const response = await fetch(`${appEndpoint}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      })

      const data = await response.json()

      // Update message with AI response
      onSendMessage({
        id: tempId,
        title: message,
        responses: data.reply,
      })

      if (data) {
        setChatLoading(false)
        setMessage('') // clear input

        if (!sectionId) {
          // Create a New Section
          const saveChatResponse = await fetch(
            `${appEndpoint}/api/save-chats`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: message,
                response: data.reply,
                sectionId: null,
                SectionTitle: ` Chat Title ${message}`,
              }),
            },
          )
          const saveChatData = await saveChatResponse.json()
          const newSectionId = saveChatData.sectionId
          setSectionId(newSectionId)
          sessionStorage.setItem('sectionId', newSectionId)
          console.log('Created new section chat', saveChatData.sectionId)
        } else {
          // Update Existing Section or Push just Chat Messages
          const saveChatResponse = await fetch(
            `${appEndpoint}/api/save-chats`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: message,
                response: data.reply,
                sectionId: sectionId,
              }),
            },
          )
          const saveChatData = await saveChatResponse.json()
          console.log('Updated existing section chat', saveChatData.sectionId)
        }
      }
    } catch (error) {
      console.error('Error fetching AI response:', error)
    } finally {
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="  z-20 bottom-0 left-0 right-0 p-6 backdrop-blur-xl  bg-white/5 border-t border-white/20">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden">
            <Textarea
              ref={InputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message DM-Gemini..."
              disabled={disabled}
              className="min-h-[60px] max-h-[200px]  bg-transparent border-0 text-white placeholder:text-white/40 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  title=""
                  type="submit"
                  // disabled={!message.trim() || disabled}
                  className="h-[60px] px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {message.trim() ? 'Submit Message' : 'Please Enter Prompt'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  )
}
