import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../integrations/supabase/client";

type GalleryRow = {
  id: string;
  title: string | null;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  comment: string | null;
  display_order: number | null;
  is_published: boolean | null;
};

type GalleryMeta = {
  carouselId: string;
  carouselTitle: string;
  showInGallery: boolean;
  showInProducts: boolean;
  showOnHome: boolean;
  visible: boolean;
};

type PublicGalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  secondaryImageUrl: string | null;
  order: number;
  carouselId: string;
  carouselTitle: string;
};

const DEFAULT_META: GalleryMeta = {
  carouselId: "generelt",
  carouselTitle: "Galleri",
  showInGallery: true,
  showInProducts: false,
  showOnHome: false,
  visible: true,
};

function parseMeta(raw: string | null): GalleryMeta {
  if (!raw) return DEFAULT_META;

  try {
    const parsed = JSON.parse(raw) as Partial<GalleryMeta>;
    return {
      carouselId: parsed.carouselId?.trim() || DEFAULT_META.carouselId,
      carouselTitle: parsed.carouselTitle?.trim() || DEFAULT_META.carouselTitle,
      showInGallery: parsed.showInGallery ?? DEFAULT_META.showInGallery,
      showInProducts: parsed.showInProducts ?? DEFAULT_META.showInProducts,
      showOnHome: parsed.showOnHome ?? DEFAULT_META.showOnHome,
      visible: parsed.visible ?? DEFAULT_META.visible,
    };
  } catch {
    return DEFAULT_META;
  }
}

function normalizePublicPath(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
      aria-label={direction === "left" ? "Scroll venstre" : "Scroll højre"}
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}

function CarouselSection({
  title,
  items,
}: {
  title: string;
  items: PublicGalleryItem[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollByAmount(direction: "left" | "right") {
    const node = scrollerRef.current;
    if (!node) return;

    const amount = Math.max(node.clientWidth * 0.85, 320);
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="mb-14 last:mb-0">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Udvalgte billeder og projekter i denne kategori.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ArrowButton direction="left" onClick={() => scrollByAmount("left")} />
          <ArrowButton direction="right" onClick={() => scrollByAmount("right")} />
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="min-w-[300px] max-w-[300px] flex-none snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:min-w-[360px] md:max-w-[360px]"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Intet billede
                </div>
              )}
            </div>

            {item.secondaryImageUrl ? (
              <div className="border-t border-slate-200 bg-slate-50">
                <img
                  src={item.secondaryImageUrl}
                  alt={`${item.title} ekstra`}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}

            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 md:hidden">
        <ArrowButton direction="left" onClick={() => scrollByAmount("left")} />
        <ArrowButton direction="right" onClick={() => scrollByAmount("right")} />
      </div>
    </section>
  );
}

export default function ArbejdsgalleriPage() {
  const [items, setItems] = useState<PublicGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("galleri")
          .select(
            "id, title, description, before_image_url, after_image_url, comment, display_order, is_published"
          )
          .eq("is_published", true)
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;

        const mapped = (data ?? [])
          .map((row) => {
            const item = row as GalleryRow;
            const meta = parseMeta(item.comment);

            if (!meta.visible || !meta.showInGallery) return null;

            return {
              id: item.id,
              title: item.title?.trim() || "Projekt",
              description: item.description?.trim() || "",
              imageUrl: normalizePublicPath(item.before_image_url),
              secondaryImageUrl: normalizePublicPath(item.after_image_url),
              order: Number(item.display_order) || 0,
              carouselId: meta.carouselId,
              carouselTitle: meta.carouselTitle || "Galleri",
            } satisfies PublicGalleryItem;
          })
          .filter(Boolean) as PublicGalleryItem[];

        if (alive) setItems(mapped);
      } catch (err) {
        if (alive) {
          setError(
            err instanceof Error
              ? err.message
              : "Kunne ikke hente arbejdsgalleri."
          );
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

  const carousels = useMemo(() => {
    const groups = new Map<
      string,
      { title: string; items: PublicGalleryItem[] }
    >();

    items.forEach((item) => {
      const existing = groups.get(item.carouselId);

      if (existing) {
        existing.items.push(item);
        return;
      }

      groups.set(item.carouselId, {
        title: item.carouselTitle,
        items: [item],
      });
    });

    return Array.from(groups.values()).map((group) => ({
      ...group,
      items: [...group.items].sort((a, b) => a.order - b.order),
    }));
  }, [items]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-[#26439a] py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Arbejdsgalleri
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
              Se tematiske carouseller med udvalgte projekter og tidligere opgaver.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

            {!loading && !error && carousels.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
                Der er endnu ingen synlige carouseller i arbejdsgalleriet.
              </div>
            ) : null}

            {!loading && !error
              ? carousels.map((carousel) => (
                  <CarouselSection
                    key={carousel.title}
                    title={carousel.title}
                    items={carousel.items}
                  />
                ))
              : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
