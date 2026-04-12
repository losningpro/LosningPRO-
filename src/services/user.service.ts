import type { Role, User, UserProfile } from "../types";
import { SupabaseDomainService } from "./base.service";
import { normalizeRoleFromProfile } from "../modules/access-control";

type RawUserRow = Record<string, unknown>;

const userDomainService = new SupabaseDomainService<RawUserRow>("user", false);

function toDashboardRole(row: RawUserRow | null, email?: string | null): Role {
  const normalized = normalizeRoleFromProfile({
    email: email ?? (row?.email ? String(row.email) : null),
    role: row?.role ? String(row.role) : null,
    is_platform_admin: row?.is_platform_admin === true || row?.is_master === true,
  });

  return normalized;
}

function normalizeUser(row: RawUserRow | null, email?: string | null): UserProfile {
  const normalizedEmail =
    email ??
    (typeof row?.email === "string" && row.email.trim() !== "" ? String(row.email) : null);

  const role = toDashboardRole(row, normalizedEmail);
  const isPlatformAdmin =
    row?.is_platform_admin === true ||
    row?.is_master === true ||
    role === "master_admin";

  const userId =
    typeof row?.id === "string"
      ? row.id
      : typeof row?.user_id === "string"
      ? row.user_id
      : "";

  const tenantId =
    typeof row?.tenant_id_uuid === "string"
      ? row.tenant_id_uuid
      : typeof row?.tenant_id === "string"
      ? row.tenant_id
      : null;

  const status = row?.status ? String(row.status) : "active";

  const baseUser: User = {
    id: userId,
    email: normalizedEmail,
    role,
    tenant_id: tenantId,
    status,
    is_platform_admin: isPlatformAdmin,
  };

  return {
    ...baseUser,
    user_id: userId,
    rawUserRow: row,
  };
}

export const userService = {
  async getProfileByAuthUser(authUserId: string, authEmail?: string | null): Promise<UserProfile> {
    const byAuthUserId = await userDomainService.list({
      limit: 1,
      filters: { auth_user_id: authUserId },
    });

    if (!byAuthUserId.error && byAuthUserId.data.length > 0) {
      return normalizeUser(byAuthUserId.data[0], authEmail ?? null);
    }

    if (authEmail) {
      const byEmail = await userDomainService.list({
        limit: 1,
        filters: { email: authEmail.toLowerCase() },
      });

      if (!byEmail.error && byEmail.data.length > 0) {
        return normalizeUser(byEmail.data[0], authEmail);
      }
    }

    return normalizeUser(
      {
        id: authUserId,
        email: authEmail ?? null,
        role: authEmail?.toLowerCase() === "info@losningpro.dk" ? "master_admin" : "viewer",
        is_platform_admin: authEmail?.toLowerCase() === "info@losningpro.dk",
        status: "active",
      },
      authEmail ?? null
    );
  },
};

export type { UserProfile };
