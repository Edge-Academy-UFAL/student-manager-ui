import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { getUsername } from './lib/utils'
export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    if (
      token &&
      token.dtype === 'Student' &&
      !req.nextUrl.pathname.startsWith(
        '/alunos/' + getUsername(token.email!) + '/',
      )
    ) {
      return NextResponse.redirect(
        new URL('/alunos/' + getUsername(token.email!) + '/dados', req.url),
      )
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (
          !token &&
          !req.nextUrl.pathname.startsWith('/login') &&
          !req.nextUrl.pathname.startsWith('/register')
        ) {
          return false
        }

        return true
      },
    },
  },
)
