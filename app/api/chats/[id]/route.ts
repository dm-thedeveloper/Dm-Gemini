// Get chat by ID
import ConnectToMongoDB from '@/lib/connectdb'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await ConnectToMongoDB()
    const { id } = params

    console.log('Params', id)

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
    return NextResponse.json({
      //   chatSession: chatSession.chats.length,
      chatSession,
    })
  } catch (error: any) {
    console.error('Error fetching chat by ID:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
