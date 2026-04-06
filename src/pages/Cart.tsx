import React, { useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/cart.store";
import { useMarketStore } from "../lib/store";

type StoreProduct = {
  id: string;
  name: string;
  price?: number;
  price_dkk?: number;
  image?: string;
  category?: string;
};

function getProductPrice(product: StoreProduct) {
  if (typeof product.price_dkk === "number") return product.price_dkk;
  if (typeof product.price === "number") return product.price;
  return 0;
}

export default function Cart() {
  const { items, inc, dec, remove, subtotalDkk, containsService } = useCart();
  const products = useMarketStore((state) => state.products) as StoreProduct[];

  const relatedProducts = useMemo(() => {
    const ids = new Set(items.flatMap((item) => item.relatedIds ?? []));
    const explicit = products.filter((product) => ids.has(product.id));
    if (explicit.length > 0) return explicit.slice(0, 6);

    const categories = new Set(items.map((item) => item.category).filter(Boolean));
    return products
      .filter((product) => !items.some((item) => item.id === product.id))
      .filter((product) => categories.size === 0 || categories.has(product.category))
      .slice(0, 6);
  }, [items, products]);

  const moms = subtotalDkk * 0.25;
  const total = subtotalDkk + moms;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Din kurv</h1>
        <p className="mb-8 text-gray-600">
          Enkel checkout med fokus på konvertering og booking af serviceydelser.
        </p>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto mb-4 h-24 w-24 text-gray-300" />
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">Din kurv er tom</h2>
            <p className="mb-8 text-gray-600">
              Tilføj produkter eller en service for at komme i gang.
            </p>
            <Link
              to="/kob"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Gå til markedet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-lg bg-gray-100" />
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                          {item.kind === "service" ? "Service" : "Produkt"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{item.priceDkk} kr / stk.</p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border px-2 py-1">
                      <button
                        className="rounded p-1 hover:bg-gray-100"
                        onClick={() => dec(item.id)}
                        aria-label="Minus"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center">{item.quantity}</span>
                      <button
                        className="rounded p-1 hover:bg-gray-100"
                        onClick={() => inc(item.id)}
                        aria-label="Plus"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {item.priceDkk * item.quantity} kr
                      </p>
                      <button
                        className="mt-1 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                        onClick={() => remove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Fjern
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {relatedProducts.length > 0 && (
                <section className="pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Du kan også tilføje</h2>
                    <Link to="/kob" className="text-sm font-medium text-blue-700 hover:underline">
                      Se alle
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {relatedProducts.map((product) => (
                      <article key={product.id} className="rounded-2xl border border-gray-200 p-4">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="mb-3 h-36 w-full rounded-xl object-cover"
                          />
                        ) : (
                          <div className="mb-3 h-36 w-full rounded-xl bg-gray-100" />
                        )}
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="mt-2 font-semibold">{getProductPrice(product)} kr</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="h-fit rounded-2xl bg-gray-50 p-6 lg:sticky lg:top-24">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Ordreoversigt</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotalDkk.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Moms (25%)</span>
                  <span>{moms.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between border-t pt-3 text-base font-semibold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} kr</span>
                </div>
              </div>

              {containsService && (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                  <div className="mb-2 flex items-center gap-2 font-semibold">
                    <CalendarDays className="h-4 w-4" />
                    Service i kurven
                  </div>
                  Du bliver bedt om at vælge dato og tidspunkt i checkout, før betalingen
                  afsluttes.
                </div>
              )}

              <Link
                to="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Gå til checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
