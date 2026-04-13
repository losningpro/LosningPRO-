import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import BlueFeatureBar from "../components/BlueFeatureBar";
import ProductSlider from "../components/ProductSlider";
import HowItWorks from "../components/HowItWorks";
import HomeBusinessSection from "../components/HomeBusinessSection";
import { useMarketStore } from "../lib/store";

function SeoSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LøsningPRO",
    url: "https://www.losningpro.dk",
    telephone: "+45 52 71 78 10",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Baneleddet 39",
      postalCode: "2600",
      addressLocality: "Glostrup",
      addressCountry: "DK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  const products = useMarketStore((state) => state.products);

  const popularMaterials = products.filter(
    (p) => p.category === "Material" && p.popular,
  );

  const popularServices = products.filter(
    (p) =>
      (p.category === "El-Service" ||
        p.category === "VVS-Service" ||
        p.category === "Tømrer") &&
      p.popular,
  );

  return (
    <div className="min-h-screen bg-white">
      <SeoSchema />
      <Header />

      <main>
        <HeroSection />
        <BlueFeatureBar />
        <HomeBusinessSection compact />

        <ProductSlider
          title="Populære Materialer"
          products={popularMaterials}
          viewAllLink="/kob"
        />

        <ProductSlider
          title="Populære Tjenester"
          products={popularServices}
          viewAllLink="/tjenester"
        />

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
