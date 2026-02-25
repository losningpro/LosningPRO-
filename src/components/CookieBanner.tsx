import React, { useEffect, useState } from 'react';

const KEY = 'lp_cookie_consent_v1';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem(KEY);
    if (!val) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-700">
            Vi bruger cookies for at forbedre oplevelsen. Ved at fortsætte accepterer du vores brug af cookies.
            <a href="/juridisk" className="ml-2 text-blue-700 font-semibold hover:underline">Læs mere</a>
          </div>

          <div className="flex gap-2">
            <button
              className="rounded-xl px-4 py-2 bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition"
              onClick={() => {
                localStorage.setItem(KEY, 'declined');
                setShow(false);
              }}
            >
              Afvis
            </button>
            <button
              className="rounded-xl px-4 py-2 bg-[#1f3f8a] text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                localStorage.setItem(KEY, 'accepted');
                setShow(false);
              }}
            >
              Acceptér
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
