import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CreditCard, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

const checkoutSchema = z.object({
  email: z.string().email('Ugyldig email adresse'),
  firstName: z.string().min(2, 'Fornavn skal være mindst 2 tegn'),
  lastName: z.string().min(2, 'Efternavn skal være mindst 2 tegn'),
  phone: z.string().min(8, 'Telefonnummer skal være mindst 8 cifre'),
  address: z.string().min(5, 'Adresse skal være mindst 5 tegn'),
  city: z.string().min(2, 'By skal være mindst 2 tegn'),
  postalCode: z.string().min(4, 'Postnummer skal være mindst 4 cifre'),
  acceptTerms: z.boolean().refine(val => val === true, 'Du skal acceptere handelsbetingelserne')
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema)
  });

  // Mock cart data
  const cartItems = [
    {
      id: '1',
      name: 'LED Pære E27 9W Varm Hvid',
      price: 89,
      quantity: 2
    },
    {
      id: '2',
      name: 'El-installation',
      price: 850,
      quantity: 1
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.25;
  const total = subtotal + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Simulate Stripe checkout session creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Checkout data:', data);
      toast.success('Omdirigerer til betaling...');
      
      // In real app, redirect to Stripe checkout
      // window.location.href = stripeCheckoutUrl;
    } catch (error) {
      toast.error('Der opstod en fejl. Prøv igen senere.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Leveringsoplysninger</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="din@email.dk"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Fornavn *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Dit fornavn"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Efternavn *
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Dit efternavn"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="12345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse *
                </label>
                <input
                  {...register('address')}
                  type="text"
                  id="address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Din adresse"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Postnummer *
                  </label>
                  <input
                    {...register('postalCode')}
                    type="text"
                    id="postalCode"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="2600"
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    By *
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    id="city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Glostrup"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  {...register('acceptTerms')}
                  type="checkbox"
                  id="acceptTerms"
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  Jeg accepterer{' '}
                  <a href="https://info.losningpro.dk/handelsbetingelser" className="text-primary hover:text-primary/80">
                    handelsbetingelserne
                  </a>{' '}
                  og{' '}
                  <a href="https://info.losningpro.dk/privatlivspolitik" className="text-primary hover:text-primary/80">
                    privatlivspolitikken
                  </a>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Behandler...</span>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Fortsæt til betaling</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <span>Sikker betaling via Stripe</span>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Din ordre</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Antal: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-900">{item.price * item.quantity} kr</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{subtotal} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Moms (25%)</span>
                <span className="font-semibold">{tax.toFixed(0)} kr</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-primary">{total.toFixed(0)} kr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}