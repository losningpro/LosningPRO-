import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "../hooks/useSession";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();
  const loc = useLocation();

  if (loading) {
    return <div className="p-6">Indlæser…</div>;
  }

  if (!session) {
    const redirectTo = encodeURIComponent(loc.pathname + loc.search);
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  return <>{children}</>;
}

export default RequireAuth;
