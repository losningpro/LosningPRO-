import { supabase } from "../lib/supabase";

export type GalleryItem = {
  id: string;
  title: string | null;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  comment: string | null;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
};

export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("galleri")
    .select(
      "id,title,description,before_image_url,after_image_url,comment,display_order,is_published,created_at,updated_at"
    )
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as GalleryItem[];
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("galleri")
    .select(
      "id,title,description,before_image_url,after_image_url,comment,display_order,is_published,created_at,updated_at"
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as GalleryItem[];
}

export async function updateGalleryItem(
  id: string,
  patch: Partial<GalleryItem>
): Promise<void> {
  const { error } = await supabase.from("galleri").update(patch).eq("id", id);
  if (error) throw error;
}

export async function createGalleryItem(
  payload: Omit<GalleryItem, "id" | "created_at" | "updated_at">
): Promise<void> {
  const { error } = await supabase.from("galleri").insert(payload);
  if (error) throw error;
}
