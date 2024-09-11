import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Yetkilendirme işlemi
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

const protectedRoutes = [
  "/account/orders",
  "/account/addresses",
  "/account/raffles",
  "/account/my-assessment",
  "/account/my-favorites",
  "/order/(.*)",
];

const authRoutes = ["/account/login", "/account/register"];

const intlMiddleware = createMiddleware(routing);

const defaultLocale = 'tr';

export default async function middleware(req: NextRequest) {
  const session = await auth();

  const { pathname } = req.nextUrl;

  const isAuthenticated = !!session;

  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value || defaultLocale;

  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(`${localePrefix}${route}`)
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.match(new RegExp(`${localePrefix}${route}`))
  );

  // console.log('====================================');
  // console.log('isAuthenticated: ', isAuthenticated);
  // console.log('isAuthRoute: ', isAuthRoute);
  // console.log('isProtectedRoute: ', isProtectedRoute);
  // console.log('====================================');

  if (isAuthRoute) {
    if (isAuthenticated) {
      const redirectUrl = locale === defaultLocale ? '/account/' : `/${locale}/account/`;
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    return intlMiddleware(req);
  }

  if (!isAuthenticated && isProtectedRoute) {
    const redirectUrl = locale === defaultLocale ? '/account/login' : `/${locale}/account/login`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Eğer yönlendirme işlemi yapılmadıysa, i18n middleware'i uygulayalım
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads).*)'],
};