import { NextResponse } from "next/server";

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};


export function proxy() {
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    return NextResponse.next();
}