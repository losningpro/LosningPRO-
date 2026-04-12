import type { Role } from "../types";

export type AppRole =
  | Role
  | "guest";

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

const ROLE_ALIASES: Record<string, Role> = {
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
  viewer: "viewer",
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
