import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, Filter, ShoppingCart, Grid, List } from 'lucide-react';
import { useMarketStore } from '../lib/store';

export default function Kob() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const products = useMarketStore(state => state.products);
  const materialProducts = products.filter(p => p.category === 'Material');

  const filteredProducts = materialProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.image && product.image.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Køb Materialer</h1>
          <p className="text-gray-600">Find alt det materiale du har brug for til dine el-projekter</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Søg efter produkter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filtre</span>
              </button>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Filtre</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pris</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Alle priser</option>
                    <option>Under 100 kr</option>
                    <option>100-500 kr</option>
                    <option>Over 500 kr</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tilgængelighed</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Alle produkter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mærke</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Alle mærker</option>
                    <option>Schneider</option>
                    <option>ABB</option>
                    <option>Philips</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sorter efter</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Relevans</option>
                    <option>Pris: Lav til høj</option>
                    <option>Pris: Høj til lav</option>
                    <option>Navn A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Viser {filteredProducts.length} af {materialProducts.length} produkter
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">{product.price} kr</span>
                  </div>
                  <button 
                    className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Tilføj til kurv</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-48 h-48 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      </div>
                      <div className="text-right mt-4 sm:mt-0">
                        <div className="text-2xl font-bold text-primary mb-4">{product.price} kr</div>
                        <button 
                          className="flex items-center space-x-2 bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Tilføj til kurv</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Ingen produkter fundet</p>
            <p className="text-gray-400 mt-2">Prøv at ændre dine søgekriterier</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}