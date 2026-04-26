import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "../../integrations/supabase/client";

type GalleryRow = {
  id: string;
  title: string | null;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  comment: string | null;
  display_order: number | null;
  is_published: boolean | null;
};

type GalleryMeta = {
  carouselId: string;
  carouselTitle: string;
  showInGallery: boolean;
  showInProducts: boolean;
  showOnHome: boolean;
  visible: boolean;
};

type EditableItem = GalleryRow & {
  meta: GalleryMeta;
};

type CreateState = {
  title: string;
  description: string;
  imagePath: string;
  secondaryImagePath: string;
  displayOrder: string;
  isPublished: boolean;
  carouselId: string;
  carouselTitle: string;
  showInGallery: boolean;
  showInProducts: boolean;
  showOnHome: boolean;
  visible: boolean;
};

const EMPTY_CREATE_FORM: CreateState = {
  title: "",
  description: "",
  imagePath: "",
  secondaryImagePath: "",
  displayOrder: "0",
  isPublished: true,
  carouselId: "",
  carouselTitle: "",
  showInGallery: true,
  showInProducts: false,
  showOnHome: false,
  visible: true,
};

const DEFAULT_META: GalleryMeta = {
  carouselId: "generelt",
  carouselTitle: "Galleri",
  showInGallery: true,
  showInProducts: false,
  showOnHome: false,
  visible: true,
};

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "generelt"
  );
}

function normalizePublicPath(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function parseMeta(raw: string | null): GalleryMeta {
  if (!raw) return DEFAULT_META;

  try {
    const parsed = JSON.parse(raw) as Partial<GalleryMeta>;
    return {
      carouselId: parsed.carouselId?.trim() || DEFAULT_META.carouselId,
      carouselTitle: parsed.carouselTitle?.trim() || DEFAULT_META.carouselTitle,
      showInGallery: parsed.showInGallery ?? DEFAULT_META.showInGallery,
      showInProducts: parsed.showInProducts ?? DEFAULT_META.showInProducts,
      showOnHome: parsed.showOnHome ?? DEFAULT_META.showOnHome,
      visible: parsed.visible ?? DEFAULT_META.visible,
    };
  } catch {
    return DEFAULT_META;
  }
}

function stringifyMeta(meta: GalleryMeta) {
  return JSON.stringify({
    carouselId: slugify(meta.carouselId || meta.carouselTitle || DEFAULT_META.carouselId),
    carouselTitle: meta.carouselTitle.trim() || "Galleri",
    showInGallery: meta.showInGallery,
    showInProducts: meta.showInProducts,
    showOnHome: meta.showOnHome,
    visible: meta.visible,
  });
}

function buildEditableItem(row: GalleryRow): EditableItem {
  return {
    ...row,
    meta: parseMeta(row.comment),
  };
}

async function fetchGalleryRows(): Promise<EditableItem[]> {
  const { data, error } = await supabase
    .from("galleri")
    .select(
      "id, title, description, before_image_url, after_image_url, comment, display_order, is_published"
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => buildEditableItem(row as GalleryRow));
}

export default function KontoArbejdsgalleriPage() {
  const [items, setItems] = useState<EditableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreateState>(EMPTY_CREATE_FORM);

  async function loadItems() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGalleryRows();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke hente arbejdsgalleri.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  const carouselOptions = useMemo(() => {
    const map = new Map<string, string>();

    items.forEach((item) => {
      const id = item.meta.carouselId || "generelt";
      const title = item.meta.carouselTitle || "Galleri";
      map.set(id, title);
    });

    return Array.from(map.entries())
      .map(([id, title]) => ({ id, title }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [items]);

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setCreating(true);
      setError(null);

      const carouselTitle = createForm.carouselTitle.trim() || "Galleri";
      const carouselId = slugify(createForm.carouselId || carouselTitle);

      const payload = {
        title: createForm.title.trim() || null,
        description: createForm.description.trim() || null,
        before_image_url: normalizePublicPath(createForm.imagePath) || null,
        after_image_url: normalizePublicPath(createForm.secondaryImagePath) || null,
        display_order: Number(createForm.displayOrder) || 0,
        is_published: createForm.isPublished,
        comment: stringifyMeta({
          carouselId,
          carouselTitle,
          showInGallery: createForm.showInGallery,
          showInProducts: createForm.showInProducts,
          showOnHome: createForm.showOnHome,
          visible: createForm.visible,
        }),
      };

      const { error } = await supabase.from("galleri").insert(payload);
      if (error) throw error;

      setCreateForm(EMPTY_CREATE_FORM);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke oprette galleri-element.");
    } finally {
      setCreating(false);
    }
  }

  async function saveItem(item: EditableItem) {
    try {
      setSavingId(item.id);
      setError(null);

      const payload = {
        title: item.title?.trim() || null,
        description: item.description?.trim() || null,
        before_image_url: normalizePublicPath(item.before_image_url || "") || null,
        after_image_url: normalizePublicPath(item.after_image_url || "") || null,
        display_order: Number(item.display_order) || 0,
        is_published: !!item.is_published,
        comment: stringifyMeta({
          carouselId: slugify(item.meta.carouselId || item.meta.carouselTitle),
          carouselTitle: item.meta.carouselTitle.trim() || "Galleri",
          showInGallery: item.meta.showInGallery,
          showInProducts: item.meta.showInProducts,
          showOnHome: item.meta.showOnHome,
          visible: item.meta.visible,
        }),
      };

      const { error } = await supabase.from("galleri").update(payload).eq("id", item.id);
      if (error) throw error;

      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke gemme element.");
    } finally {
      setSavingId(null);
    }
  }

  async function deleteItem(id: string) {
    const ok = window.confirm("Vil du slette dette galleri-element?");
    if (!ok) return;

    try {
      setDeletingId(id);
      setError(null);

      const { error } = await supabase.from("galleri").delete().eq("id", id);
      if (error) throw error;

      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke slette element.");
    } finally {
      setDeletingId(null);
    }
  }

  function updateLocalItem(id: string, patch: Partial<EditableItem>) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }

  function updateLocalMeta(id: string, patch: Partial<GalleryMeta>) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              meta: {
                ...item.meta,
                ...patch,
              },
            }
          : item
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Arbejdsgalleri
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Styr hvilke billeder fra public-mappen der vises på den offentlige side,
            i produkter og i andre sektioner.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Brug stier som <span className="font-mono">/gallery/foto-01.webp</span>.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Nyt element</h2>
              <p className="mt-1 text-sm text-slate-600">
                Opret et nyt element og placer det i en tematisk carousel.
              </p>
            </div>
          </div>

          <form onSubmit={createItem} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <input
              value={createForm.title}
              onChange={(e) => setCreateForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Titel"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              value={createForm.description}
              onChange={(e) =>
                setCreateForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Beskrivelse"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              value={createForm.imagePath}
              onChange={(e) => setCreateForm((p) => ({ ...p, imagePath: e.target.value }))}
              placeholder="Primært billede, fx /gallery/bad-01.webp"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
              required
            />

            <input
              value={createForm.secondaryImagePath}
              onChange={(e) =>
                setCreateForm((p) => ({ ...p, secondaryImagePath: e.target.value }))
              }
              placeholder="Sekundært billede, valgfrit"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              value={createForm.carouselTitle}
              onChange={(e) =>
                setCreateForm((p) => ({
                  ...p,
                  carouselTitle: e.target.value,
                  carouselId: slugify(e.target.value),
                }))
              }
              placeholder="Carousel-titel, fx Badeværelser"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
              required
            />

            <div className="grid grid-cols-[1fr_140px] gap-3">
              <input
                value={createForm.carouselId}
                onChange={(e) =>
                  setCreateForm((p) => ({ ...p, carouselId: slugify(e.target.value) }))
                }
                placeholder="carousel-id"
                className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
              />
              <input
                type="number"
                value={createForm.displayOrder}
                onChange={(e) =>
                  setCreateForm((p) => ({ ...p, displayOrder: e.target.value }))
                }
                placeholder="Orden"
                className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={createForm.isPublished}
                onChange={(e) =>
                  setCreateForm((p) => ({ ...p, isPublished: e.target.checked }))
                }
              />
              Publiceret i dashboard-data
            </label>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:col-span-2">
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={createForm.visible}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, visible: e.target.checked }))
                  }
                />
                Synlig
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={createForm.showInGallery}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, showInGallery: e.target.checked }))
                  }
                />
                Arbejdsgalleri
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={createForm.showInProducts}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, showInProducts: e.target.checked }))
                  }
                />
                Produkter
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={createForm.showOnHome}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, showOnHome: e.target.checked }))
                  }
                />
                Forside
              </label>
            </div>

            {carouselOptions.length > 0 ? (
              <div className="lg:col-span-2">
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Eksisterende carouseller
                </div>
                <div className="flex flex-wrap gap-2">
                  {carouselOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setCreateForm((p) => ({
                          ...p,
                          carouselId: option.id,
                          carouselTitle: option.title,
                        }))
                      }
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {option.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={creating}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {creating ? "Opretter..." : "Opret element"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Eksisterende elementer</h2>
            <p className="mt-1 text-sm text-slate-600">
              Gem ændringer direkte pr. element. Carrusel-titel og synlighed styrer den
              offentlige arbejdsgalleri-side.
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Henter galleri...
            </div>
          ) : null}

          {!loading && items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Ingen galleri-elementer endnu.
            </div>
          ) : null}

          <div className="space-y-5">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[180px_180px_1fr]">
                  <div className="overflow-hidden rounded-2xl bg-slate-200">
                    {item.before_image_url ? (
                      <img
                        src={item.before_image_url}
                        alt={item.title || "Primært billede"}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center text-xs text-slate-500">
                        Intet billede
                      </div>
                    )}
                  </div>

                  <div className="overflow-hidden rounded-2xl bg-slate-200">
                    {item.after_image_url ? (
                      <img
                        src={item.after_image_url}
                        alt={item.title || "Sekundært billede"}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center text-xs text-slate-500">
                        Intet sekundært billede
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <input
                      value={item.title || ""}
                      onChange={(e) => updateLocalItem(item.id, { title: e.target.value })}
                      placeholder="Titel"
                      className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                    />

                    <input
                      value={item.description || ""}
                      onChange={(e) =>
                        updateLocalItem(item.id, { description: e.target.value })
                      }
                      placeholder="Beskrivelse"
                      className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                    />

                    <input
                      value={item.before_image_url || ""}
                      onChange={(e) =>
                        updateLocalItem(item.id, { before_image_url: e.target.value })
                      }
                      placeholder="/gallery/fil.webp"
                      className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                    />

                    <input
                      value={item.after_image_url || ""}
                      onChange={(e) =>
                        updateLocalItem(item.id, { after_image_url: e.target.value })
                      }
                      placeholder="/gallery/fil-2.webp"
                      className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                    />

                    <input
                      value={item.meta.carouselTitle}
                      onChange={(e) =>
                        updateLocalMeta(item.id, {
                          carouselTitle: e.target.value,
                          carouselId: slugify(e.target.value),
                        })
                      }
                      placeholder="Carousel-titel"
                      className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                    />

                    <div className="grid grid-cols-[1fr_110px] gap-3">
                      <input
                        value={item.meta.carouselId}
                        onChange={(e) =>
                          updateLocalMeta(item.id, {
                            carouselId: slugify(e.target.value),
                          })
                        }
                        placeholder="carousel-id"
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                      />

                      <input
                        type="number"
                        value={String(item.display_order ?? 0)}
                        onChange={(e) =>
                          updateLocalItem(item.id, {
                            display_order: Number(e.target.value) || 0,
                          })
                        }
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:col-span-2 md:grid-cols-4">
                      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                        <input
                          type="checkbox"
                          checked={!!item.is_published}
                          onChange={(e) =>
                            updateLocalItem(item.id, { is_published: e.target.checked })
                          }
                        />
                        Publiceret
                      </label>

                      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                        <input
                          type="checkbox"
                          checked={item.meta.visible}
                          onChange={(e) =>
                            updateLocalMeta(item.id, { visible: e.target.checked })
                          }
                        />
                        Synlig
                      </label>

                      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                        <input
                          type="checkbox"
                          checked={item.meta.showInGallery}
                          onChange={(e) =>
                            updateLocalMeta(item.id, { showInGallery: e.target.checked })
                          }
                        />
                        Arbejdsgalleri
                      </label>

                      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                        <input
                          type="checkbox"
                          checked={item.meta.showInProducts}
                          onChange={(e) =>
                            updateLocalMeta(item.id, { showInProducts: e.target.checked })
                          }
                        />
                        Produkter
                      </label>
                    </div>

                    <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm lg:col-span-2">
                      <input
                        type="checkbox"
                        checked={item.meta.showOnHome}
                        onChange={(e) =>
                          updateLocalMeta(item.id, { showOnHome: e.target.checked })
                        }
                      />
                      Vis også på forside
                    </label>

                    <div className="flex flex-wrap gap-3 lg:col-span-2">
                      <button
                        type="button"
                        onClick={() => void saveItem(item)}
                        disabled={savingId === item.id}
                        className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                      >
                        {savingId === item.id ? "Gemmer..." : "Gem ændringer"}
                      </button>

                      <button
                        type="button"
                        onClick={() => void deleteItem(item.id)}
                        disabled={deletingId === item.id}
                        className="rounded-2xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-700 disabled:opacity-60"
                      >
                        {deletingId === item.id ? "Sletter..." : "Slet"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
