import React from 'react';

export default function ContactCards({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="tel:+4552717810"
          className="rounded-2xl bg-white/10 border border-white/15 p-7 text-center hover:bg-white/15 transition"
        >
          <div className="text-yellow-300 text-3xl">📞</div>
          <div className="mt-3 text-white text-2xl font-bold">Telefon</div>
          <div className="text-white/80 mt-1">+45 52 71 78 10</div>
        </a>

        <a
          href="mailto:info@losningpro.dk"
          className="rounded-2xl bg-white/10 border border-white/15 p-7 text-center hover:bg-white/15 transition"
        >
          <div className="text-yellow-300 text-3xl">✉️</div>
          <div className="mt-3 text-white text-2xl font-bold">Email</div>
          <div className="text-white/80 mt-1">info@losningpro.dk</div>
        </a>

        <button
          onClick={onOpenAssistant}
          className="rounded-2xl bg-white/10 border border-white/15 p-7 text-center hover:bg-white/15 transition"
        >
          <div className="text-yellow-300 text-3xl">💬</div>
          <div className="mt-3 text-white text-2xl font-bold">AI-Chat</div>
          <div className="text-white/80 mt-1">Start en chat med vores assistent</div>
        </button>
      </div>

      <div className="mt-6 text-center text-white/80">📍 Service i hele Danmark</div>
    </div>
  );
}
