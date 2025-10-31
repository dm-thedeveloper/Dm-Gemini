import { NextResponse } from 'next/server'

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

export function withCors(response: NextResponse) {
  Object.entries(corsHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}
