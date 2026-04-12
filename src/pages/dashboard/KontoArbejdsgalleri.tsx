import React, { FormEvent, useEffect, useState } from "react";
import {
  createGalleryItem,
  getAllGalleryItems,
  updateGalleryItem,
  GalleryItem,
} from "../../services/gallery.service";

type CreateState = {
  title: string;
  description: string;
  before_image_url: string;
  after_image_url: string;
  comment: string;
  display_order: string;
  is_published: boolean;
};

const initialCreateState: CreateState = {
  title: "",
  description: "",
  before_image_url: "",
  after_image_url: "",
  comment: "",
  display_order: "0",
  is_published: false,
};

export default function KontoArbejdsgalleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreateState>(initialCreateState);

  async function loadItems() {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllGalleryItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke hente galleri.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function togglePublished(item: GalleryItem) {
    try {
      setSavingId(item.id);
      await updateGalleryItem(item.id, { is_published: !item.is_published });
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke opdatere status.");
    } finally {
      setSavingId(null);
    }
  }

  async function saveOrder(item: GalleryItem, newValue: string) {
    try {
      setSavingId(item.id);
      await updateGalleryItem(item.id, { display_order: Number(newValue) || 0 });
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke gemme rækkefølge.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setCreating(true);
      setError(null);

      await createGalleryItem({
        title: createForm.title || null,
        description: createForm.description || null,
        before_image_url: createForm.before_image_url || null,
        after_image_url: createForm.after_image_url || null,
        comment: createForm.comment || null,
        display_order: Number(createForm.display_order) || 0,
        is_published: createForm.is_published,
      });

      setCreateForm(initialCreateState);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke oprette galleri-item.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Arbejdsgalleri
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Opret, publicér og sortér billeder til den offentlige galleri-side.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Nyt galleri-item</h2>

          <form className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleCreate}>
            <input
              value={createForm.title}
              onChange={(e) => setCreateForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Titel"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              value={createForm.display_order}
              onChange={(e) => setCreateForm((p) => ({ ...p, display_order: e.target.value }))}
              placeholder="Rækkefølge"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              value={createForm.before_image_url}
              onChange={(e) =>
                setCreateForm((p) => ({ ...p, before_image_url: e.target.value }))
              }
              placeholder="Before image URL"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm md:col-span-2"
            />

            <input
              value={createForm.after_image_url}
              onChange={(e) =>
                setCreateForm((p) => ({ ...p, after_image_url: e.target.value }))
              }
              placeholder="After image URL"
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm md:col-span-2"
            />

            <textarea
              value={createForm.description}
              onChange={(e) =>
                setCreateForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Beskrivelse"
              className="min-h-[110px] rounded-2xl border border-slate-300 px-4 py-3 text-sm md:col-span-2"
            />

            <textarea
              value={createForm.comment}
              onChange={(e) => setCreateForm((p) => ({ ...p, comment: e.target.value }))}
              placeholder="Kommentar"
              className="min-h-[110px] rounded-2xl border border-slate-300 px-4 py-3 text-sm md:col-span-2"
            />

            <label className="md:col-span-2 flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={createForm.is_published}
                onChange={(e) =>
                  setCreateForm((p) => ({ ...p, is_published: e.target.checked }))
                }
              />
              Publicér med det samme
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={creating}
                className="rounded-2xl bg-[#26439a] px-6 py-3 text-sm font-medium text-white"
              >
                {creating ? "Opretter..." : "Opret galleri-item"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Eksisterende items</h2>

          {loading ? (
            <div className="mt-6 text-sm text-slate-600">Henter galleri...</div>
          ) : (
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[120px_120px_1fr_auto_auto] lg:items-center">
                    <div className="h-24 overflow-hidden rounded-xl bg-slate-100">
                      {item.before_image_url ? (
                        <img
                          src={item.before_image_url}
                          alt="before"
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="h-24 overflow-hidden rounded-xl bg-slate-100">
                      {item.after_image_url ? (
                        <img
                          src={item.after_image_url}
                          alt="after"
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-900">
                        {item.title || "Uden titel"}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {item.description || "Ingen beskrivelse"}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
                        Orden
                      </label>
                      <input
                        type="number"
                        defaultValue={item.display_order}
                        onBlur={(e) => void saveOrder(item, e.target.value)}
                        className="w-24 rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.is_published
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.is_published ? "Publiceret" : "Skjult"}
                      </span>

                      <button
                        type="button"
                        disabled={savingId === item.id}
                        onClick={() => void togglePublished(item)}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
                      >
                        {item.is_published ? "Afpublicér" : "Publicér"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 ? (
                <div className="text-sm text-slate-600">Ingen galleri-items endnu.</div>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
