import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en-US", "ka"];

function getLocale(request) {
  const requestHeaders = new Headers(request.headers);
  const accepted = requestHeaders.get("accept-language");

  let headers = { "accept-language": `${accepted};q=0.5` };
  let languages = new Negotiator({ headers }).languages();
  // console.log(languages, "languages");
  let locales = ["en-US", "ka"];
  let defaultLocale = "ka";
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;
  if (
    pathname.startsWith(
      "/api/auth/[auth0]" || pathname.startsWith("api/auth/logout")
    )
  ) {
    return NextResponse.next();
  }
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/404",
    "/posts",
    "/posts/:id*",
    "/products",
    "/products/:id*",
    "/profile",
    "/product-list",
    "/sign-in",
    "/sign-up",
    "/cart",
  ],
};
