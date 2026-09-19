import { Ticker } from "@/components/home/Ticker";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { Feedbacks } from "@/components/home/Feedbacks";
import { AboutSection } from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <>
      <Ticker />
      <Hero />
      <TrustBadges />
      <CatalogSection />
      <Feedbacks />
      <AboutSection />
    </>
  );
}
