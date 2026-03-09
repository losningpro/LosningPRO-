import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string; // 'Material' | 'El-Service' | 'VVS-Service' | etc.
  subcategory?: string; 
  popular?: boolean;
};

const initialProducts: Product[] = [
  // Materialer
  { id: '1', name: 'LED Pære E27 10W varm lys', price: 29, image: '/00025.jpg', category: 'Material', popular: true },
  { id: '2', name: 'Ophæng E27', price: 149, image: '/00021.jpg', category: 'Material', popular: true },
  { id: '3', name: 'Papirbole lampe', price: 99, image: '/00022.jpg', category: 'Material', popular: true },
  { id: '4', name: 'Nordic panel loftlampe', price: 699, image: '/00018.jpg', category: 'Material', popular: true },
  { id: '5', name: 'Nordic plafond loftlampe', price: 649, image: '/00013.jpg', category: 'Material', popular: true },
  { id: '6', name: 'Industrielle sort lampe', price: 749, image: '/00011.jpg', category: 'Material', popular: true },
  
  // Tjenester
  { id: '7', name: 'Flytning af stikkontakt', price: 1000, image: '/enhufeflyt.png', category: 'El-Service', subcategory: 'el', popular: true },
  { id: '8', name: 'VVS Reparation', price: 650, image: '/leak.jpg', category: 'VVS-Service', subcategory: 'vvs', popular: true },
  {
    id: '9',
    name: 'Lampeophæng med kabelskjuler/kabelkanal ( 1 lampe)',
    price: 550,
    image: '/AB25.jpg',
    category: 'El-Service',
    subcategory: 'el',
    popular: true,
  },
  { id: '10', name: 'Opvaskemaskin intallation', price: 1000, image: '/lavaplatos.png', category: 'VVS-Service', subcategory: 'vvs', popular: true },
  { id: '11', name: 'Toiletter ude af drift', price: 650, image: '/00036.png', category: 'VVS-Service', subcategory: 'vvs', popular: true },
  { id: '12', name: 'Vask ude af drift', price: 650, image: '/00046.png', category: 'VVS-Service', subcategory: 'vvs', popular: true },
];

interface MarketStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

// In a real app this would sync with Supabase and fetch on load
export const useMarketStore = create<MarketStore>((set) => ({
  products: initialProducts,
  addProduct: (product) => set((state) => ({ 
    products: [...state.products, { ...product, id: Date.now().toString() }] 
  })),
  updateProduct: (id, updated) => set((state) => ({
    products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p))
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id)
  })),
}));
