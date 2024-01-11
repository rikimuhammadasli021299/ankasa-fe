import { NextResponse, NextRequest } from 'next/server';

export function middleware(request) {
  let isLogin = request.cookies.has('access_token');
  if (isLogin) {
    if (
      request.nextUrl.pathname.startsWith('/auth/register') ||
      request.nextUrl.pathname.startsWith('/auth/login') ||
      request.nextUrl.pathname.startsWith('/auth/forgot-password') ||
      request.nextUrl.pathname.startsWith('/auth/verification-otp')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (request.nextUrl.pathname.startsWith('/find-ticket') || request.nextUrl.pathname.startsWith('/my-booking') || request.nextUrl.pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/auth/register', request.url));
    }
  }
}
