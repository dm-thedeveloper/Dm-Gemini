import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
  'https://dm-gemini-v3.vercel.app', // your Vercel domain
  // 'http://localhost:3000', // local development
]

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') || ''
    const { text } = await req.json()

    const apiKey = process.env.GEMINI_API_KEY
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
      }),
    })

    const data = await response.json()
    // console.log('Data', data)

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI'

    const res = NextResponse.json({ reply: output })
    // ✅ Set CORS headers
    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
    }
    res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS , GET')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    return res
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 },
    )
  }
}

// ✅ Handle preflight OPTIONS request
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const res = new NextResponse(null, { status: 204 })
  if (allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin)
  }
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return res
}
