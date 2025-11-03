import { NextRequest, NextResponse } from 'next/server'
import ConnectToMongoDB from '@/lib/connectdb'
import User from '@/models/user'
import { withCors } from '@/lib/cors'

// No custom interface here; use default context
export async function GET(req: NextRequest, context: any) {
  try {
    await ConnectToMongoDB()

    // Use context.params directly
    const email = context?.params?.email
    if (!email) {
      return NextResponse.json(
        { error: 'Missing Google email' },
        { status: 400 },
      )
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const profile = {
      name: user.name,
      email: user.email,
      image: user.image,
      Googleemail: user.Googleemail,
      createdAt: user.createdAt,
    }

    return withCors({ profile, status: true })
  } catch (error: any) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 },
    )
  }
}
