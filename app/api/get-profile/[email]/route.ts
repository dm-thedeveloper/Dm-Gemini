import { NextRequest, NextResponse } from 'next/server'
import ConnectToMongoDB from '@/lib/connectdb'
import User from '@/models/user' // Your user Mongoose model
import { withCors } from '@/lib/cors'

export async function GET(
  req: NextRequest,
  context: { params: { email: string } },
) {
  try {
    // Connect to MongoDB
    await ConnectToMongoDB()

    const { email } = context.params

    if (!email) {
      return NextResponse.json(
        { error: 'Missing Googleemail' },
        { status: 400 },
      )
    }

    // Find user by Googleemail
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return user profile

    const profile = {
      name: user.name,
      email: user.email,
      image: user.image,
      Googleemail: user.Googleemail,
      createdAt: user.createdAt,
    }
    return withCors({ profile, status: true })
    // return NextResponse.json(
    //   {
    //   success: true,

    // })
  } catch (error: any) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 },
    )
  }
}
