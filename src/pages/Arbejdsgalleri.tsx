import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPublishedGalleryItems, GalleryItem } from "../services/gallery.service";

export default function ArbejdsgalleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        const data = await getPublishedGalleryItems();
        if (alive) setItems(data);
      } catch (err) {
        if (alive) {
          setError(err instanceof Error ? err.message : "Kunne ikke hente arbejdsgalleri.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    void load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-[#26439a] py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Arbejdsgalleri
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
              Se eksempler på tidligere opgaver og resultater.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
                Henter galleri...
              </div>
            ) : null}

            {error ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-sm text-red-700 shadow-sm">
                {error}
              </div>
            ) : null}

            {!loading && !error && items.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
                Der er endnu ingen publicerede billeder i arbejdsgalleriet.
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                    <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
                      {item.before_image_url ? (
                        <img
                          src={item.before_image_url}
                          alt={item.title ? `${item.title} før` : "Før billede"}
                          className="h-72 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-72 items-center justify-center bg-slate-100 text-sm text-slate-400">
                          Intet før-billede
                        </div>
                      )}
                    </div>

                    <div>
                      {item.after_image_url ? (
                        <img
                          src={item.after_image_url}
                          alt={item.title ? `${item.title} efter` : "Efter billede"}
                          className="h-72 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-72 items-center justify-center bg-slate-100 text-sm text-slate-400">
                          Intet efter-billede
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {item.title || "Projekt"}
                    </h2>

                    {item.description ? (
                      <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                    ) : null}

                    {item.comment ? (
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                        {item.comment}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
