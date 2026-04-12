export type DashboardRole =
  | "master"
  | "tenant"
  | "medarbejder"
  | "samarbejder"
  | "partner"
  | "kunde";

export type PublicIntent = "viewer" | "lead" | "worker_candidate" | "kunde";

type ProfileLike = {
  email?: string | null;
  role?: string | null;
  is_platform_admin?: boolean | null;
};

const PUBLIC_INTENT_KEY = "losningpro_auth_intent";

const VALID_DASHBOARD_ROLES: DashboardRole[] = [
  "master",
  "tenant",
  "medarbejder",
  "samarbejder",
  "partner",
  "kunde",
];

const VALID_PUBLIC_INTENTS: PublicIntent[] = [
  "viewer",
  "lead",
  "worker_candidate",
  "kunde",
];

export function isDashboardRole(value: string | null | undefined): value is DashboardRole {
  return VALID_DASHBOARD_ROLES.includes((value ?? "") as DashboardRole);
}

export function normalizeDashboardRole(
  profile: ProfileLike | null | undefined
): DashboardRole {
  const email = String(profile?.email ?? "").trim().toLowerCase();
  const role = String(profile?.role ?? "").trim().toLowerCase();
  const isAdmin = profile?.is_platform_admin === true;

  if (isAdmin || role === "master" || email === "info@losningpro.dk") {
    return "master";
  }

  if (isDashboardRole(role)) {
    return role;
  }

  return "kunde";
}

export function canAccessModule(
  role: DashboardRole,
  allowedRoles: DashboardRole[]
): boolean {
  return allowedRoles.includes(role);
}

export function setAuthIntent(intent: PublicIntent): void {
  if (typeof window === "undefined") return;
  if (!VALID_PUBLIC_INTENTS.includes(intent)) return;
  window.localStorage.setItem(PUBLIC_INTENT_KEY, intent);
}

export function getAuthIntent(): PublicIntent {
  if (typeof window === "undefined") return "viewer";

  const value = window.localStorage.getItem(PUBLIC_INTENT_KEY);
  if (VALID_PUBLIC_INTENTS.includes((value ?? "") as PublicIntent)) {
    return value as PublicIntent;
  }

  return "viewer";
}

export function clearAuthIntent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PUBLIC_INTENT_KEY);
}
