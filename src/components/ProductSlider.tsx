import React from 'react';

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
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>
          <a href={viewAllLink} className="text-sm font-semibold text-blue-700 hover:underline">
            Se alle
          </a>
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onClick={onInteract}
          onTouchStart={onInteract}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="min-w-[240px] max-w-[240px] rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500">{p.category}</div>
                <div className="font-semibold text-gray-900 mt-1">{p.name}</div>
                <div className="text-gray-700 mt-2">{p.price} kr</div>

                <button className="mt-3 w-full rounded-xl bg-orange-500 text-white py-2 font-semibold hover:bg-blue-700 transition">
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
