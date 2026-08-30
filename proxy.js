import { NextResponse } from 'next/server';

/**
 * Proxy (Next.js 16 replacement for middleware.js)
 * Protects /admin/dashboard routes — redirects to /admin if no adminToken cookie.
 */
export function proxy(request) {
  const token = request.cookies.get('adminToken')?.value;

  if (!token) {
    const loginUrl = new URL('/admin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
