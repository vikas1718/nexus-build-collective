import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Trust, About, Services, WhyChooseUs, Process } from "@/components/site/sections";
import {
  Portfolio, CaseStudies, TechStack, Testimonials, FAQ,
} from "@/components/site/showcase";
import { Footer } from "@/components/site/contact";
import {
  ScrollProgress, CursorGlow, BackToTop, WhatsAppButton, Loader,
} from "@/components/site/global-ux";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Loader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <About />
        <Services />
        <WhyChooseUs />
        <Process />
        <Portfolio />
        <CaseStudies />
        <TechStack />

        <FAQ />
        
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <Toaster position="top-center" />
    </div>
  );
}

