import React, { FormEvent, useMemo, useState } from "react";
import { submitContactLead } from "../services/contact.service";

type ContactFormProps = {
  tenantId?: string | null;
  pageKey?: string;
  title?: string;
  description?: string;
};

type FormState = {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  subject: string;
  message: string;
  consentAccepted: boolean;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  city: "",
  subject: "",
  message: "",
  consentAccepted: false,
};

export default function ContactForm({
  tenantId = null,
  pageKey = "kontakt",
  title = "Kontakt os",
  description = "Send os din forespørgsel, så vender vi tilbage hurtigst muligt.",
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return (
      form.fullName.trim().length >= 2 &&
      form.email.trim().includes("@") &&
      form.message.trim().length >= 10 &&
      form.consentAccepted
    );
  }, [form]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(null);
    setError(null);

    if (!isValid) {
      setError("Udfyld navn, e-mail, besked og samtykke.");
      return;
    }

    setSubmitting(true);

    try {
      await submitContactLead({
        fullName: form.fullName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        city: form.city,
        subject: form.subject,
        message: form.message,
        consentAccepted: form.consentAccepted,
        tenantId,
        pageUrl: typeof window !== "undefined" ? window.location.href : "/kontakt",
        source: pageKey,
      });

      setSuccess("Tak. Din besked er sendt, og vi kontakter dig snart.");
      setForm(initialState);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Noget gik galt. Prøv igen.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      {success ? (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {success}
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Navn</label>
          <input
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#26439a]"
            placeholder="Dit navn"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#26439a]"
            placeholder="navn@eksempel.dk"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Telefon</label>
          <input
            value={form.phoneNumber}
            onChange={(e) => updateField("phoneNumber", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#26439a]"
            placeholder="+45 12 34 56 78"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">By</label>
          <input
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#26439a]"
            placeholder="København"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Emne</label>
          <input
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#26439a]"
            placeholder="Hvad drejer det sig om?"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Besked</label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="min-h-[140px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#26439a]"
            placeholder="Beskriv din opgave eller dit spørgsmål"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.consentAccepted}
              onChange={(e) => updateField("consentAccepted", e.target.checked)}
              className="mt-1"
            />
            <span>
              Jeg accepterer, at mine oplysninger bruges til at kontakte mig om min henvendelse.
            </span>
          </label>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-[#26439a] px-6 py-3 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sender..." : "Send besked"}
          </button>

          <a
            href="tel:+4552717810"
            className="rounded-2xl border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-800 transition hover:bg-slate-50"
          >
            Ring nu
          </a>
        </div>
      </form>
    </section>
  );
}
