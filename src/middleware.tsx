import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";



type Role = keyof typeof roleBasedRoutes;

const AuthRoutes = ["/login",];
const roleBasedRoutes = {
  user: [/^\/seller-management/],
  admin: [/^\/admin-management/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/seller-management", "/seller-management/:page*", "/admin-management", "/admin-management/:page*", "/login"],
};
