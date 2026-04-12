import React, { FormEvent, useMemo, useState } from "react";
import { createVideoCallRequest } from "../services/video-call.service";

type VideoCallFormProps = {
  tenantId?: string | null;
  leadId?: string | null;
  title?: string;
  description?: string;
};

type FormState = {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  preferredDate: string;
  preferredTime: string;
  topic: string;
  message: string;
  meetingType: "video_call" | "phone_call";
  consentAccepted: boolean;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  preferredDate: "",
  preferredTime: "",
  topic: "",
  message: "",
  meetingType: "video_call",
  consentAccepted: false,
};

export default function VideoCallForm({
  tenantId = null,
  leadId = null,
  title = "Book gratis videokald",
  description = "Vælg et tidspunkt, og send os kort info om opgaven.",
}: VideoCallFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return (
      form.fullName.trim().length >= 2 &&
      form.email.trim().includes("@") &&
      form.preferredDate.trim().length > 0 &&
      form.preferredTime.trim().length > 0 &&
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
      setError("Udfyld navn, e-mail, dato, tidspunkt og samtykke.");
      return;
    }

    setSubmitting(true);

    try {
      await createVideoCallRequest({
        tenantId,
        leadId,
        fullName: form.fullName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        companyName: form.companyName,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        topic: form.topic,
        message: form.message,
        meetingType: form.meetingType,
        consentAccepted: form.consentAccepted,
      });

      setSuccess("Tak. Din forespørgsel er modtaget, og vi vender tilbage med bekræftelse.");
      setForm(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noget gik galt. Prøv igen.");
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
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            placeholder="Dit navn"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            placeholder="navn@eksempel.dk"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Telefon</label>
          <input
            value={form.phoneNumber}
            onChange={(e) => updateField("phoneNumber", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            placeholder="+45 12 34 56 78"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Firma</label>
          <input
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            placeholder="Firmanavn"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Dato</label>
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => updateField("preferredDate", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Tidspunkt</label>
          <select
            value={form.preferredTime}
            onChange={(e) => updateField("preferredTime", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
          >
            <option value="">Vælg tidspunkt</option>
            <option value="08:00-10:00">08:00-10:00</option>
            <option value="10:00-12:00">10:00-12:00</option>
            <option value="12:00-14:00">12:00-14:00</option>
            <option value="14:00-16:00">14:00-16:00</option>
            <option value="16:00-18:00">16:00-18:00</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Mødetype</label>
          <select
            value={form.meetingType}
            onChange={(e) =>
              updateField("meetingType", e.target.value as "video_call" | "phone_call")
            }
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
          >
            <option value="video_call">Videokald</option>
            <option value="phone_call">Telefonopkald</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Emne</label>
          <input
            value={form.topic}
            onChange={(e) => updateField("topic", e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            placeholder="Kort emne"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Besked</label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="min-h-[120px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            placeholder="Beskriv kort hvad du gerne vil tale om"
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
              Jeg accepterer, at mine oplysninger bruges til at kontakte mig om mødet.
            </span>
          </label>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sender..." : "Book gratis videokald"}
          </button>
        </div>
      </form>
    </section>
  );
}
