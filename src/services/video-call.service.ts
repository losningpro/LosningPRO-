import { supabase } from "../lib/supabase";

export type VideoCallRequestPayload = {
  tenantId?: string | null;
  leadId?: string | null;
  fullName: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  preferredDate?: string;
  preferredTime?: string;
  topic?: string;
  message?: string;
  meetingType?: "video_call" | "phone_call";
  consentAccepted: boolean;
};

type VideoCallInsert = {
  tenant_id: string | null;
  lead_id: string | null;
  full_name: string;
  email: string;
  phone_number: string | null;
  company_name: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  topic: string | null;
  message: string | null;
  status: "new";
  meeting_type: "video_call" | "phone_call";
  consent_accepted: boolean;
  metadata: Record<string, unknown>;
};

function normalizeText(value?: string | null): string | null {
  const trimmed = String(value ?? "").trim();
  return trimmed ? trimmed : null;
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export async function createVideoCallRequest(payload: VideoCallRequestPayload) {
  const insertPayload: VideoCallInsert = {
    tenant_id: payload.tenantId ?? null,
    lead_id: payload.leadId ?? null,
    full_name: payload.fullName.trim(),
    email: normalizeEmail(payload.email),
    phone_number: normalizeText(payload.phoneNumber),
    company_name: normalizeText(payload.companyName),
    preferred_date: normalizeText(payload.preferredDate),
    preferred_time: normalizeText(payload.preferredTime),
    topic: normalizeText(payload.topic),
    message: normalizeText(payload.message),
    status: "new",
    meeting_type: payload.meetingType ?? "video_call",
    consent_accepted: payload.consentAccepted,
    metadata: {
      submitted_from: "website",
      submitted_at: new Date().toISOString(),
    },
  };

  const { data, error } = await supabase
    .from("video_call_requests")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error || !data?.id) {
    throw error ?? new Error("No se pudo crear la solicitud de videollamada.");
  }

  return { id: data.id };
}
