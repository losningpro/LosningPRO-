import { supabase } from "../lib/supabase";

export type BookingDraft = {
  tenant_id?: string | null;
  user_id?: string | null;
  order_id?: string | null;
  starts_at: string;
  ends_at?: string | null;
  notes?: string | null;
};

export const bookingService = {
  async create(payload: BookingDraft) {
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        tenant_id: payload.tenant_id ?? null,
        user_id: payload.user_id ?? null,
        order_id: payload.order_id ?? null,
        starts_at: payload.starts_at,
        ends_at: payload.ends_at ?? null,
        notes: payload.notes ?? null,
        status: "pending",
      })
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },
};
