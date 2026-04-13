import type { ProfileRow } from "../hooks/useProfile";

export type DashboardRole =
  | "master"
  | "tenant"
  | "medarbejder"
  | "samarbejder"
  | "partner"
  | "kunde";

export type AppRole = DashboardRole | "guest";

export type AppModule =
  | "oversigt"
  | "kalender"
  | "orders"
  | "products"
  | "lager"
  | "arbejdsgalleri"
  | "users"
  | "tenants"
  | "subscriptions"
  | "finances"
  | "docs"
  | "settings";

export type AppAction = "read" | "create" | "update" | "delete" | "manage";

export type PublicIntent =
  | "viewer"
  | "lead"
  | "worker_candidate"
  | "kunde";

type ProfileLike = {
  email?: string | null;
  role?: string | null;
  is_platform_admin?: boolean | null;
};

const PUBLIC_INTENT_KEY = "losningpro_auth_intent";

const ROLE_ALIASES: Record<string, DashboardRole> = {
  master: "master",
  master_admin: "master",
  admin: "master",
  tenant: "tenant",
  tenant_admin: "tenant",
  medarbejder: "medarbejder",
  staff: "medarbejder",
  employee: "medarbejder",
  samarbejder: "samarbejder",
  partner: "partner",
  kunde: "kunde",
};

const MODULE_ACCESS: Record<DashboardRole, AppModule[]> = {
  master: [
    "oversigt",
    "kalender",
    "orders",
    "products",
    "lager",
    "arbejdsgalleri",
    "users",
    "tenants",
    "subscriptions",
    "finances",
    "docs",
    "settings",
  ],
  tenant: [
    "oversigt",
    "kalender",
    "orders",
    "products",
    "lager",
    "arbejdsgalleri",
    "users",
    "finances",
    "docs",
    "settings",
  ],
  medarbejder: [
    "oversigt",
    "kalender",
    "products",
    "lager",
    "docs",
    "settings",
  ],
  samarbejder: [
    "oversigt",
    "kalender",
    "products",
    "lager",
    "docs",
    "settings",
  ],
  partner: [
    "oversigt",
    "kalender",
    "products",
    "lager",
    "docs",
    "settings",
  ],
  kunde: [
    "oversigt",
    "kalender",
    "orders",
    "settings",
  ],
};

export function normalizeDashboardRole(profile: ProfileLike | null | undefined): AppRole {
  const email = String(profile?.email ?? "").trim().toLowerCase();
  const role = String(profile?.role ?? "").trim().toLowerCase();
  const isAdmin = profile?.is_platform_admin === true;

  if (isAdmin || role === "master" || role === "master_admin" || email === "info@losningpro.dk") {
    return "master";
  }

  if (role in ROLE_ALIASES) {
    return ROLE_ALIASES[role];
  }

  return "guest";
}

export function normalizeRoleFromProfile(profile: ProfileLike | null | undefined): AppRole {
  return normalizeDashboardRole(profile);
}

export function listAllowedModulesForProfile(profile: ProfileLike | null | undefined): AppModule[] {
  const role = normalizeDashboardRole(profile);
  if (role === "guest") return [];
  return MODULE_ACCESS[role];
}

export function canAccessProfile(
  profile: ProfileLike | null | undefined,
  module: AppModule,
  action: AppAction,
): boolean {
  const allowed = listAllowedModulesForProfile(profile);
  if (!allowed.includes(module)) return false;

  const role = normalizeDashboardRole(profile);
  if (role === "guest") return false;
  if (role === "master") return true;

  if (action === "manage") {
    return role === "tenant";
  }

  if (module === "users" || module === "finances") {
    return role === "tenant";
  }

  return true;
}

export function setAuthIntent(intent: PublicIntent): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PUBLIC_INTENT_KEY, intent);
}

export function getAuthIntent(): PublicIntent {
  if (typeof window === "undefined") return "viewer";
  const value = window.localStorage.getItem(PUBLIC_INTENT_KEY);

  if (
    value === "lead" ||
    value === "worker_candidate" ||
    value === "kunde"
  ) {
    return value;
  }

  return "viewer";
}

export function clearAuthIntent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PUBLIC_INTENT_KEY);
}

export function isDashboardRole(value: string | null | undefined): value is DashboardRole {
  return value === "master" ||
    value === "tenant" ||
    value === "medarbejder" ||
    value === "samarbejder" ||
    value === "partner" ||
    value === "kunde";
}

export function profileToDashboardRole(profile: ProfileRow | null | undefined): DashboardRole | null {
  const role = normalizeDashboardRole(profile);
  return role === "guest" ? null : role;
}
