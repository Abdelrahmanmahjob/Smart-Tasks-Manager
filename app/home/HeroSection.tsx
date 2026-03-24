import Link from "next/link"
import Button from "../ui/Button"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-20 md:pb-0 relative overflow-hidden bg-gradient-to-b from-bg-root via-bg-root to-[#0f1725]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-96 sm:h-96 bg-gradient-to-br from-[var(--color-brand)]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full">
        <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-2 rounded-full border border-border-subtle bg-[var(--color-brand-soft)] backdrop-blur">
          <p className="text-xs sm:text-sm text-[var(--color-brand)] font-medium">
            ✨ The Future of Task Management
          </p>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
          Manage Your Tasks
          <span className="bg-gradient-to-r from-[var(--color-brand)] via-blue-400 to-blue-600 bg-clip-text text-transparent block mt-2 sm:mt-3 md:mt-4">
            Smarter, Faster, Better
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-fg-muted mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
          Transform the way you work. Smart Tasks Manager combines powerful
          features with an intuitive interface to help you achieve more in less
          time.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2">
          <Link href="/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
            >
              Start Free Trial
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-fg-muted px-2">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
