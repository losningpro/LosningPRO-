import type { UserRole } from "../types/domain";

export const ROLES = {
  MASTER_ADMIN: "master_admin",
  TENANT_ADMIN: "tenant_admin",
  STAFF: "staff",
  VIEWER: "viewer",
} as const satisfies Record<string, UserRole>;

export const MODULE_ACCESS = {
  products: [ROLES.MASTER_ADMIN, ROLES.TENANT_ADMIN],
  orders: [ROLES.MASTER_ADMIN, ROLES.TENANT_ADMIN, ROLES.STAFF],
  users: [ROLES.MASTER_ADMIN, ROLES.TENANT_ADMIN],
  finances: [ROLES.MASTER_ADMIN, ROLES.TENANT_ADMIN],
  settings: [ROLES.MASTER_ADMIN, ROLES.TENANT_ADMIN],
  docs: [ROLES.MASTER_ADMIN, ROLES.TENANT_ADMIN, ROLES.STAFF, ROLES.VIEWER],
} as const;

export function hasModuleAccess(
  role: UserRole | null | undefined,
  moduleName: keyof typeof MODULE_ACCESS
) {
  if (!role) return false;
  return MODULE_ACCESS[moduleName].includes(role);
}

export function dashboardHomeForRole(role: UserRole | null | undefined) {
  if (!role) return "/login";
  return "/konto";
}
