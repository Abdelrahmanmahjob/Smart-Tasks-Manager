import Navigation from "./ui/home/Navigation"
import HeroSection from "./ui/home/HeroSection"
import FeaturesSection from "./ui/home/FeaturesSection"
import BenefitsSection from "./ui/home/BenefitsSection"
import CTASection from "./ui/home/CTASection"
import Footer from "./ui/home/Footer"

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
