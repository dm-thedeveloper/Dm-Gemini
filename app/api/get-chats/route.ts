// get All chats
import ConnectToMongoDB from '@/lib/connectdb'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await ConnectToMongoDB()
    const chatSessions = await ChatSession.find().sort({ createdAt: -1 })
    return NextResponse.json({ chatSessions })
  } catch (error: any) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
