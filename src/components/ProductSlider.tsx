import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price?: number;
  image?: string;
  category?: string;
};

type ProductSliderProps = {
  title: string;
  products: Product[];
  viewAllLink?: string;
};

function InfoBanner({
  content,
  position,
}: {
  content: React.ReactNode;
  position: "top" | "bottom";
}) {
  const wrapperClass = position === "top" ? "mb-4" : "mt-4";

  return (
    <div className={wrapperClass}>
      <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
        {content}
      </div>
    </div>
  );
}

export default function ProductSlider({
  title,
  products,
  viewAllLink,
}: ProductSliderProps) {
  const [showInfo, setShowInfo] = useState(false);

  const bannerConfig = useMemo(() => {
    const normalizedTitle = title.trim().toLowerCase();

    if (normalizedTitle === "populære materialer") {
      return {
        enabled: true,
        position: "top" as const,
        content:
          "Transporttid kan variere fra produkt til produkt. Kontakt os gerne før bestilling, hvis du ønsker en mere præcis leveringstid.",
      };
    }

    if (normalizedTitle === "populære tjenester") {
      return {
        enabled: true,
        position: "bottom" as const,
        content:
          "Der tillægges 399 kr. i transportomkostninger på servicebesøg. Beløbet vises som information og kan variere ved særlige opgaver.",
      };
    }

    return {
      enabled: false,
      position: "top" as const,
      content: null,
    };
  }, [title]);

  function handleTitleClick() {
    if (!bannerConfig.enabled) return;
    setShowInfo((prev) => !prev);
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showInfo && bannerConfig.enabled && bannerConfig.position === "top" ? (
          <InfoBanner content={bannerConfig.content} position="top" />
        ) : null}

        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={handleTitleClick}
            className="text-left"
            aria-expanded={showInfo}
            aria-label={`Vis information for ${title}`}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
              {title}
            </h3>
          </button>

          {viewAllLink ? (
            <Link
              to={viewAllLink}
              className="text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Se alle
            </Link>
          ) : null}
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {products.map((product) => (
            <article
              key={product.id}
              className="w-64 flex-shrink-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {product.image ? (
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-100" />
              )}

              <div className="p-4">
                {product.category ? (
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                ) : null}

                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>

                {typeof product.price === "number" ? (
                  <p className="text-primary font-bold">{product.price} kr</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {showInfo && bannerConfig.enabled && bannerConfig.position === "bottom" ? (
          <InfoBanner content={bannerConfig.content} position="bottom" />
        ) : null}
      </div>
    </section>
  );
}
