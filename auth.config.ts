import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnLoginPage = nextUrl.pathname === "/login"
      const isOnRegisterPage = nextUrl.pathname === "/register"

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // سيقوم تلقائياً بالتحويل لـ /login
      }

      // إذا كان مسجل ويحاول دخول Login أو Register، حوله للداشبورد
      if (isLoggedIn && (isOnLoginPage || isOnRegisterPage)) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
