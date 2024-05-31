import { NextResponse, NextRequest } from 'next/server'
import { getDataFromCookie } from './helpers/getDataFromCookie'

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const tokenId = await getDataFromCookie(request)
    console.log("token", tokenId)
    
    const isPublicPath = path === "/login" || path === "/signup";
    const adminPath = path.startsWith("/admin");
    
    if (isPublicPath && tokenId) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    
    if (!isPublicPath && !tokenId) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    
    if (adminPath && (!tokenId || !tokenId.isAdmin)) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    
    return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout",
    "/ordercomplete",
    "/login",
    "/signup",
    "/admin/:path*",
  ],
}
