import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/user'
import ConnectToMongoDB from '@/lib/connectdb'
import jwt from 'jsonwebtoken'
import { withCors } from '@/lib/cors'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export async function POST(req: NextRequest) {
  try {
    await ConnectToMongoDB()

    const { GoogleId, name, email, image } = await req.json()

    if (!GoogleId || !email) {
      return NextResponse.json(
        { error: 'GoogleId & Email are required' },
        { status: 400 },
      )
    }

    // Check if user already exists
    let user = await User.findOne({ email })

    // Generate JWT token

    const token = jwt.sign({ id: user?._id, email, name }, JWT_SECRET, {
      expiresIn: '7d',
    })

    if (!user) {
      // Create new user
      user = await User.create({
        GoogleId,
        name,
        email,
        image,
        JWT: token,
      })
    } else {
      // Update existing user with new JWT
      user.JWT = token
      await user.save()
    }

    // Return response with HttpOnly cookie
    const response = NextResponse.json({
      message: 'User logged in successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: token,
      },
    })

    return withCors(response)
  } catch (error: any) {
    console.error('Login API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
