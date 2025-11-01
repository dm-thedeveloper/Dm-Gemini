import { NextResponse } from 'next/server'

export function withCors(data: any, status: number = 200) {
  // Convert data to JSON string before passing
  const json = JSON.parse(JSON.stringify(data))

  const response = NextResponse.json(json, { status })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )

  return response
}
