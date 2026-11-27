import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = await verifyToken(request.cookies.get("mySession")?.value);

  if (!session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("suite", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && session.role !== "admin") {
    return NextResponse.redirect(new URL("/livres", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/livres/:path*", "/favoris/:path*", "/admin/:path*"],
};
