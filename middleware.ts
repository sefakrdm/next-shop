export { auth as middleware } from '@/lib/auth';

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
      '/account',
      '/account/orders/',
      '/account/addresses/',
      '/account/raffles/',
      '/order\/(.*)/',
    ],
  }