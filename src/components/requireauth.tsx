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
    return <Navigate to="/log-pa" state={{ from: loc.pathname }} replace />;
  }

  return <>{children}</>;
}
