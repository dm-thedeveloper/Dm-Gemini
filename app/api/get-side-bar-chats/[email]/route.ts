import ConnectToMongoDB from '@/lib/connectdb'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'

export async function GET(req: NextRequest, context: any) {
  try {
    await ConnectToMongoDB()

    const email = context?.params?.email
    console.log('Email', email)

    // Get only specific fields
    const chatSessions = await ChatSession.find({ userEmail: email })
      .select('_id createdAt SectionTitle')
      .sort({ createdAt: -1 })

    // Map SectionTitle → title
    const formattedChats = chatSessions.map((chat: any) => ({
      _id: chat._id,
      title: chat.SectionTitle, // rename here
      createdAt: chat.createdAt,
    }))

    // const response = NextResponse.json({ chatSessions: formattedChats })

    // return NextResponse.json({ chatSessions: formattedChats })
    return withCors({ chatSessions: formattedChats })

    // return withCors(response)
  } catch (error: any) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
