import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/lib/auth"

const protectedRoutes = ['/account', '/account/orders', '/account/addresses', '/account/raffles', '/account/my-assessment', '/account/my-favorites', '/order/(.*)'];
const authRoutes = ['/account/login', '/account/register'];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = new URL(req.url);
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.match(new RegExp(route)));

  const isAuthenticated = !!session;

  if (isAuthRoute) {
    if(isAuthenticated) {
      return NextResponse.redirect(new URL('/account/', req.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  // Diğer tüm talepler, yönlendirme yapılmadan devam eder
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};