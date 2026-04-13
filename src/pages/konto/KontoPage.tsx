import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
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

import { supabase } from "../../lib/supabase";
import { useProfile } from "../../hooks/useProfile";
import { useSession } from "../../hooks/useSession";
import {
  normalizeDashboardRole,
  type DashboardRole,
} from "../../modules/access-control";

type ModuleKey =
  | "oversigt"
  | "kalender"
  | "leads"
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
const DEFAULT_TEMPLATES: Record<string, Record<string, unknown>> = {
  bookings: {
    product_slug: "",
    user_id: "",
    assigned_to: null,
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    status: "pending",
    notes: "",
  },
  orders: {
    tenant_id: "",
    user_id: "",
    status: "pending",
    total_amount: 0,
    post_address: "",
    post_code: "",
    land: "DK",
    slug: "",
  },
  products: {
    tenant_id: "",
    name: "",
    slug: "",
    category: "",
    subcategory: "",
    description: "",
    price_dkk: 0,
    stock: 0,
    active: true,
    is_active: true,
    product_type: "service",
    image_url_text: "",
  },
  galleri: {
    customer_id: "",
    image_url: "",
    display_order: 0,
    rating: 5,
    coment: "",
  },
  user: {
    auth_user_id: null,
    tenant_id: null,
    tenant_id_uuid: null,
    email: "",
    name: "",
    lastname: "",
    phone_number: "",
    role: "kunde",
    status: "active",
    is_platform_admin: false,
  },
  tenants: {
    email: "",
    name: "",
    lastname: "",
    company_name: "",
    post_address: "",
    post_code: "",
    city: "",
    land: "DK",
    phone_number: "",
    role: "tenant",
    status: "active",
    default_language: "da",
  },
  subscriptions_contracts: {
    tenant_id: "",
    plan_name: "",
    contract_type: "",
    status: "active",
    amount: 0,
    currency_code: "DKK",
    notes: "",
  },
  finance_entries: {
    tenant_id: "",
    title: "",
    amount: 0,
    entry_type: "expense",
    currency_code: "DKK",
    notes: "",
  },
  docs: {
    tenant_id: "",
    file_name: "",
    file_url: "",
    file_type: "",
    doc_type: "",
    is_public: false,
  },
  leads: {
    slug: "",
    tenant_id: null,
    source: "form",
    status: "new",
    priority: "normal",
    name: "",
    lastname: "",
    email: "",
    phone_number: "",
    city: "",
    coment: "",
    product: "",
    assigned_to: null,
    consent_accepted: false,
  },
};

function normalizePrimitive(value: unknown): unknown {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();

  if (trimmed === "") return null;
  if (trimmed === "null") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed;
}

function normalizePayload(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map(normalizePayload);
  }

  if (input && typeof input === "object") {
    const entries = Object.entries(input as Record<string, unknown>).map(([key, value]) => [
      key,
      normalizePayload(value),
    ]);

    return Object.fromEntries(entries);
  }

  return normalizePrimitive(input);
}

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
  key: "leads",
  label: "Leads / kontakt",
  path: "leads",
  table: "leads",
  icon: <ClipboardList className="h-4 w-4" />,
  roles: ["master", "tenant"],
  description: "Leads fra kontaktformular, opkald og andre kanaler.",
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
const HIDDEN_COLUMNS = new Set([
  "created_at",
  "updated_at",
  "deleted_at",
  "password",
]);

function getVisibleColumns(rows: GenericRow[]): string[] {
  if (!rows.length) return [];

  const set = new Set<string>();
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!HIDDEN_COLUMNS.has(key)) {
        set.add(key);
      }
    });
  });

  const preferredOrder = [
    "id",
    "email",
    "name",
    "title",
    "slug",
    "role",
    "status",
    "tenant_id",
    "tenant_id_uuid",
    "amount",
    "price_dkk",
  ];

  const cols = Array.from(set);

  cols.sort((a, b) => {
    const ia = preferredOrder.indexOf(a);
    const ib = preferredOrder.indexOf(b);

    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;

    return a.localeCompare(b);
  });

  return cols.slice(0, 10);
}

function rowMatchesQuery(row: GenericRow, query: string): boolean {
  if (!query.trim()) return true;

  const q = query.trim().toLowerCase();

  return Object.entries(row).some(([key, value]) => {
    if (HIDDEN_COLUMNS.has(key)) return false;
    return String(
      typeof value === "object" ? JSON.stringify(value) : value ?? "",
    )
      .toLowerCase()
      .includes(q);
  });
}

function sortRows(rows: GenericRow[]): GenericRow[] {
  return [...rows].sort((a, b) => {
    const aUpdated = String(a.updated_at ?? "");
    const bUpdated = String(b.updated_at ?? "");
    if (aUpdated && bUpdated && aUpdated !== bUpdated) {
      return bUpdated.localeCompare(aUpdated);
    }

    const aCreated = String(a.created_at ?? "");
    const bCreated = String(b.created_at ?? "");
    if (aCreated && bCreated && aCreated !== bCreated) {
      return bCreated.localeCompare(aCreated);
    }

    const aId = String(a.id ?? "");
    const bId = String(b.id ?? "");
    return aId.localeCompare(bId);
  });
}
const SYSTEM_FIELDS = new Set([
  "created_at",
  "updated_at",
  "deleted_at",
]);

function stripSystemFields(row: GenericRow): GenericRow {
  return Object.fromEntries(
    Object.entries(row).filter(([key]) => !SYSTEM_FIELDS.has(key)),
  );
}

function validatePayload(payload: GenericRow): string | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return "JSON skal være et objekt.";
  }

  const keys = Object.keys(payload);
  if (keys.length === 0) {
    return "JSON må ikke være tomt.";
  }

  return null;
}
function getBadgeClass(value: string): string {
  const normalized = value.trim().toLowerCase();

  if (
    normalized === "active" ||
    normalized === "confirmed" ||
    normalized === "completed" ||
    normalized === "paid" ||
    normalized === "master"
  ) {
    return "bg-green-100 text-green-800 border-green-200";
  }

  if (
    normalized === "pending" ||
    normalized === "draft" ||
    normalized === "tenant"
  ) {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }

  if (
    normalized === "cancelled" ||
    normalized === "failed" ||
    normalized === "inactive" ||
    normalized === "expired"
  ) {
    return "bg-red-100 text-red-800 border-red-200";
  }

  if (
    normalized === "medarbejder" ||
    normalized === "samarbejder" ||
    normalized === "partner" ||
    normalized === "kunde" ||
    normalized === "expense" ||
    normalized === "income"
  ) {
    return "bg-blue-100 text-blue-800 border-blue-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

function isBadgeColumn(column: string): boolean {
  return (
    column === "status" ||
    column === "role" ||
    column === "entry_type" ||
    column === "payment_status"
  );
}
const LONG_TEXT_FIELDS = new Set([
  "description",
  "notes",
  "comment",
  "coment",
  "body",
  "message",
  "other_specifications",
  "color_texture_material",
  "certificates",
]);

const SELECT_FIELD_OPTIONS: Record<string, string[]> = {
  status: [
    "pending",
    "active",
    "confirmed",
    "completed",
    "cancelled",
    "inactive",
    "draft",
    "expired",
    "paid",
    "failed",
  ],
  role: [
    "master",
    "tenant",
    "medarbejder",
    "samarbejder",
    "partner",
    "kunde",
  ],
  entry_type: [
    "expense",
    "income",
    "refund",
  ],
  product_type: [
    "service",
    "material",
  ],
  payment_status: [
    "pending",
    "paid",
    "failed",
    "refunded",
  ],
  default_language: [
    "da",
    "en",
    "de",
  ],
};

function getSelectOptionsForField(field: string): string[] | null {
  return SELECT_FIELD_OPTIONS[field] ?? null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function safeParseEditor(editor: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(editor) as unknown;
    return isPlainObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function stringifyEditorObject(value: Record<string, unknown>): string {
  return JSON.stringify(value, null, 2);
}

function hasBooleanActivationField(row: GenericRow): "is_active" | "active" | null {
  if (typeof row.is_active === "boolean") return "is_active";
  if (typeof row.active === "boolean") return "active";
  return null;
}

function hasStatusField(row: GenericRow): boolean {
  return typeof row.status === "string" || row.status === null;
}

async function copyTextToClipboard(value: string): Promise<void> {
  await navigator.clipboard.writeText(value);
}

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
      <SectionCard title="Kalender for aftaler" description="Bookinger, tider og status.">
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
const [notice, setNotice] = useState<string | null>(null);
const [editor, setEditor] = useState<string>("{}");
const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [autoRefresh, setAutoRefresh] = useState(false);
const [refreshSeconds, setRefreshSeconds] = useState(15);
const [realtimeEnabled, setRealtimeEnabled] = useState(true);

  useEffect(() => {
    setEditor(JSON.stringify(emptyTemplate ?? {}, null, 2));
  }, [table, emptyTemplate]);

  async function load() {
    if (!table) {
      setRows([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.from(table).select("*").limit(250);

    if (error) {
      setRows([]);
      setError(error.message);
      setLoading(false);
      return;
    }

    setRows(sortRows((data ?? []) as GenericRow[]));
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, [table]);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize, table]);

  useEffect(() => {
  if (!notice) return;

  const timer = window.setTimeout(() => {
    setNotice(null);
  }, 2500);

  return () => window.clearTimeout(timer);
}, [notice]);

  useEffect(() => {
  if (!autoRefresh || !table) return;

  const intervalMs = Math.max(5, refreshSeconds) * 1000;

  const timer = window.setInterval(() => {
    void load();
  }, intervalMs);

  useEffect(() => {
  if (!realtimeEnabled || !table) return;

  const channel = supabase
    .channel(`realtime-${table}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table,
      },
      () => {
        setNotice(`Live update i ${table}.`);
        void load();
      },
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}, [realtimeEnabled, table]);

  return () => window.clearInterval(timer);
}, [autoRefresh, refreshSeconds, table]);

  async function save() {
    if (!table) {
      setError("Ingen tabel er koblet til dette modul.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = normalizePayload(JSON.parse(editor)) as GenericRow;
      const validationError = validatePayload(payload);

      if (validationError) {
        throw new Error(validationError);
      }

      if (payload?.id) {
        const updatePayload = stripSystemFields(payload);
        const { error } = await supabase
          .from(table)
          .update(updatePayload)
          .eq("id", payload.id as string);

        if (error) throw error;
      } else {
        const insertPayload = stripSystemFields(payload);
        const { error } = await supabase.from(table).insert(insertPayload);
        if (error) throw error;
      }

      await load();
setEditor(JSON.stringify(emptyTemplate ?? {}, null, 2));
setNotice("Post gemt.");
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
setNotice("Post slettet.");
  }

  async function quickToggleActive(row: GenericRow) {
    if (!table) return;
    if (!row?.id || typeof row.id !== "string") return;

    const field = hasBooleanActivationField(row);
    if (!field) return;

    setError(null);

    const { error } = await supabase
      .from(table)
      .update({ [field]: !row[field] })
      .eq("id", row.id);

    if (error) {
      setError(error.message);
      return;
    }

    await load();
setNotice(row[field] ? "Post deaktiveret." : "Post aktiveret.");
  }

  async function quickSetStatus(row: GenericRow, status: string) {
    if (!table) return;
    if (!row?.id || typeof row.id !== "string") return;
    if (!hasStatusField(row)) return;

    setError(null);

    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq("id", row.id);

    if (error) {
      setError(error.message);
      return;
    }

    await load();
setNotice(`Status opdateret til ${status}.`);
  }

  function resetEditor() {
    setEditor(JSON.stringify(emptyTemplate ?? {}, null, 2));
    setError(null);
  }

  function duplicateCurrent() {
    try {
      const payload = normalizePayload(JSON.parse(editor)) as GenericRow;
      const cloned = { ...stripSystemFields(payload) };
      delete cloned.id;
      setEditor(JSON.stringify(cloned, null, 2));
      setError(null);
    } catch {
      setError("Kunne ikke duplikere, fordi JSON ikke er gyldig.");
    }
  }

  function updateEditorField(key: string, value: unknown) {
    const parsed = safeParseEditor(editor);
    if (!parsed) {
      setError("JSON-editoren er ugyldig. Ret JSON før felteditoren kan bruges.");
      return;
    }

    const next = { ...parsed, [key]: value };
    setEditor(stringifyEditorObject(next));
    setError(null);
  }

  const filteredRows = useMemo(() => {
    return rows.filter((row) => rowMatchesQuery(row, query));
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const columns = useMemo(() => {
    return getVisibleColumns(filteredRows.length ? filteredRows : rows);
  }, [filteredRows, rows]);

  const parsedEditor = useMemo(() => safeParseEditor(editor), [editor]);
  const editorKeys = useMemo(() => Object.keys(parsedEditor ?? {}), [parsedEditor]);

  return (
    <div className="space-y-6">
      <SectionCard title={title} description={description}>
           {notice ? (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {notice}
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
            onClick={resetEditor}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            Ny post
          </button>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søg i tabellen..."
            className="min-w-[240px] rounded-xl border border-slate-300 px-4 py-2 text-sm"
          />
          <select
            value={String(pageSize)}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            <option value="10">10 rækker</option>
            <option value="25">25 rækker</option>
            <option value="50">50 rækker</option>
            <option value="100">100 rækker</option>
          </select>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <div>
            Viser {paginatedRows.length} af {filteredRows.length} rækker
            {filteredRows.length !== rows.length ? ` (filtreret fra ${rows.length})` : ""}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-300 px-3 py-1.5 disabled:opacity-50"
            >
              Forrige
            </button>
            <span>
              Side {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-300 px-3 py-1.5 disabled:opacity-50"
            >
              Næste
            </button>
          </div>
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
                <th className="py-3 pr-4 text-left font-semibold text-slate-700">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={columns.length + 1}>
                    Indlæser...
                  </td>
                </tr>
              ) : paginatedRows.length === 0 ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={columns.length + 1}>
                    Ingen data matcher søgningen i tabellen {table}.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, idx) => {
                  const activationField = hasBooleanActivationField(row);
                  const currentStatus = String(row.status ?? "");
                  const rowId =
                    typeof row.id === "string"
                      ? row.id
                      : typeof row.id === "number"
                        ? String(row.id)
                        : "";

                  return (
                    <tr
                      key={rowId || idx}
                      className="border-b border-slate-100 align-top"
                    >
                      {columns.map((col) => (
                        <td key={col} className="max-w-[220px] py-3 pr-4 text-slate-700">
                          {isBadgeColumn(col) ? (
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getBadgeClass(
                                String(row[col] ?? ""),
                              )}`}
                            >
                              {String(row[col] ?? "") || "-"}
                            </span>
                          ) : (
                            <div className="line-clamp-3 break-words">
                              {typeof row[col] === "object"
                                ? JSON.stringify(row[col])
                                : String(row[col] ?? "")}
                            </div>
                          )}
                        </td>
                      ))}
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              setEditor(JSON.stringify(stripSystemFields(row), null, 2))
                            }
                            className="rounded-lg border border-slate-300 px-3 py-1.5"
                          >
                            Redigér
                          </button>

                          <button
                            onClick={duplicateCurrent}
                            className="rounded-lg border border-slate-300 px-3 py-1.5"
                          >
                            Duplicér
                          </button>

                          {rowId ? (
                           <button
                                onClick={() => {
                                 void copyTextToClipboard(rowId);
                                setNotice("ID kopieret.");
                                }}
                                className="rounded-lg border border-slate-300 px-3 py-1.5"
                          >
                            Kopiér ID
                          </button>
                      
                          ) : null}

                          {activationField ? (
                            <button
                              onClick={() => void quickToggleActive(row)}
                              className="rounded-lg border border-slate-300 px-3 py-1.5"
                            >
                              {row[activationField] ? "Deaktivér" : "Aktivér"}
                            </button>
                          ) : null}

                          {hasStatusField(row) ? (
                            <>
                              {currentStatus !== "pending" ? (
                                <button
                                  onClick={() => void quickSetStatus(row, "pending")}
                                  className="rounded-lg border border-slate-300 px-3 py-1.5"
                                >
                                  → pending
                                </button>
                              ) : null}
                              {currentStatus !== "active" ? (
                                <button
                                  onClick={() => void quickSetStatus(row, "active")}
                                  className="rounded-lg border border-slate-300 px-3 py-1.5"
                                >
                                  → active
                                </button>
                              ) : null}
                              {currentStatus !== "confirmed" ? (
                                <button
                                  onClick={() => void quickSetStatus(row, "confirmed")}
                                  className="rounded-lg border border-slate-300 px-3 py-1.5"
                                >
                                  → confirmed
                                </button>
                              ) : null}
                              {currentStatus !== "completed" ? (
                                <button
                                  onClick={() => void quickSetStatus(row, "completed")}
                                  className="rounded-lg border border-slate-300 px-3 py-1.5"
                                >
                                  → completed
                                </button>
                              ) : null}
                              {currentStatus !== "cancelled" ? (
                                <button
                                  onClick={() => void quickSetStatus(row, "cancelled")}
                                  className="rounded-lg border border-slate-300 px-3 py-1.5"
                                >
                                  → cancelled
                                </button>
                              ) : null}
                            </>
                          ) : null}

                          <button
                            onClick={() => void removeRow(row)}
                            className="rounded-lg border border-red-300 px-3 py-1.5 text-red-700"
                          >
                            Slet
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="Felteditor"
        description="Hurtig redigering af det aktuelle JSON-objekt."
      >
        {!parsedEditor ? (
          <div className="text-sm text-red-700">
            JSON er ugyldig. Ret JSON-editoren for at bruge felteditoren.
          </div>
        ) : editorKeys.length === 0 ? (
          <div className="text-sm text-slate-500">
            Ingen felter endnu. Brug “Ny post” eller redigér JSON direkte.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {editorKeys.map((key) => {
            const value = parsedEditor[key];
            const selectOptions = getSelectOptionsForField(key);

              if (selectOptions) {
                return (
                  <label key={key} className="block">
                    <div className="mb-1 text-sm font-medium text-slate-700">{key}</div>
                    <select
                      value={String(value ?? "")}
                      onChange={(e) => updateEditorField(key, e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm"
                    >
                    <option value="">Vælg...</option>
                    {selectOptions.map((option) => (
                    <option key={option} value={option}>
                    {option}
                  </option>
                 ))}
                  </select>
                </label>
                );
              }

              if (typeof value === "boolean") {
                return (
                  <label key={key} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateEditorField(key, e.target.checked)}
                    />
                    <span className="text-sm font-medium text-slate-700">{key}</span>
                  </label>
                );
              }

              if (typeof value === "number") {
                return (
                  <label key={key} className="block">
                    <div className="mb-1 text-sm font-medium text-slate-700">{key}</div>
                    <input
                      type="number"
                      value={String(value)}
                      onChange={(e) => updateEditorField(key, e.target.value === "" ? null : Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm"
                    />
                  </label>
                );
              }

              if (LONG_TEXT_FIELDS.has(key)) {
                return (
                  <label key={key} className="block md:col-span-2">
                    <div className="mb-1 text-sm font-medium text-slate-700">{key}</div>
                    <textarea
                      value={String(value ?? "")}
                      onChange={(e) => updateEditorField(key, e.target.value)}
                      className="min-h-[120px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                    />
                  </label>
                );
              }

              if (isPlainObject(value) || Array.isArray(value)) {
                return (
                  <label key={key} className="block md:col-span-2">
                    <div className="mb-1 text-sm font-medium text-slate-700">{key}</div>
                    <textarea
                      value={JSON.stringify(value, null, 2)}
                      onChange={(e) => {
                        try {
                          updateEditorField(key, JSON.parse(e.target.value));
                        } catch {
                          setError(`Feltet "${key}" skal være gyldig JSON.`);
                        }
                      }}
                      className="min-h-[120px] w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm"
                    />
                  </label>
                );
              }

              return (
                <label key={key} className="block">
                  <div className="mb-1 text-sm font-medium text-slate-700">{key}</div>
                  <input
                    type="text"
                    value={String(value ?? "")}
                    onChange={(e) => updateEditorField(key, e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm"
                  />
                </label>
              );
            })}
          </div>
        )}
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
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => void save()}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm text-white disabled:opacity-60"
          >
            {saving ? "Gemmer..." : "Gem post"}
          </button>
          <button
            onClick={resetEditor}
            type="button"
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm"
          >
            Reset
          </button>
          <button
            onClick={duplicateCurrent}
            type="button"
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm"
          >
            Duplicér aktuel
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
      emptyTemplate={DEFAULT_TEMPLATES[module.table] ?? {}}
    />
  );
}

export default function Konto() {
  const nav = useNavigate();
  const { session, loading: sessionLoading } = useSession();
  const { profile, loading: profileLoading } = useProfile();

  const normalizedRole = normalizeDashboardRole({
    email: session?.user?.email ?? profile?.email ?? null,
    role: profile?.role ?? null,
    is_platform_admin: profile?.is_platform_admin ?? null,
  });

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

  if (normalizedRole === "guest") {
    return (
      <div className="p-6">
        <SectionCard
          title="Ingen gyldig dashboard-rolle"
          description="Din bruger er logget ind, men profilen matcher ikke en gyldig rolle i public.user."
        >
          <div className="space-y-4 text-sm text-slate-700">
            <p>
              Kontrollér at tabellen <code>user</code> indeholder korrekt email, rolle og eventuelt
              <code> auth_user_id</code> for denne konto.
            </p>
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

  const role: DashboardRole = normalizedRole;
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
