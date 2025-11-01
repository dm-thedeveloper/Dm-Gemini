import ConnectToMongoDB from '@/lib/connectdb'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { withCors } from '@/lib/cors'

export async function GET(req: NextRequest, context: any) {
  try {
    await ConnectToMongoDB()
    const { id } = context.params // runtime access is fine

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid chat session ID' },
        { status: 400 },
      )
    }

    const chatSession = await ChatSession.findById(id)
    if (!chatSession) {
      return NextResponse.json(
        { error: 'Chat session not found' },
        { status: 404 },
      )
    }

    const filteredChats = chatSession.chats.map((chat: any) => ({
      id: chat._id,
      title: chat.title,
      response: chat.response,
    }))

    // return NextResponse.json({
    //   _id: chatSession._id,
    //   title: chatSession.SectionTitle,
    //   chats: filteredChats,
    //   createdAt: chatSession.createdAt,
    // })

    const responseData = {
      _id: chatSession._id,
      title: chatSession.SectionTitle,
      chats: filteredChats,
      createdAt: chatSession.createdAt,
    }
    return withCors(responseData)
  } catch (error: any) {
    console.error('Error fetching chat by ID:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
