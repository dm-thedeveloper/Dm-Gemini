'use client'

import { ScrollArea } from './ui/scroll-area'
import { User, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Message } from '@/types'

interface ChatAreaProps {
  messages: Message[]
  loading?: boolean
}

export function ChatArea({ messages, loading }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])
  return (
    <ScrollArea className="flex-1 h-full  px-6 pt-8 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col  items-center justify-center h-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white/90 mb-2">Welcome to DM-Gemini</h2>
          <p className="text-white/60 max-w-md">
            Your intelligent AI assistant. Start a conversation by typing a
            message below.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => {
            const isLast = index === messages.length - 1 // ✅ last message check

            return (
              <div key={message.id} ref={isLast ? scrollRef : null}>
                {/* Show title/response if available */}
                {message.title && (
                  <div className="w-full flex justify-end">
                    <div className="flex items-start gap-4">
                      <p className="text-white/90 whitespace-pre-wrap bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 max-w-2xl px-6 py-4 rounded-2xl backdrop-blur-md shadow-lg">
                        {message.title}
                      </p>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-5 h-5 text-white/80" />
                      </div>
                    </div>
                  </div>
                )}

                {message.response && (
                  <div className="flex items-start gap-4 mt-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-white mb-1 bg-white/10 border border-white/20 max-w-2xl px-6 py-4 rounded-2xl backdrop-blur-md shadow-lg prose prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.response}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* ✅ Show loader only for the last message */}
                {loading && isLast && (
                  <div className="flex items-start gap-4 mt-4 animate-pulse">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-white/70 bg-white/10 border border-white/20 max-w-2xl px-6 py-4 rounded-2xl backdrop-blur-md shadow-lg flex items-center space-x-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      <span className="ml-2 text-white/60">
                        Gemini is typing...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </ScrollArea>
  )
}
