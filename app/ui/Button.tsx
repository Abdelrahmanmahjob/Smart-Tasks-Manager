import type { ButtonHTMLAttributes, ReactNode } from "react"
import { clsx } from "clsx"

type ButtonVariant = "primary" | "secondary" | "ghost" | "link"
type ButtonSize = "sm" | "md" | "lg"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-brand)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand)] text-[var(--color-fg-strong)] hover:bg-[var(--color-brand-strong)]",
  secondary:
    "border border-border-subtle bg-transparent text-[var(--color-fg-default)] hover:bg-[var(--color-brand-soft)]/60",
  ghost:
    "text-[var(--color-fg-default)] hover:bg-[var(--color-brand-soft)]/40",
  link: "text-[var(--color-brand)] hover:underline bg-transparent px-0",
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3.5 py-2 text-sm",
  lg: "px-4 py-2.5 text-sm",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
