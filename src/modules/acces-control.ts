export type AppRole =
  | "master"
  | "tenant"
  | "medarbejder"
  | "samarbejder"
  | "partner"
  | "kunde"
  | "viewer"
  | "guest";

export type DashboardModule =
  | "overview"
  | "calendar"
  | "orders"
  | "gallery"
  | "products"
  | "users"
  | "tenant_settings"
  | "finance"
  | "leads";

type ProfileLike = {
  email?: string | null;
  role?: string | null;
  is_platform_admin?: boolean | null;
};

export function normalizeDashboardRole(profile: ProfileLike | null | undefined): AppRole {
  const email = String(profile?.email ?? "").trim().toLowerCase();
  const role = String(profile?.role ?? "").trim().toLowerCase();
  const isAdmin = profile?.is_platform_admin === true;

  if (isAdmin || role === "master" || email === "info@losningpro.dk") {
    return "master";
  }

  if (
    role === "tenant" ||
    role === "medarbejder" ||
    role === "samarbejder" ||
    role === "partner" ||
    role === "kunde" ||
    role === "viewer"
  ) {
    return role as AppRole;
  }

  return "guest";
}

export function getAllowedDashboardModules(role: AppRole): DashboardModule[] {
  switch (role) {
    case "master":
      return [
        "overview",
        "calendar",
        "orders",
        "gallery",
        "products",
        "users",
        "tenant_settings",
        "finance",
        "leads",
      ];

    case "tenant":
      return [
        "overview",
        "calendar",
        "orders",
        "gallery",
        "products",
        "users",
        "tenant_settings",
        "finance",
        "leads",
      ];

    case "medarbejder":
      return ["overview", "calendar", "orders"];

    case "samarbejder":
      return ["overview", "calendar"];

    case "partner":
      return ["overview", "orders", "leads"];

    case "kunde":
      return ["overview", "calendar", "orders"];

    case "viewer":
      return ["overview"];

    default:
      return [];
  }
}
