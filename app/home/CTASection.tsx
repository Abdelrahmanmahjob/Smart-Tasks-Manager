import Link from "next/link"
import Button from "../ui/Button"

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand)]/10 via-transparent to-blue-600/10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border border-[var(--color-brand-soft)]/30 bg-gradient-to-b from-[var(--color-brand-soft)]/20 to-transparent backdrop-blur">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Ready to Transform Your Productivity?
        </h2>
        <p className="text-base sm:text-lg text-fg-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Join thousands of users who are already managing their tasks smarter
          with Smart Tasks Manager.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
          <Link href="/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
            >
              Get Started Now
            </Button>
          </Link>
          <Link href="#features" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
