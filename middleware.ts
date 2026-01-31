import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret'
);

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
    const isLoginPage = req.nextUrl.pathname === '/login';

    if (isDashboardPage) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (err) {
            // Token is invalid or expired
            const response = NextResponse.redirect(new URL('/login', req.url));
            response.cookies.delete('auth_token');
            return response;
        }
    }

    if (isLoginPage && token) {
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/dashboard', req.url));
        } catch (err) {
            // Token invalid, allow access to login page
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};
