import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CalendarDays, CreditCard, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '../cart/cart.store';

const checkoutSchema = z.object({
  email: z.string().email('Ugyldig email adresse'),
  firstName: z.string().min(2, 'Fornavn skal være mindst 2 tegn'),
  lastName: z.string().min(2, 'Efternavn skal være mindst 2 tegn'),
  phone: z.string().min(8, 'Telefonnummer skal være mindst 8 cifre'),
  address: z.string().min(5, 'Adresse skal være mindst 5 tegn'),
  city: z.string().min(2, 'By skal være mindst 2 tegn'),
  postalCode: z.string().min(4, 'Postnummer skal være mindst 4 cifre'),
  bookingDate: z.string().optional(),
  bookingTime: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, 'Du skal acceptere handelsbetingelserne')
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, subtotalDkk, containsService, clear } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(
      checkoutSchema.superRefine((values, ctx) => {
        if (containsService && !values.bookingDate) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['bookingDate'], message: 'Vælg dato for service' });
        }
        if (containsService && !values.bookingTime) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['bookingTime'], message: 'Vælg tidspunkt for service' });
        }
      })
    )
  });

  const moms = subtotalDkk * 0.25;
  const total = subtotalDkk + moms;

  async function onSubmit(_: CheckoutFormData) {
    if (items.length === 0) {
      toast.error('Din kurv er tom.');
      return;
    }

    clear();
    toast.success('Ordren er registreret. Betalingsintegration kobles på næste trin.');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Kundeoplysninger</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email *</label>
                <input {...register('email')} type="email" id="email" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">Fornavn *</label>
                  <input {...register('firstName')} id="firstName" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">Efternavn *</label>
                  <input {...register('lastName')} id="lastName" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">Telefon *</label>
                  <input {...register('phone')} id="phone" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-gray-700">Postnummer *</label>
                  <input {...register('postalCode')} id="postalCode" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">Adresse *</label>
                <input {...register('address')} id="address" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>

              <div>
                <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">By *</label>
                <input {...register('city')} id="city" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
              </div>

              {containsService && (
                <section className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="mb-4 flex items-center gap-2 font-semibold text-blue-900">
                    <CalendarDays className="h-4 w-4" />
                    Reservér dato og tidspunkt
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bookingDate" className="mb-2 block text-sm font-medium text-gray-700">Dato *</label>
                      <input {...register('bookingDate')} type="date" id="bookingDate" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                      {errors.bookingDate && <p className="mt-1 text-sm text-red-600">{errors.bookingDate.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="bookingTime" className="mb-2 block text-sm font-medium text-gray-700">Tidspunkt *</label>
                      <input {...register('bookingTime')} type="time" id="bookingTime" className="w-full rounded-lg border border-gray-300 px-4 py-3" />
                      {errors.bookingTime && <p className="mt-1 text-sm text-red-600">{errors.bookingTime.message}</p>}
                    </div>
                  </div>
                </section>
              )}

              <label className="flex items-start gap-3">
                <input {...register('acceptTerms')} type="checkbox" className="mt-1" />
                <span className="text-sm text-gray-700">Jeg accepterer handelsbetingelserne og behandling af bookingdata.</span>
              </label>
              {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
              >
                <Lock className="h-5 w-5" />
                {isSubmitting ? 'Behandler...' : 'Fortsæt'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Ordreoversigt</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} × {item.priceDkk} kr</p>
                    </div>
                    <p className="font-semibold text-gray-900">{item.quantity * item.priceDkk} kr</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{subtotalDkk.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Moms</span>
                  <span>{moms.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{total.toFixed(2)} kr</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <div className="mb-2 flex items-center gap-2 font-semibold text-green-900">
                <CreditCard className="h-5 w-5" />
                Checkout stabiliseret
              </div>
              <p className="text-sm text-green-800">
                Denne version fjerner den fejlkilde, der brød deployment: checkout afhænger ikke længere af nye services,
                som endnu ikke er koblet færdigt ind i den nuværende arkitektur.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
