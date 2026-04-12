import type { Role } from "../types";

export type AppRole = Role;

export type PublicIntent = "viewer" | "lead" | "worker_candidate" | "kunde";

export type AppModule =
  | "dashboard"
  | "users"
  | "tenants"
  | "bookings"
  | "orders"
  | "products"
  | "gallery"
  | "subscriptions"
  | "finance"
  | "documents"
  | "settings";

export type AppAction = "view" | "create" | "update" | "delete" | "manage";

type PermissionMatrix = Record<AppModule, AppAction[]>;

type ProfileLike = {
  email?: string | null;
  role?: string | null;
  is_platform_admin?: boolean | null;
};

const PUBLIC_INTENT_KEY = "losningpro_auth_intent";

const fullAccess: AppAction[] = ["view", "create", "update", "delete", "manage"];
const editorAccess: AppAction[] = ["view", "create", "update"];
const viewerAccess: AppAction[] = ["view"];

export const ROLE_ALIASES: Record<string, AppRole> = {
  admin: "master_admin",
  master: "master_admin",
  master_admin: "master_admin",
  tenant: "tenant_admin",
  tenant_admin: "tenant_admin",
  medarbejder: "staff",
  employee: "staff",
  staff: "staff",
  viewer: "viewer",
  samarbejder: "viewer",
  partner: "viewer",
  kunde: "kunde",
};

export function normalizeAppRole(role: string | null | undefined): AppRole {
  if (!role) return "viewer";
  const normalized = role.toLowerCase().trim();
  return ROLE_ALIASES[normalized] ?? "viewer";
}

export function normalizeRoleFromProfile(
  profile: ProfileLike | null | undefined
): AppRole {
  const email = String(profile?.email ?? "").trim().toLowerCase();
  const role = String(profile?.role ?? "").trim().toLowerCase();
  const isAdmin = profile?.is_platform_admin === true;

  if (isAdmin || role === "master" || role === "master_admin" || email === "info@losningpro.dk") {
    return "master_admin";
  }

  return normalizeAppRole(role);
}

const ROLE_PERMISSIONS: Record<AppRole, PermissionMatrix> = {
  master_admin: {
    dashboard: fullAccess,
    users: fullAccess,
    tenants: fullAccess,
    bookings: fullAccess,
    orders: fullAccess,
    products: fullAccess,
    gallery: fullAccess,
    subscriptions: fullAccess,
    finance: fullAccess,
    documents: fullAccess,
    settings: fullAccess,
  },
  tenant_admin: {
    dashboard: ["view", "manage"],
    users: editorAccess,
    tenants: ["view", "update"],
    bookings: fullAccess,
    orders: fullAccess,
    products: fullAccess,
    gallery: fullAccess,
    subscriptions: ["view", "update"],
    finance: ["view", "create", "update"],
    documents: fullAccess,
    settings: ["view", "update"],
  },
  staff: {
    dashboard: ["view"],
    users: viewerAccess,
    tenants: [],
    bookings: ["view", "create", "update"],
    orders: ["view", "create", "update"],
    products: ["view", "update"],
    gallery: ["view", "create", "update"],
    subscriptions: ["view"],
    finance: ["view"],
    documents: ["view", "create"],
    settings: [],
  },
  viewer: {
    dashboard: ["view"],
    users: [],
    tenants: [],
    bookings: ["view"],
    orders: ["view"],
    products: ["view"],
    gallery: ["view"],
    subscriptions: ["view"],
    finance: [],
    documents: ["view"],
    settings: [],
  },
  master: {
    dashboard: fullAccess,
    users: fullAccess,
    tenants: fullAccess,
    bookings: fullAccess,
    orders: fullAccess,
    products: fullAccess,
    gallery: fullAccess,
    subscriptions: fullAccess,
    finance: fullAccess,
    documents: fullAccess,
    settings: fullAccess,
  },
  tenant: {
    dashboard: ["view", "manage"],
    users: editorAccess,
    tenants: ["view", "update"],
    bookings: fullAccess,
    orders: fullAccess,
    products: fullAccess,
    gallery: fullAccess,
    subscriptions: ["view", "update"],
    finance: ["view", "create", "update"],
    documents: fullAccess,
    settings: ["view", "update"],
  },
  medarbejder: {
    dashboard: ["view"],
    users: viewerAccess,
    tenants: [],
    bookings: ["view", "create", "update"],
    orders: ["view", "create", "update"],
    products: ["view", "update"],
    gallery: ["view", "create", "update"],
    subscriptions: ["view"],
    finance: ["view"],
    documents: ["view", "create"],
    settings: [],
  },
  samarbejder: {
    dashboard: ["view"],
    users: [],
    tenants: [],
    bookings: ["view"],
    orders: ["view"],
    products: ["view"],
    gallery: ["view"],
    subscriptions: ["view"],
    finance: [],
    documents: ["view"],
    settings: [],
  },
  partner: {
    dashboard: ["view"],
    users: [],
    tenants: [],
    bookings: ["view"],
    orders: ["view"],
    products: ["view"],
    gallery: ["view"],
    subscriptions: ["view"],
    finance: [],
    documents: ["view"],
    settings: [],
  },
  kunde: {
    dashboard: ["view"],
    users: [],
    tenants: [],
    bookings: ["view"],
    orders: ["view"],
    products: ["view"],
    gallery: ["view"],
    subscriptions: ["view"],
    finance: [],
    documents: ["view"],
    settings: [],
  },
};

export function canAccess(
  role: string | null | undefined,
  module: AppModule,
  action: AppAction
): boolean {
  const normalizedRole = normalizeAppRole(role);
  return ROLE_PERMISSIONS[normalizedRole][module].includes(action);
}

export function canAccessProfile(
  profile: ProfileLike | null | undefined,
  module: AppModule,
  action: AppAction
): boolean {
  const normalizedRole = normalizeRoleFromProfile(profile);
  return ROLE_PERMISSIONS[normalizedRole][module].includes(action);
}

export function listAllowedModules(role: string | null | undefined): AppModule[] {
  const normalizedRole = normalizeAppRole(role);
  return (Object.keys(ROLE_PERMISSIONS[normalizedRole]) as AppModule[]).filter(
    (module) => ROLE_PERMISSIONS[normalizedRole][module].includes("view")
  );
}

export function listAllowedModulesForProfile(
  profile: ProfileLike | null | undefined
): AppModule[] {
  const normalizedRole = normalizeRoleFromProfile(profile);
  return (Object.keys(ROLE_PERMISSIONS[normalizedRole]) as AppModule[]).filter(
    (module) => ROLE_PERMISSIONS[normalizedRole][module].includes("view")
  );
}

export function setAuthIntent(intent: PublicIntent): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PUBLIC_INTENT_KEY, intent);
}

export function getAuthIntent(): PublicIntent {
  if (typeof window === "undefined") return "viewer";
  const value = window.localStorage.getItem(PUBLIC_INTENT_KEY);
  if (value === "lead" || value === "worker_candidate" || value === "kunde") {
    return value;
  }
  return "viewer";
}

export function clearAuthIntent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PUBLIC_INTENT_KEY);
}
