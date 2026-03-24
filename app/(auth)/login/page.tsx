"use client"

import Link from "next/link"
import Button from "../../ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card"
import { useActionState } from "react"
import { authenticate } from "@/app/lib/actions"
import { ExclamationCircleIcon } from "@heroicons/react/16/solid"

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-root px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Access your Smart Tasks dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-fg-strong"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-fg-strong"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  minLength={6}
                  autoComplete="current-password"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" size="md" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-xs text-fg-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-brand hover:underline"
              >
                Sign up
              </Link>
            </p>
            {errorMessage && (
              <div className="flex items-end space-x-1 mt-2" aria-live="polite">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
