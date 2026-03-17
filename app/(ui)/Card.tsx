import type { HTMLAttributes, ReactNode } from "react"
import { clsx } from "clsx"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-border-subtle bg-bg-surface/90 shadow-(--shadow-soft) backdrop-blur-sm",
        "transition-colors",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 border-b border-border-subtle px-6 py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...rest }: CardProps) {
  return (
    <h2
      className={clsx(
        "text-base font-semibold tracking-tight text-fg-strong",
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  )
}

export function CardDescription({ className, children, ...rest }: CardProps) {
  return (
    <p className={clsx("text-sm text-fg-muted", className)} {...rest}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx("px-6 py-4 text-sm text-fg-default", className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-2 border-t border-border-subtle px-6 py-3",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
