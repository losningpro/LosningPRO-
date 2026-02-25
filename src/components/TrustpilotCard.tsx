import React from 'react';

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/losningpro.dk';

export default function TrustpilotCard() {
  return (
    <a
      href={TRUSTPILOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-md rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="font-bold text-gray-900 text-lg">Trustpilot</div>
      <div className="mt-2 flex items-center gap-1">
        <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
      </div>
      <div className="mt-2 text-gray-600">Baseret på 150+ anmeldelser</div>
      <div className="mt-3 text-blue-700 font-semibold">Se anmeldelser →</div>
    </a>
  );
}
