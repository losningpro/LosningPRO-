import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Info() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-bold text-gray-900">Information</h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Her finder du praktisk information om levering, servicebesøg, betaling og
          kontakt. Har du spørgsmål, kan du altid skrive til{" "}
          <a className="underline" href="mailto:info@losningpro.dk">
            info@losningpro.dk
          </a>{" "}
          eller ringe på{" "}
          <a className="underline" href="tel:+4552717810">
            +45 52 71 78 10
          </a>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
}
