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
import { register } from "@/app/lib/actions"
import { useActionState } from "react"

export default function RegisterPage() {
  const initialState = { message: "", errors: {} }
  const [state, formAction, isPending] = useActionState(register, initialState)
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-root px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>
              Start organizing your tasks and projects.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-fg-strong"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="Ahmed Hassan"
                />
                {state?.errors?.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {state.errors.name.join(", ")}
                  </p>
                )}
              </div>

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
                />
                {state?.errors?.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {state.errors.email[0]}
                  </p>
                )}
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
                  autoComplete="new-password"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="••••••••"
                />
                {state?.errors?.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {state.errors.password.join(", ")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-fg-strong"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="••••••••"
                />
                {state?.errors?.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {state.errors.confirmPassword[0]}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center gap-2 space-y-2">
                <Button type="submit" size="md">
                  {isPending ? "Creating..." : "Create Account"}
                </Button>
                <p className="text-xs text-fg-muted">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-brand hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
              {state?.message && (
                <p
                  className={`text-sm mt-2 ${
                    state?.errors ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {state.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
