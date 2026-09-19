"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CatalogSection from "@/components/CatalogSection";
import Feedbacks from "@/components/Feedbacks";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <CatalogSection />
        <Feedbacks />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
