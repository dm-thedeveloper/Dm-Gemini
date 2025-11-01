import ConnectToMongoDB from '@/lib/connectdb'
import { withCors } from '@/lib/cors'
import ChatSession from '@/models/chat'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    await ConnectToMongoDB()

    const { title, response, sectionId, SectionTitle } = await req.json()
    console.log(SectionTitle)

    if (sectionId) {
      // Update existing chat session
      const findChatSection = await ChatSession.findById(sectionId)

      if (!findChatSection) {
        return NextResponse.json(
          { error: 'Chat section not found' },
          { status: 404 },
        )
      }

      findChatSection.chats.push({ title, response })
      await findChatSection.save()

      return NextResponse.json({
        message: 'Updated existing chat session',
        sectionId: findChatSection._id.toString(),
      })
    } else {
      // Create new chat session
      const createChat = await ChatSession.create({
        SectionTitle,
        chats: [{ title, response }],
      })
      console.log(createChat)

      // return NextResponse.json({
      //   message: 'Created new chat session',
      //   sectionId: createChat._id.toString(),
      // })

      return withCors({
        message: 'Created new chat session',
        sectionId: createChat._id.toString(),
      })
    }
  } catch (error: any) {
    console.error('Error saving chat:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
