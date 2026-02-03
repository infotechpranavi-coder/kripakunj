import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret'
);

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const inputEmail = email?.trim();
        const inputPassword = password?.trim();
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const adminPassword = process.env.ADMIN_PASSWORD?.trim();

        console.log("Login attempt for:", inputEmail);
        console.log("Admin email from env set:", !!adminEmail);

        if (
            inputEmail === adminEmail &&
            inputPassword === adminPassword
        ) {
            console.log("Login successful, generating token...");
            const token = await new SignJWT({ email })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(JWT_SECRET);

            const response = NextResponse.json({ success: true });

            response.cookies.set('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        }

        console.log("Login failed: Invalid credentials");
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: error.message || 'An error occurred during login' },
            { status: 500 }
        );
    }
}
