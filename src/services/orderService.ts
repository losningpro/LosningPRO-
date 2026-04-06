import { supabase } from "../lib/supabase";
import type { Order } from "../types/domain";

export type CreateOrderPayload = {
  tenant_id?: string | null;
  user_id?: string | null;
  total_dkk: number;
  status?: Order["status"];
  lines: Array<{
    product_id: string;
    name: string;
    quantity: number;
    unit_price_dkk: number;
    kind: "service" | "product";
  }>;
};

export const orderService = {
  async create(payload: CreateOrderPayload) {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        tenant_id: payload.tenant_id ?? null,
        user_id: payload.user_id ?? null,
        total_dkk: payload.total_dkk,
        status: payload.status ?? "pending_payment",
      })
      .select("*")
      .single();

    if (error) throw error;

    const orderId = String(data.id);

    if (payload.lines.length > 0) {
      const { error: linesError } = await supabase.from("order_lines").insert(
        payload.lines.map((line) => ({
          order_id: orderId,
          product_id: line.product_id,
          name: line.name,
          quantity: line.quantity,
          unit_price_dkk: line.unit_price_dkk,
          kind: line.kind,
        }))
      );

      if (linesError) throw linesError;
    }

    return data;
  },
};
