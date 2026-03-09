import React, { useState } from 'react';
import { useMarketStore, Product } from '../lib/store';

export default function Konto() {
  const { products, addProduct, updateProduct, deleteProduct } = useMarketStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Material',
    subcategory: '',
    image: '',
    popular: false,
  });

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      name: '',
      price: 0,
      category: 'Material',
      subcategory: '',
      image: '',
      popular: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === 'new') {
      addProduct(formData as Omit<Product, 'id'>);
    } else if (editingId) {
      updateProduct(editingId, formData);
    }
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Backoffice Market Management</h1>
        <button 
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Add New Product/Service
        </button>
      </div>

      {editingId && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border mb-8 space-y-4">
          <h2 className="text-xl font-bold">{editingId === 'new' ? 'New Item' : 'Edit Item'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              required
              placeholder="Name"
              className="border p-2 rounded"
              value={formData.name || ''}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input 
              required
              type="number"
              placeholder="Price"
              className="border p-2 rounded"
              value={formData.price || ''}
              onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <select 
              className="border p-2 rounded"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Material">Material</option>
              <option value="El-Service">El-Service</option>
              <option value="VVS-Service">VVS-Service</option>
              <option value="Tømrer">Tømrer</option>
            </select>
            <input 
              placeholder="Subcategory (e.g. 'el', 'vvs')"
              className="border p-2 rounded"
              value={formData.subcategory || ''}
              onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
            />
            <input 
              placeholder="Image URL"
              className="border p-2 rounded"
              value={formData.image || ''}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
            />
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox"
                checked={formData.popular || false}
                onChange={e => setFormData({ ...formData, popular: e.target.checked })}
              />
              <span>Show in Popular carousels (Frontpage)</span>
            </label>
          </div>
          
          <div className="flex space-x-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="border rounded-xl p-4 shadow-sm flex flex-col">
            <div className="h-32 bg-gray-100 rounded mb-4 overflow-hidden">
              <img src={p.image || 'https://via.placeholder.com/150'} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-xs text-gray-500 mb-1">{p.category} {p.subcategory && `> ${p.subcategory}`}</div>
            <div className="font-bold text-lg mb-2">{p.name}</div>
            <div className="text-lg bg-gray-100 self-start px-2 py-1 rounded mb-4">{p.price} kr</div>
            {p.popular && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded inline-block w-fit mb-4">★ Popular</span>}
            
            <div className="mt-auto flex justify-end space-x-2 border-t pt-4">
              <button 
                onClick={() => handleEdit(p)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteProduct(p.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
