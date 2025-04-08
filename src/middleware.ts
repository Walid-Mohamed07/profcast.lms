// eslint-disable-next-line boundaries/element-types
import { authConfig } from '@/app/authconfig';
import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);
export const authMiddleware = NextAuth(authConfig).auth;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|static|.*\\..*|_next).*)'],
};
