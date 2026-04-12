import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { userService, type UserProfile } from "../services/user.service";

export type DashboardRole = UserProfile["role"];

export function useProfile() {
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (sessionLoading) {
        return;
      }

      if (!session?.user) {
        if (!cancelled) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      const normalized = await userService.getProfileByAuthUser(
        session.user.id,
        session.user.email ?? null
      );

      if (!cancelled) {
        setProfile(normalized);
        setLoading(false);
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id, session?.user?.email, sessionLoading]);

  return { profile, loading };
}
