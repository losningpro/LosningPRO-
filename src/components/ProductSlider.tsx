import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug?: string;
  href?: string;
};

export default function ProductSlider({
  title,
  products,
  viewAllLink,
}: {
  title: string;
  products: Product[];
  viewAllLink: string;
}) {
  const normalizedTitle = title.trim().toLowerCase();

  const bannerConfig = useMemo(() => {
    if (normalizedTitle === "populære materialer") {
      return {
        message:
          "⚠️ Leveringstiderne kan variere afhængigt af leverandørerne.",
        position: "top" as const,
        storageKey: "warning_seen_populaere_materialer",
      };
    }

    if (normalizedTitle === "populære tjenester") {
      return {
        message:
          "⚠️ Der er et opstartsgebyr på 399 kr. knyttet til tjenesterne, som betales én gang pr. besøg.",
        position: "bottom" as const,
        storageKey: "warning_seen_populaere_tjenester",
      };
    }

    return null;
  }, [normalizedTitle]);

  const [bannerVisible, setBannerVisible] = useState(false);
  const [warningAcknowledged, setWarningAcknowledged] = useState(false);

  useEffect(() => {
    if (!bannerConfig) {
      setBannerVisible(false);
      setWarningAcknowledged(true);
      return;
    }

    const alreadySeen =
      typeof window !== "undefined" &&
      sessionStorage.getItem(bannerConfig.storageKey) === "true";

    setWarningAcknowledged(alreadySeen);
    setBannerVisible(false);
  }, [bannerConfig]);

  const handleFirstProtectedClick = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    if (!bannerConfig) return;

    if (!warningAcknowledged) {
      e.preventDefault();
      e.stopPropagation();
      setBannerVisible(true);
      setWarningAcknowledged(true);

      if (typeof window !== "undefined") {
        sessionStorage.setItem(bannerConfig.storageKey, "true");
      }
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {bannerConfig?.position === "top" && bannerVisible && (
          <div className="mb-4 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
            {bannerConfig.message}
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            {title}
          </h3>

          <Link
            to={viewAllLink}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Se alle
          </Link>
        </div>

        {bannerConfig?.position === "bottom" && bannerVisible && (
          <div className="mb-4 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
            {bannerConfig.message}
          </div>
        )}

        <div
          className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {products.map((p) => {
            const target =
              p.href ??
              (normalizedTitle === "populære tjenester"
                ? `/tjenester/${p.slug ?? p.id}`
                : `/kob/${p.slug ?? p.id}`);

            return (
              <div
                key={p.id}
                className="min-w-[240px] max-w-[240px] rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition bg-white"
              >
                <Link
                  to={target}
                  onClick={handleFirstProtectedClick}
                  onTouchStart={handleFirstProtectedClick}
                  className="block"
                >
                  <div className="h-40 bg-gray-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <div className="text-xs text-gray-500">{p.category}</div>

                    <div className="font-semibold text-gray-900 mt-1">
                      {p.name}
                    </div>

                    <div className="text-gray-700 mt-2">{p.price} kr</div>

                    <span className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 text-white py-2 font-semibold hover:bg-blue-700 transition">
                      Se detaljer
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
