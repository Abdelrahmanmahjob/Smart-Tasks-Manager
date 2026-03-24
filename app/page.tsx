import Navigation from "./home/Navigation"
import HeroSection from "./home/HeroSection"
import FeaturesSection from "./home/FeaturesSection"
import BenefitsSection from "./home/BenefitsSection"
import CTASection from "./home/CTASection"
import Footer from "./home/Footer"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </>
  )
}
