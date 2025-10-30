import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('URL:', req.url)

  return NextResponse.json({ message: 'Hello, World! from DM-Gemini App' })
}
