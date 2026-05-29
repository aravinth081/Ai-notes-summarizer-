import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingCards } from "@/components/landing/pricing-cards";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta";

/**
 * Landing Page — The main entry point for the SaaS platform
 * Showcases all features, pricing, testimonials, and CTA
 */
export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <PricingCards />
      <FAQ />
      <CTASection />
    </main>
  );
}
