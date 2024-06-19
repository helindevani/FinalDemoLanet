import { JwtPayload, decode } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface AuthorizedUsers {
  [route: string]: string[];
}

const protectedRoutes = [
  "/admin",
  "/staff",
  "/customer",
];

const authorizedUsers: AuthorizedUsers = {
  "/admin": ["Admin"],
  "/staff": ["Staff"],
  "/customer": ["User"],
};

export default function middleware(req: NextRequest) {
  const cookies = req.cookies.get("token");
  const token = cookies?.value;

  if (token) {
    try {
      const decodedToken = decode(token) as JwtPayload;
      let roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      
      if (typeof roles === 'object') {
        roles = roles[0];
      } 

      const isLoggedIn = token != null;

      if (!isLoggedIn) {
        const loginUrl = new URL("/auth/login", req.nextUrl.origin);
        return NextResponse.redirect(loginUrl.toString());
      }

      const requestedRoute = req.nextUrl.pathname;

      if (
        protectedRoutes.some(route => requestedRoute.startsWith(route))
      ) {
        const matchedRoute = protectedRoutes.find(route => requestedRoute.startsWith(route));
        
        if (matchedRoute && authorizedUsers[matchedRoute].includes(roles)) {
          return NextResponse.next();
        } else {
          const notAuthorizedUrl = new URL("/", req.nextUrl.origin);
          return NextResponse.redirect(notAuthorizedUrl.toString());
        }
      }

      if (requestedRoute === "/auth/login" && isLoggedIn) {
        const redirectUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(redirectUrl.toString());
      }

    } catch (error) {
      console.error("Error decoding token:", error);
      const loginUrl = new URL("/auth/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl.toString());
    }
  } else if (
    protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))
  ) {
    const loginUrl = new URL("/auth/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  return NextResponse.next();
}
