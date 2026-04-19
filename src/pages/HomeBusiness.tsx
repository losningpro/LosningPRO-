import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeBusinessSection from "../components/HomeBusinessSection";

export default function HomeBusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HomeBusinessSection />
      </main>

      <Footer />
    </div>
  );
}
