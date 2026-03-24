import { Card } from "../ui/Card"
import { FEATURES } from "./constants"

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f1725] to-bg-root">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Powerful Features
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-fg-muted max-w-2xl mx-auto px-2">
            Everything you need to manage your tasks effectively
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:border-[var(--color-brand-soft)]/50 hover:shadow-lg transition-all duration-300 p-4 sm:p-5 md:p-6"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-brand-soft)] flex items-center justify-center group-hover:bg-[var(--color-brand)] transition-colors">
                    <Icon className="w-6 h-6 text-[var(--color-brand)]" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-fg-muted text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
