import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import axios from 'axios' // for internal API call

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    // ⬇️ When user signs in with Google
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
          return true // ✅ allow sign in anyway (optional)
        }

        console.log('✅ User saved successfully')
        return true
      } catch (err) {
        console.error('🚨 Error in signIn callback:', err)
        return true // ✅ allow login even if DB call failed
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

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
