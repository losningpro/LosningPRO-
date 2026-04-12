import { useMemo } from "react";
import { useProfile } from "./useProfile";
import {
  canAccessProfile,
  listAllowedModulesForProfile,
  normalizeRoleFromProfile,
  type AppAction,
  type AppModule,
} from "../modules/access-control";

export function useAuthorization() {
  const { profile, loading } = useProfile();

  const normalizedRole = normalizeRoleFromProfile(profile);
  const tenantId = profile?.tenant_id ?? null;
  const isPlatformAdmin = profile?.is_platform_admin ?? false;

  return useMemo(() => {
    return {
      loading,
      profile,
      role: normalizedRole,
      tenantId,
      isPlatformAdmin,
      can: (module: AppModule, action: AppAction) =>
        canAccessProfile(profile, module, action),
      allowedModules: listAllowedModulesForProfile(profile),
    };
  }, [loading, profile, normalizedRole, tenantId, isPlatformAdmin]);
}
