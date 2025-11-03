import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri:
            'https://dm-gemini-v3.vercel.app/api/auth/callback/google', // Must match Google console
        },
      },
    }),
  ],
  secret: process.env.NEXT_AUTHSECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_ENDPOINT}/api/create-user`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              GoogleId: account?.providerAccountId,
              name: user.name,
              email: user.email,
              image: user.image,
            }),
          },
        )

        if (!res.ok) {
          const text = await res.text()
          console.error('❌ Failed to save user to DB:', res.status, text)
        } else {
          console.log('✅ User saved successfully')
        }

        return true
      } catch (err) {
        console.error('🚨 Error in signIn callback:', err)
        return true
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
      return token
    },

    async session({ session, token }) {
      session.user = {
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string,
      }
      return session
    },
  },
}
