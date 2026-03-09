import React, { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductSlider({
  title,
  products,
  viewAllLink,
  onInteract
}: {
  title: string;
  products: Product[];
  viewAllLink: string;
  onInteract?: () => void;
}) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [firstClickConsumed, setFirstClickConsumed] = useState(false);

  const bannerConfig = useMemo(() => {
    if (title === 'Populære materialer') {
      return {
        message: '⚠️ Leveringstiderne kan variere afhængigt af leverandørerne.',
        position: 'top' as const
      };
    }

    if (title === 'Populære tjenester') {
      return {
        message:
          '⚠️ Der er et opstartsgebyr på 399 kr. knyttet til tjenesterne, som betales én gang pr. besøg.',
        position: 'bottom' as const
      };
    }

    return null;
  }, [title]);

  const handleProtectedFirstClick = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    if (!bannerConfig) {
      onInteract?.();
      return;
    }

    if (!firstClickConsumed) {
      e.preventDefault();
      e.stopPropagation();
      setBannerVisible(true);
      setFirstClickConsumed(true);
      return;
    }

    onInteract?.();
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {bannerConfig?.position === 'top' && bannerVisible && (
          <div className="mb-4 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
            {bannerConfig.message}
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>
          <a
            href={viewAllLink}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Se alle
          </a>
        </div>

        {bannerConfig?.position === 'bottom' && bannerVisible && (
          <div className="mb-4 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
            {bannerConfig.message}
          </div>
        )}

        <div
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onClick={handleProtectedFirstClick}
          onTouchStart={handleProtectedFirstClick}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="min-w-[240px] max-w-[240px] rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
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
                <div className="font-semibold text-gray-900 mt-1">{p.name}</div>
                <div className="text-gray-700 mt-2">{p.price} kr</div>

                <button
                  type="button"
                  className="mt-3 w-full rounded-xl bg-orange-500 text-white py-2 font-semibold hover:bg-blue-700 transition"
                  onClick={handleProtectedFirstClick}
                  onTouchStart={handleProtectedFirstClick}
                >
                  Se detaljer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
