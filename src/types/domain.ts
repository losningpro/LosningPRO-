export type UserRole =
  | "master_admin"
  | "tenant_admin"
  | "staff"
  | "viewer";

export type EntityStatus = "active" | "inactive" | "draft" | "archived";

export type User = {
  id: string;
  email: string | null;
  role: UserRole;
  tenant_id: string | null;
  status: EntityStatus;
  created_at?: string | null;
};

export type Tenant = {
  id: string;
  name: string;
  slug?: string | null;
  status: EntityStatus;
  created_at?: string | null;
};

export type Booking = {
  id: string;
  tenant_id: string | null;
  user_id?: string | null;
  order_id?: string | null;
  starts_at: string;
  ends_at?: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string | null;
};

export type Order = {
  id: string;
  tenant_id: string | null;
  user_id?: string | null;
  total_dkk: number;
  status: "draft" | "pending_payment" | "paid" | "cancelled" | "fulfilled";
  created_at?: string | null;
};

export type Product = {
  id: string;
  tenant_id?: string | null;
  name: string;
  slug?: string | null;
  description?: string | null;
  image?: string | null;
  category: string;
  kind: "service" | "product";
  price_dkk: number;
  stripe_price_id?: string | null;
  related_ids?: string[] | null;
  is_visible: boolean;
  status?: EntityStatus;
};

export type GalleryItem = {
  id: string;
  tenant_id?: string | null;
  title: string;
  image_url: string;
  is_visible: boolean;
};

export type Subscription = {
  id: string;
  tenant_id: string;
  plan_name: string;
  status: EntityStatus;
};

export type FinanceEntry = {
  id: string;
  tenant_id: string | null;
  amount_dkk: number;
  direction: "in" | "out";
  description?: string | null;
  created_at?: string | null;
};

export type Document = {
  id: string;
  tenant_id: string | null;
  title: string;
  file_url: string;
  status: EntityStatus;
};
