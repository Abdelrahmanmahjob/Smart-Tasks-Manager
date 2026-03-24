import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { Card } from "../ui/Card"
import { BENEFITS, PERKS } from "./constants"

export default function BenefitsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Why Choose
              <span className="text-[var(--color-brand)] block mt-2 sm:mt-3">
                Smart Tasks Manager?
              </span>
            </h2>
            <p className="text-base sm:text-lg text-fg-muted mb-6 sm:mb-8">
              Our platform is designed with productivity in mind. Every feature
              is crafted to help you focus on what matters most.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {BENEFITS.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 sm:p-4 rounded-lg hover:bg-[var(--color-brand-soft)]/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[var(--color-brand)] flex-shrink-0 mt-1" />
                    <span className="font-medium text-fg-default text-sm sm:text-base">
                      {benefit.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Perks Card */}
          <div className="relative">
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-[var(--color-brand-soft)] to-bg-surface border-[var(--color-brand)]/20">
              <div className="space-y-4 sm:space-y-6">
                {PERKS.map((perk, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 p-4 rounded-lg bg-bg-root/50 border border-border-subtle"
                  >
                    <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-success)] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">
                        {perk.title}
                      </p>
                      <p className="text-xs sm:text-sm text-fg-muted">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
