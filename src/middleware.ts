import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { AUTH } from '~/constants'

interface JwtPayload {
  exp: number
  iat?: number
  [key: string]: unknown
}

interface User {
  role?: string
  [key: string]: unknown
}

// Public paths that do not require authentication
// const PUBLIC_PATHS = ... (Removed)

// Public paths that should be restricted if the user is already logged in
// const AUTH_ONLY_PUBLIC_PATHS = ... (Removed)

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const token = request.cookies.get(AUTH.token)?.value
  const userRaw = request.cookies.get(AUTH.userInfo)?.value

  let user: User | undefined = undefined

  try {
    user = userRaw ? JSON.parse(userRaw) : undefined
  } catch (err) {
    console.warn('❌ Failed to parse userInfo:', err)
  }

  const isApi = pathname.startsWith('/api')
  const isStaticFile =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/static')

  // Allow all API routes and static files
  if (isApi || isStaticFile) return NextResponse.next()

  // 🛡️ Logic cho trang /admin
  if (pathname.startsWith('/admin')) {
    // 🔐 Chuyển hướng về login nếu không có token
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // ⏰ Kiểm tra token hết hạn
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      const now = Math.floor(Date.now() / 1000)
      if (decoded.exp <= now) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (err) {
      console.warn('❌ Token decode failed:', err)
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 🚫 Chặn user không phải ADMIN
    if (user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // ✅ Cho phép ADMIN
    return NextResponse.next()
  }

  // 🆓 Các trang còn lại là public (bao gồm /, /menu, /cart, ...)
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.*\\.).*)'], // Match all routes except static files
}
