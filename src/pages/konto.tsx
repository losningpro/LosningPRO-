import React, { useEffect, useMemo, useState } from "react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  Boxes,
  Image,
  Users,
  Building2,
  FileText,
  Settings,
  Wallet,
  PackageSearch,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import { useProfile, type DashboardRole } from "../hooks/useProfile";
import { useSession } from "../hooks/useSession";
import { normalizeDashboardRole } from "../modules/access-control";

type ModuleKey =
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

type ModuleConfig = {
  key: ModuleKey;
  label: string;
  path: string;
  table?: string;
  icon: React.ReactNode;
  roles: DashboardRole[];
  description: string;
};

type GenericRow = Record<string, unknown>;

type BookingRow = {
  id: string;
  start_time: string | null;
  end_time: string | null;
  status: string | null;
  product_slug?: string | null;
  user_id?: string | null;
  assigned_to?: string | null;
};

const ALL_ROLES: DashboardRole[] = [
  "master",
  "tenant",
  "medarbejder",
  "samarbejder",
  "partner",
  "kunde",
];

const MODULES: ModuleConfig[] = [
  {
    key: "oversigt",
    label: "Oversigt",
    path: "",
    icon: <LayoutDashboard className="h-4 w-4" />,
    roles: ALL_ROLES,
    description: "Samlet overblik over din konto og dine data.",
  },
  {
    key: "kalender",
    label: "Kalender for aftaler",
    path: "kalender",
    table: "bookings",
    icon: <CalendarDays className="h-4 w-4" />,
    roles: ALL_ROLES,
    description: "Bookinger, tider og status.",
  },
  {
    key: "orders",
    label: "Ordrer",
    path: "orders",
    table: "orders",
    icon: <ClipboardList className="h-4 w-4" />,
    roles: ["master", "tenant", "kunde"],
    description: "Ordrer og ordrestatus.",
  },
  {
    key: "products",
    label: "Produkter",
    path: "products",
    table: "products",
    icon: <Boxes className="h-4 w-4" />,
    roles: ["master", "tenant", "medarbejder", "samarbejder", "partner"],
    description: "Redigering og synlighed af produkter og tjenester.",
  },
  {
    key: "lager",
    label: "Lager / marketplace",
    path: "lager",
    table: "products",
    icon: <PackageSearch className="h-4 w-4" />,
    roles: ["master", "tenant", "medarbejder", "samarbejder", "partner"],
    description: "Hvilke produkter vises i markedet og kampagner.",
  },
  {
    key: "arbejdsgalleri",
    label: "Arbejdsgalleri",
    path: "arbejdsgalleri",
    table: "galleri",
    icon: <Image className="h-4 w-4" />,
    roles: ["master", "tenant"],
    description: "Galleri med udført arbejde og billeder.",
  },
  {
    key: "users",
    label: "Brugerrettigheder",
    path: "users",
    table: "user",
    icon: <Users className="h-4 w-4" />,
    roles: ["master", "tenant"],
    description: "Brugere, roller og adgang.",
  },
  {
    key: "tenants",
    label: "Tenant sites",
    path: "tenants",
    table: "tenants",
    icon: <Building2 className="h-4 w-4" />,
    roles: ["master"],
    description: "Tenant-konfiguration og redigerbare webdata.",
  },
  {
    key: "subscriptions",
    label: "Abonnementer og kontrakter",
    path: "subscriptions",
    table: "subscriptions_contracts",
    icon: <FileText className="h-4 w-4" />,
    roles: ["master"],
    description: "Abonnementer, kontrakter og vilkår.",
  },
  {
    key: "finances",
    label: "+/- Økonomi",
    path: "finances",
    table: "finance_entries",
    icon: <Wallet className="h-4 w-4" />,
    roles: ["master", "tenant"],
    description: "Indtægter, udgifter og notater.",
  },
  {
    key: "docs",
    label: "Dokumenter",
    path: "docs",
    table: "docs",
    icon: <FileText className="h-4 w-4" />,
    roles: ["master", "tenant", "medarbejder", "samarbejder", "partner"],
    description: "Interne dokumenter og filer.",
  },
  {
    key: "settings",
    label: "Andre indstillinger",
    path: "settings",
    icon: <Settings className="h-4 w-4" />,
    roles: ALL_ROLES,
    description: "Profil, session og systemindstillinger.",
  },
];

function DashboardShell({
  children,
  role,
  email,
  onLogout,
}: {
  children: React.ReactNode;
  role: DashboardRole;
  email: string;
  onLogout: () => Promise<void>;
}) {
  const visibleModules = MODULES.filter((m) => m.roles.includes(role));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="bg-slate-900 p-4 text-white lg:p-6">
          <div className="mb-8">
            <div className="text-xl font-bold">LøsningPRO</div>
            <div className="mt-1 text-sm text-slate-300">Dashboard</div>
            <div className="mt-3 break-all text-xs text-slate-400">{email}</div>
            <div className="mt-3 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide">
              Rolle: {role}
            </div>
          </div>

          <nav className="space-y-2">
            {visibleModules.map((module) => {
              const to = module.path ? `/konto/${module.path}` : "/konto";
              return (
                <NavLink
                  key={module.key}
                  to={to}
                  end={module.path === ""}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                      isActive
                        ? "bg-white font-semibold text-slate-900"
                        : "text-slate-200 hover:bg-slate-800"
                    }`
                  }
                >
                  {module.icon}
                  <span>{module.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <button
              onClick={() => void onLogout()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-sm hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4" />
              Log ud
            </button>
          </div>
        </aside>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function OverviewPage({ role }: { role: DashboardRole }) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Oversigt"
        description="Dette dashboard samler dine moduler i én sikker backoffice-løsning."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatBox label="Aktiv rolle" value={role} />
          <StatBox
            label="Dashboard-moduler"
            value={MODULES.filter((m) => m.roles.includes(role)).length}
          />
          <StatBox label="Status" value="Klar" />
          <StatBox label="Miljø" value="Vite + Supabase" />
        </div>
      </SectionCard>

      <SectionCard
        title="Systemlogik"
        description="De vigtigste sammenhænge i din nuværende arkitektur."
      >
        <ul className="space-y-3 text-sm text-slate-700">
          <li>• Kalender for aftaler læser og opdaterer data i tabellen bookings.</li>
          <li>• Ordrer bruger orders og kan senere udvides med order_items.</li>
          <li>• Produkter og Lager / marketplace er koblet til products.</li>
          <li>• Arbejdsgalleri er koblet til galleri.</li>
          <li>• Brugerrettigheder bruger user.</li>
          <li>• Tenant sites bruger tenants og kan senere udvides med tenant_sites.</li>
        </ul>
      </SectionCard>
    </div>
  );
}

function CalendarModule() {
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("bookings")
      .select("id,start_time,end_time,status,product_slug,user_id,assigned_to")
      .order("start_time", { ascending: true })
      .limit(100);

    if (error) {
      setRows([]);
      setError(error.message);
      setLoading(false);
      return;
    }

    setRows((data ?? []) as BookingRow[]);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    await load();
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="space-y-6">
      <SectionCard
        title="Kalender for aftaler"
        description="Bookinger, tider og status."
      >
        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mb-5">
          <button
            onClick={() => void load()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Opdater
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-sm text-slate-500">Indlæser...</div>
          ) : rows.length === 0 ? (
            <div className="text-sm text-slate-500">Ingen bookinger endnu.</div>
          ) : (
            rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 p-4 lg:grid-cols-[1.1fr_1fr_220px]"
              >
                <div>
                  <div className="font-semibold text-slate-900">
                    Booking #{row.id.slice(0, 8)}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Service: {row.product_slug || "Ikke angivet"}
                  </div>
                </div>

                <div className="text-sm text-slate-700">
                  <div>
                    <span className="font-medium">Start:</span>{" "}
                    {row.start_time ? new Date(row.start_time).toLocaleString() : "-"}
                  </div>
                  <div className="mt-1">
                    <span className="font-medium">Slut:</span>{" "}
                    {row.end_time ? new Date(row.end_time).toLocaleString() : "-"}
                  </div>
                </div>

                <div>
                  <select
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    value={row.status ?? "pending"}
                    onChange={(e) => void updateStatus(row.id, e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="rescheduled">rescheduled</option>
                    <option value="cancelled">cancelled</option>
                    <option value="completed">completed</option>
                    <option value="expired">expired</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}

function GenericTableModule({
  title,
  description,
  table,
  emptyTemplate,
}: {
  title: string;
  description: string;
  table: string;
  emptyTemplate?: Record<string, unknown>;
}) {
  const [rows, setRows] = useState<GenericRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editor, setEditor] = useState<string>(JSON.stringify(emptyTemplate ?? {}, null, 2));

  async function load() {
    if (!table) {
      setRows([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.from(table).select("*").limit(100);

    if (error) {
      setRows([]);
      setError(error.message);
      setLoading(false);
      return;
    }

    setRows((data ?? []) as GenericRow[]);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, [table]);

  async function save() {
    if (!table) {
      setError("Ingen tabel er koblet til dette modul.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = JSON.parse(editor) as GenericRow;

      if (payload?.id) {
        const { error } = await supabase.from(table).update(payload).eq("id", payload.id as string);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert(payload);
        if (error) throw error;
      }

      await load();
      setEditor(JSON.stringify(emptyTemplate ?? {}, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke gemme posten.");
    } finally {
      setSaving(false);
    }
  }

  async function removeRow(row: GenericRow) {
    if (!table) {
      setError("Ingen tabel er koblet til dette modul.");
      return;
    }

    if (!row?.id || typeof row.id !== "string") {
      setError("Kan ikke slette en post uden id.");
      return;
    }

    const ok = window.confirm("Vil du slette denne post?");
    if (!ok) return;

    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) {
      setError(error.message);
      return;
    }

    await load();
  }

  const columns = useMemo(() => {
    if (!rows.length) return [] as string[];
    const set = new Set<string>();
    rows.forEach((row) => Object.keys(row).forEach((key) => set.add(key)));
    return Array.from(set).slice(0, 8);
  }, [rows]);

  return (
    <div className="space-y-6">
      <SectionCard title={title} description={description}>
        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => void load()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Opdater
          </button>
          <button
            onClick={() => setEditor(JSON.stringify(emptyTemplate ?? {}, null, 2))}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            Ny post
          </button>
        </div>

        <div className="mt-5 overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {columns.map((col) => (
                  <th key={col} className="py-3 pr-4 text-left font-semibold text-slate-700">
                    {col}
                  </th>
                ))}
                <th className="py-3 pr-4 text-left font-semibold text-slate-700">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={columns.length + 1}>
                    Indlæser...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={columns.length + 1}>
                    Ingen data endnu i tabellen {table}.
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={(row.id as string | undefined) ?? idx}
                    className="border-b border-slate-100 align-top"
                  >
                    {columns.map((col) => (
                      <td key={col} className="max-w-[220px] py-3 pr-4 text-slate-700">
                        <div className="line-clamp-3 break-words">
                          {typeof row[col] === "object"
                            ? JSON.stringify(row[col])
                            : String(row[col] ?? "")}
                        </div>
                      </td>
                    ))}
                    <td className="py-3 pr-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setEditor(JSON.stringify(row, null, 2))}
                          className="rounded-lg border border-slate-300 px-3 py-1.5"
                        >
                          Redigér
                        </button>
                        <button
                          onClick={() => void removeRow(row)}
                          className="rounded-lg border border-red-300 px-3 py-1.5 text-red-700"
                        >
                          Slet
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="JSON-editor"
        description="Bruges til hurtig oprettelse og redigering uden at bryde den eksisterende arkitektur."
      >
        <textarea
          className="min-h-[320px] w-full rounded-xl border border-slate-300 p-4 font-mono text-sm"
          value={editor}
          onChange={(e) => setEditor(e.target.value)}
        />
        <div className="mt-4">
          <button
            onClick={() => void save()}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm text-white disabled:opacity-60"
          >
            {saving ? "Gemmer..." : "Gem post"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

function SettingsPage({
  email,
  role,
  onLogout,
}: {
  email: string;
  role: DashboardRole;
  onLogout: () => Promise<void>;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Andre indstillinger"
        description="Brugeroplysninger og hurtige handlinger."
      >
        <div className="space-y-3 text-sm text-slate-700">
          <div>
            <span className="font-semibold">Email:</span> {email}
          </div>
          <div>
            <span className="font-semibold">Rolle:</span> {role}
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={() => void onLogout()}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm text-white"
          >
            Log ud
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

function AccessDenied() {
  return (
    <SectionCard title="Ingen adgang" description="Denne side er ikke synlig for din rolle.">
      <div className="text-sm text-slate-600">
        Kontakt administratoren, hvis du mener, at dette er en fejl.
      </div>
    </SectionCard>
  );
}

function RoleProtectedModule({
  role,
  module,
  email,
  onLogout,
}: {
  role: DashboardRole;
  module: ModuleConfig;
  email: string;
  onLogout: () => Promise<void>;
}) {
  if (!module.roles.includes(role)) {
    return <AccessDenied />;
  }

  if (module.key === "oversigt") {
    return <OverviewPage role={role} />;
  }

  if (module.key === "kalender") {
    return <CalendarModule />;
  }

  if (module.key === "settings") {
    return <SettingsPage email={email} role={role} onLogout={onLogout} />;
  }

  const defaultTemplates: Record<string, Record<string, unknown>> = {
    bookings: {
      product_slug: "",
      user_id: "",
      assigned_to: null,
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      status: "pending",
    },
    orders: {
      status: "pending",
      notes: "",
    },
    products: {
      name: "",
      slug: "",
      description: "",
      price_dkk: 0,
      is_active: true,
      product_type: "service",
    },
    galleri: {
      title: "",
      description: "",
      before_image_url: "",
      after_image_url: "",
      comment: "",
      display_order: 0,
      is_published: false,
    },
    user: {
      email: "",
      role: "kunde",
      tenant_id_uuid: null,
      is_platform_admin: false,
      status: "active",
    },
    tenants: {
      name: "",
      company_name: "",
      status: "active",
      default_language: "da",
    },
    subscriptions_contracts: {
      plan_name: "",
      contract_type: "",
      currency_code: "DKK",
      notes: "",
    },
    finance_entries: {
      title: "",
      amount: 0,
      entry_type: "expense",
      currency_code: "DKK",
      notes: "",
    },
    docs: {
      file_name: "",
      file_url: "",
      file_type: "",
      doc_type: "",
      is_public: false,
    },
  };

  if (!module.table) {
    return (
      <SectionCard title={module.label} description={module.description}>
        <div className="text-sm text-slate-600">
          Dette modul har endnu ingen direkte tabelkobling.
        </div>
      </SectionCard>
    );
  }

  return (
    <GenericTableModule
      title={module.label}
      description={module.description}
      table={module.table}
      emptyTemplate={defaultTemplates[module.table] ?? {}}
    />
  );
}

export default function Konto() {
  const nav = useNavigate();
  const { session, loading: sessionLoading } = useSession();
  const { profile, loading: profileLoading } = useProfile();

  const role: DashboardRole = normalizeDashboardRole({
    email: session?.user?.email ?? profile?.email ?? null,
    role: profile?.role ?? null,
    is_platform_admin: profile?.is_platform_admin ?? null,
  }) as DashboardRole;

  const email = session?.user?.email ?? profile?.email ?? "";

  async function onLogout() {
    await supabase.auth.signOut();
    nav("/log-pa");
  }

  if (sessionLoading || profileLoading) {
    return <div className="p-6">Indlæser dashboard…</div>;
  }

  if (!session) {
    return <Navigate to="/log-pa" replace />;
  }

  const visibleModules = MODULES.filter((m) => m.roles.includes(role));

  return (
    <DashboardShell role={role} email={email} onLogout={onLogout}>
      <Routes>
        <Route index element={<OverviewPage role={role} />} />

        {MODULES.filter((m) => m.path).map((module) => (
          <Route
            key={module.key}
            path={module.path}
            element={
              <RoleProtectedModule
                role={role}
                module={module}
                email={email}
                onLogout={onLogout}
              />
            }
          />
        ))}

        <Route
          path="*"
          element={
            visibleModules.length > 0 ? (
              <Navigate
                to={visibleModules[0].path ? `/konto/${visibleModules[0].path}` : "/konto"}
                replace
              />
            ) : (
              <Navigate to="/konto" replace />
            )
          }
        />
      </Routes>
    </DashboardShell>
  );
}
