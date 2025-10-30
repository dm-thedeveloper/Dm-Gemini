import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
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
    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI'

    // ✅ Return as proper JSON
    return NextResponse.json({ reply: output })
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 },
    )
  }
}
