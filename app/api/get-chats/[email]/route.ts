import ConnectToMongoDB from '@/lib/connectdb'
import { withCors } from '@/lib/cors'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  context: any, // ✅ bypass TypeScript false-positive
) {
  try {
    await ConnectToMongoDB()

    const { email } = context.params
    console.log('Email', email)

    const chatSessions = await ChatSession.find({ userEmail: email }).sort({
      createdAt: -1,
    })

    return withCors({ chatSessions })
  } catch (error: any) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
