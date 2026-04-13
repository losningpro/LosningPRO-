import React, { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductLike = {
  id?: string | number | null;
  slug?: string | null;
  name?: string | null;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  subcategory?: string | null;
  price_dkk?: number | string | null;
  price?: number | string | null;
  image?: string | null;
  image_url_text?: string | null;
  image_url?: string | null;
  popular?: boolean | null;
  active?: boolean | null;
  is_active?: boolean | null;
};

type ProductSliderProps = {
  title: string;
  products: ProductLike[];
  viewAllLink?: string;
};

function getProductName(product: ProductLike): string {
  return String(product.name ?? product.title ?? "Produkt");
}

function getProductSlug(product: ProductLike): string | null {
  const raw = String(product.slug ?? "").trim();
  return raw.length > 0 ? raw : null;
}

function getProductHref(product: ProductLike): string {
  const slug = getProductSlug(product);
  if (slug) return `/produkt/${encodeURIComponent(slug)}`;
  return "/kob";
}

function getProductImage(product: ProductLike): string {
  const candidate = String(
    product.image_url_text ??
      product.image_url ??
      product.image ??
      "",
  ).trim();

  if (candidate) return candidate;

  return "/placeholder-product.jpg";
}

function getProductPrice(product: ProductLike): string {
  const value = product.price_dkk ?? product.price;
  if (value === null || value === undefined || value === "") {
    return "Kontakt for pris";
  }

  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return `${numeric.toLocaleString("da-DK")} kr.`;
  }

  return `${value} kr.`;
}

function getProductSubtitle(product: ProductLike): string {
  return String(product.subcategory ?? product.category ?? "Ydelse");
}

export default function ProductSlider({
  title,
  products,
  viewAllLink = "/kob",
}: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      if (typeof product.is_active === "boolean") return product.is_active;
      if (typeof product.active === "boolean") return product.active;
      return true;
    });
  }, [products]);

  function handleScrollBy(direction: -1 | 1) {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * Math.min(420, container.clientWidth * 0.9),
      behavior: "smooth",
    });
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = container.scrollLeft;
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;

    const delta = event.clientX - startXRef.current;
    if (Math.abs(delta) > 4) {
      dragMovedRef.current = true;
    }

    container.scrollLeft = startScrollLeftRef.current - delta;
  }

  function handleMouseUp() {
    window.setTimeout(() => {
      isDraggingRef.current = false;
    }, 0);
  }

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Udvalgte produkter og ydelser, som kan åbnes direkte eller ses samlet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScrollBy(-1)}
              className="rounded-xl border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => handleScrollBy(1)}
              className="rounded-xl border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <Link
              to={viewAllLink}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
            >
              Se alle
            </Link>
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-600">
            Ingen produkter at vise endnu.
          </div>
        ) : (
          <div className="relative">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ cursor: isDraggingRef.current ? "grabbing" : "grab" }}
            >
              {visibleProducts.map((product, index) => {
                const href = getProductHref(product);
                const name = getProductName(product);
                const subtitle = getProductSubtitle(product);
                const image = getProductImage(product);
                const price = getProductPrice(product);

                return (
                  <Link
                    key={String(product.id ?? product.slug ?? `${title}-${index}`)}
                    to={href}
                    onClickCapture={(event) => {
                      if (dragMovedRef.current) {
                        event.preventDefault();
                        event.stopPropagation();
                        dragMovedRef.current = false;
                      }
                    }}
                    className="group min-w-[280px] max-w-[280px] flex-shrink-0 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md md:min-w-[320px] md:max-w-[320px]"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = "/placeholder-product.jpg";
                        }}
                      />
                    </div>

                    <div className="p-5">
                      <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                        {subtitle}
                      </div>

                      <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-slate-900">
                        {name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {String(
                          product.description ??
                            "Åbn produktet for at se flere detaljer og fortsætte til booking eller køb.",
                        )}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className="text-lg font-bold text-slate-900">{price}</div>
                        <span className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition group-hover:bg-black">
                          Åbn
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
