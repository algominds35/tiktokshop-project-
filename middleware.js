import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Protect dashboard and other authenticated routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if trial expired and subscription not active
    if (token.subscriptionStatus === 'trial' && token.trialEndDate) {
      const trialEnd = new Date(token.trialEndDate)
      const now = new Date()
      
      if (now > trialEnd) {
        return NextResponse.redirect(new URL('/subscribe', request.url))
      }
    }

    // Check if subscription expired
    if (token.subscriptionStatus === 'expired') {
      return NextResponse.redirect(new URL('/subscribe', request.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/login', '/signup'],
}

