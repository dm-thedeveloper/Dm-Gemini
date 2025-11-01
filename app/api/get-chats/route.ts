// get All chats
import ConnectToMongoDB from '@/lib/connectdb'
import { withCors } from '@/lib/cors'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await ConnectToMongoDB()
    const chatSessions = await ChatSession.find().sort({ createdAt: -1 })
    // return NextResponse.json({ chatSessions })
    return withCors({ chatSessions })
  } catch (error: any) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
