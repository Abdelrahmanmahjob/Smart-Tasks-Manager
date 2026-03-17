import Link from "next/link"
import Button from "../../(ui)/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../(ui)/Card"

export default function RegisterPage() {
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
            <form className="space-y-4">
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
                  autoComplete="name"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="Ahmed Hassan"
                />
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
                  autoComplete="email"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="you@example.com"
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
                  autoComplete="new-password"
                  className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-fg-default shadow-sm outline-none ring-0 placeholder:text-fg-muted focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="••••••••"
                />
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button type="submit" size="md">
              Sign up
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
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
