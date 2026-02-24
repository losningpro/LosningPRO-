import React from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductSliderProps {
  title: string;
  products: Product[];
  viewAllLink: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ title, products, viewAllLink }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <Link
            to={viewAllLink}
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Se alle
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Slider horizontal */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar">
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{product.price} kr</span>
                    <button
                      type="button"
                      className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductSlider;
