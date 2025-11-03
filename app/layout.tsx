import type { Metadata } from 'next'
import './globals.css'
// import { SessionProvider } from 'next-auth/react'
import Providers from './NextAuthProviders'

export const metadata: Metadata = {
  title: 'DM-Gemini - AI Assistant',
  description:
    'Your intelligent AI assistant powered by advanced language models',
  keywords: ['AI', 'chat', 'assistant', 'Gemini', 'artificial intelligence'],
  icons: {
    icon: '/public/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
