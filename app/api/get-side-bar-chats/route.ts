import ConnectToMongoDB from '@/lib/connectdb'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await ConnectToMongoDB()

    // Get only specific fields
    const chatSessions = await ChatSession.find()
      .select('_id createdAt SectionTitle')
      .sort({ createdAt: -1 })

    // Map SectionTitle → title
    const formattedChats = chatSessions.map((chat: any) => ({
      _id: chat._id,
      title: chat.SectionTitle, // rename here
      createdAt: chat.createdAt,
    }))

    return NextResponse.json({ chatSessions: formattedChats })
  } catch (error: any) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
