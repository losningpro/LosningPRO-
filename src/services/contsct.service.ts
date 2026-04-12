import { supabase } from "../lib/supabase";

export type ContactPayload = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  city?: string;
  subject?: string;
  message: string;
  consentAccepted: boolean;
  tenantId?: string | null;
  pageUrl?: string;
  source?: string;
};

type LeadInsert = {
  source: string;
  status: string;
  priority: string;
  tenant_id: string | null;
  full_name: string;
  email: string;
  phone_number: string | null;
  city: string | null;
  subject: string | null;
  message: string;
  consent_accepted: boolean;
  page_url: string | null;
  metadata: Record<string, unknown>;
};

type ContactEventInsert = {
  tenant_id: string | null;
  lead_id: string;
  channel: "form";
  page_key: string;
  metadata: Record<string, unknown>;
};

function normalizeText(value?: string | null): string | null {
  const trimmed = String(value ?? "").trim();
  return trimmed ? trimmed : null;
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export async function submitContactLead(payload: ContactPayload) {
  const leadInsert: LeadInsert = {
    source: payload.source ?? "contact_form",
    status: "new",
    priority: "normal",
    tenant_id: payload.tenantId ?? null,
    full_name: payload.fullName.trim(),
    email: normalizeEmail(payload.email),
    phone_number: normalizeText(payload.phoneNumber),
    city: normalizeText(payload.city),
    subject: normalizeText(payload.subject),
    message: payload.message.trim(),
    consent_accepted: payload.consentAccepted,
    page_url: normalizeText(payload.pageUrl),
    metadata: {
      submitted_from: "website",
      submitted_at: new Date().toISOString(),
    },
  };

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert(leadInsert)
    .select("id")
    .single();

  if (leadError || !lead?.id) {
    throw leadError ?? new Error("No se pudo crear el lead.");
  }

  const eventInsert: ContactEventInsert = {
    tenant_id: payload.tenantId ?? null,
    lead_id: lead.id,
    channel: "form",
    page_key: "kontakt",
    metadata: {
      source: payload.source ?? "contact_form",
      page_url: payload.pageUrl ?? null,
    },
  };

  const { error: eventError } = await supabase
    .from("contact_events")
    .insert(eventInsert);

  if (eventError) {
    throw eventError;
  }

  return { leadId: lead.id };
}
