import { supabase } from "../lib/supabase";
import type { Product } from "../types/domain";

type ProductRow = Record<string, unknown>;

function mapProduct(row: ProductRow): Product {
  return {
    id: String(row.id ?? ""),
    tenant_id: typeof row.tenant_id === "string" ? row.tenant_id : null,
    name: String(row.name ?? row.title ?? ""),
    slug: typeof row.slug === "string" ? row.slug : null,
    description: typeof row.description === "string" ? row.description : null,
    image: typeof row.image === "string" ? row.image : typeof row.image_url === "string" ? row.image_url : null,
    category: String(row.category ?? "general"),
    kind: String(row.kind ?? row.product_type ?? "product").toLowerCase() === "service" ? "service" : "product",
    price_dkk: Number(row.price_dkk ?? row.price ?? 0),
    stripe_price_id: typeof row.stripe_price_id === "string" ? row.stripe_price_id : null,
    related_ids: Array.isArray(row.related_ids) ? row.related_ids.filter((x): x is string => typeof x === "string") : null,
    is_visible: row.is_visible !== false,
    status: typeof row.status === "string" ? (row.status as Product["status"]) : "active",
  };
}

export const productService = {
  async listVisible() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_visible", true)
      .order("name");

    if (error) throw error;
    return (data ?? []).map((row) => mapProduct(row as ProductRow));
  },

  async listByTenant(tenantId: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("name");

    if (error) throw error;
    return (data ?? []).map((row) => mapProduct(row as ProductRow));
  },

  async save(product: Partial<Product> & Pick<Product, "name" | "category" | "kind" | "price_dkk">) {
    const payload = {
      ...product,
      is_visible: product.is_visible ?? true,
      status: product.status ?? "active",
    };

    const { data, error } = await supabase
      .from("products")
      .upsert(payload)
      .select("*")
      .single();

    if (error) throw error;
    return mapProduct(data as ProductRow);
  },

  async setVisibility(id: string, isVisible: boolean) {
    const { error } = await supabase
      .from("products")
      .update({ is_visible: isVisible })
      .eq("id", id);

    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};
