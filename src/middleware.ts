
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname;
 console.log(request.nextUrl);
 const public_path  = path === '/login' || path === '/signup';
 const token = request.cookies.get('token')?.value || '';

  if(token && public_path)
  {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
 if(!public_path && !token)
 {
  return NextResponse.redirect(new URL('/login', request.nextUrl))
 }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
  ]
}