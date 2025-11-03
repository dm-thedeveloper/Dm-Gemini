import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  context: { params: { token: string } },
) {
  const { token } = context.params // runtime access is fine

  console.log('ID', token)

  return new Response(`${token}`)
}
