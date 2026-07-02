import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/navbar";
import { Contact, Footer } from "@/components/site/contact";
import {
  ScrollProgress, CursorGlow, BackToTop, WhatsAppButton,
} from "@/components/site/global-ux";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nebula Studio" },
      {
        name: "description",
        content:
          "Get in touch with Nebula Studio. Tell us about your project and we'll get back within 24 hours.",
      },
      { property: "og:title", content: "Contact — Nebula Studio" },
      {
        property: "og:description",
        content: "Tell us about your project and we'll get back within 24 hours.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="pt-28">
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <Toaster position="top-center" />
    </div>
  );
}
