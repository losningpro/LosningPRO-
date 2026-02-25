import React from 'react';

export default function AssistantWidget({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Floating button (siempre visible) */}
      <button
        onClick={open ? onClose : () => {}}
        className="fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 bg-orange-500 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
        aria-label="AI Chat"
        title="AI Chat"
      >
        💬
      </button>

      {/* Modal simple */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1f3f8a] text-white">
              <div className="font-bold">AI-assistent</div>
              <button onClick={onClose} className="hover:opacity-80">✕</button>
            </div>

            <div className="p-4 text-gray-700">
              <p className="font-semibold">Hej! 👋</p>
              <p className="mt-2">
                (Demo) Her kan vi senere koble den rigtige AI. For nu: skriv din opgave og tryk “Send”, så åbner vi en email.
              </p>

              <a
                className="mt-4 inline-block rounded-xl bg-orange-500 text-white px-4 py-2 font-semibold hover:bg-blue-700 transition"
                href="mailto:info@losningpro.dk?subject=AI%20Chat%20foresp%C3%B8rgsel"
              >
                Send via email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
