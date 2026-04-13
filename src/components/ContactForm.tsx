import React, { FormEvent, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type ContactFormProps = {
  pageKey?: string;
  title?: string;
  description?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  city: string;
  subject: string;
  message: string;
  consent: boolean;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  subject: "",
  message: "",
  consent: false,
};

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function createLeadSlug(name: string, email: string): string {
  const base = slugify(name || email || "lead");
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base || "lead"}-${suffix}`;
}

function splitName(fullName: string): { name: string; lastname: string } {
  const normalized = fullName.trim().replace(/\s+/g, " ");
  if (!normalized) {
    return { name: "", lastname: "" };
  }

  const parts = normalized.split(" ");
  if (parts.length === 1) {
    return { name: parts[0], lastname: "" };
  }

  return {
    name: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

function normalizePhone(phone: string): string {
  return phone.trim();
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function buildContactMetadata(pageKey: string, state: FormState) {
  return {
    source: "form",
    page_key: pageKey,
    phone_number: normalizePhone(state.phone),
    city: state.city.trim(),
    subject: state.subject.trim(),
    message_length: state.message.trim().length,
    consent_accepted: state.consent,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    href: typeof window !== "undefined" ? window.location.href : null,
  };
}

export default function ContactForm({
  pageKey = "kontakt",
  title = "Kontakt os",
  description = "Send os din opgave, så vender vi tilbage hurtigst muligt.",
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      normalizeEmail(form.email).includes("@") &&
      form.message.trim().length >= 10 &&
      form.consent
    );
  }, [form]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function insertLeadAndEvent() {
    const normalizedEmail = normalizeEmail(form.email);
    const normalizedPhone = normalizePhone(form.phone);
    const names = splitName(form.name);
    const leadSlug = createLeadSlug(form.name, normalizedEmail);

    const leadPayload = {
      slug: leadSlug,
      tenant_id: null,
      email: normalizedEmail || null,
      name: names.name || null,
      lastname: names.lastname || null,
      post_address: null,
      post_code: null,
      land: form.city.trim() ? "DK" : null,
      coment: [
        form.subject.trim() ? `Emne: ${form.subject.trim()}` : null,
        form.message.trim() ? `Besked: ${form.message.trim()}` : null,
        normalizedPhone ? `Telefon: ${normalizedPhone}` : null,
        form.city.trim() ? `By: ${form.city.trim()}` : null,
        form.consent ? "Samtykke: ja" : "Samtykke: nej",
        `Kilde: form/${pageKey}`,
      ]
        .filter(Boolean)
        .join("\n"),
      product: form.subject.trim() || null,
    };

    const { data: leadInsert, error: leadError } = await supabase
      .from("leads")
      .insert(leadPayload)
      .select("id, slug")
      .single();

    if (leadError) {
      throw leadError;
    }

    const eventPayload = {
      tenant_id: null,
      lead_id: String(leadInsert.id),
      channel: "form",
      page_key: pageKey,
      metadata: buildContactMetadata(pageKey, form),
    };

    const { error: eventError } = await supabase
      .from("contact_events")
      .insert(eventPayload);

    if (eventError) {
      throw eventError;
    }

    return leadInsert;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      setError("Udfyld navn, e-mail, besked og samtykke.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await insertLeadAndEvent();
      setSuccess("Tak. Din henvendelse er oprettet, og vi kontakter dig hurtigst muligt.");
      setForm(INITIAL_STATE);
    } catch (err) {
      console.error("ContactForm submit error:", err);
      setError("Vi kunne ikke sende din henvendelse lige nu. Prøv igen om lidt.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl">
        <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          Kontaktformular
        </div>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base text-slate-600 md:text-lg">{description}</p>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      ) : null}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <div className="mb-2 text-sm font-medium text-slate-700">Navn</div>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Dit navn"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              autoComplete="name"
              required
            />
          </label>

          <label className="block">
            <div className="mb-2 text-sm font-medium text-slate-700">E-mail</div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="navn@eksempel.dk"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              autoComplete="email"
              required
            />
          </label>

          <label className="block">
            <div className="mb-2 text-sm font-medium text-slate-700">Telefon</div>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+45 12 34 56 78"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              autoComplete="tel"
            />
          </label>

          <label className="block">
            <div className="mb-2 text-sm font-medium text-slate-700">By</div>
            <input
              type="text"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="København"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              autoComplete="address-level2"
            />
          </label>
        </div>

        <label className="block">
          <div className="mb-2 text-sm font-medium text-slate-700">Emne</div>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            placeholder="Hvad drejer det sig om?"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
          />
        </label>

        <label className="block">
          <div className="mb-2 text-sm font-medium text-slate-700">Besked</div>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Beskriv din opgave, ønsket tidspunkt, adresse eller andre detaljer."
            className="min-h-[180px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            required
          />
        </label>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-sm text-slate-700">
            Jeg accepterer, at LøsningPRO må kontakte mig om denne henvendelse.
          </span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sender..." : "Send henvendelse"}
          </button>

          <a
            href="tel:+4552717810"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-4 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
          >
            Ring i stedet: +45 52 71 78 10
          </a>
        </div>
      </form>
    </section>
  );
}
