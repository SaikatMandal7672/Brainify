import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeaturesSection"

export default function Landingpage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </main>
  )
}
