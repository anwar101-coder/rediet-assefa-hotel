import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, LogOut, Plus, Pencil, Trash2, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Room Management — Rediet Assefa Hotel Admin" },
      {
        name: "description",
        content:
          "Private dashboard for Rediet Assefa Hotel staff to add, edit and remove rooms, rates and availability.",
      },
      { property: "og:title", content: "Room Management — Rediet Assefa Hotel Admin" },
      {
        property: "og:description",
        content: "Private staff dashboard for managing rooms at Rediet Assefa Hotel.",
      },
    ],
  }),
  component: AdminPage,
});

type RoomRow = {
  id: string;
  name: string;
  name_am: string | null;
  category: string;
  description: string | null;
  price_per_night: number;
  capacity: number;
  bed_type: string | null;
  size_sqm: number | null;
  amenities: string[];
  image_url: string | null;
  gallery_urls: string[];
  is_available: boolean;
  sort_order: number;
};

const roomSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required" }).max(120),
  name_am: z.string().trim().max(120).optional(),
  category: z.string().trim().min(2, { message: "Category is required" }).max(60),
  description: z.string().trim().max(1000).optional(),
  price_per_night: z.coerce.number().min(0).max(1000000),
  capacity: z.coerce.number().int().min(1).max(20),
  bed_type: z.string().trim().max(80).optional(),
  size_sqm: z.coerce.number().int().min(0).max(1000).optional(),
  amenities: z.string().trim().max(600).optional(),
  image_url: z.string().trim().max(500).optional(),
  gallery_urls: z.string().trim().max(2000).optional(),
  sort_order: z.coerce.number().int().min(0).max(999),
  is_available: z.boolean(),
});

const emptyRoom = {
  name: "",
  name_am: "",
  category: "Standard",
  description: "",
  price_per_night: 0,
  capacity: 2,
  bed_type: "",
  size_sqm: 0,
  amenities: "",
  image_url: "",
  gallery_urls: "",
  sort_order: 0,
  is_available: true,
};

function useIsAdmin() {
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return { isAdmin: false, email: null as string | null };
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      return { isAdmin: !!data, email: userData.user?.email ?? null };
    },
  });
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: access, isLoading: checkingRole } = useIsAdmin();
  const [editing, setEditing] = useState<RoomRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<RoomRow | null>(null);

  const roomsQuery = useQuery({
    queryKey: ["admin-rooms"],
    enabled: !!access?.isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as RoomRow[];
    },
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const saveMutation = useMutation({
    mutationFn: async ({ id, values }: { id: string | null; values: Record<string, unknown> }) => {
      if (id) {
        const { error } = await supabase.from("rooms").update(values as never).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("rooms").insert(values as never);
        if (error) throw error;
      }
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success(vars.id ? "Room updated" : "Room added");
      setEditing(null);
      setCreating(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("rooms").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room removed");
      setConfirmDelete(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleAvailability = async (room: RoomRow) => {
    const { error } = await supabase
      .from("rooms")
      .update({ is_available: !room.is_available })
      .eq("id", room.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
  };

  if (checkingRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/60">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!access?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/60 px-5">
        <div className="max-w-md rounded-3xl border border-border bg-card p-8 text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-gold" />
          <h1 className="mt-4 font-display text-2xl font-light text-foreground">
            No admin access
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {access?.email ?? "This account"} is signed in but not an administrator of the hotel
            dashboard.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-xs font-semibold text-linen hover:bg-gold hover:text-espresso"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  const rooms = roomsQuery.data ?? [];

  return (
    <div className="min-h-screen bg-secondary/50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Admin</p>
            <h1 className="mt-2 font-display text-4xl font-light text-foreground">
              Room management
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">{access.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/rooms"
              className="rounded-full border border-border bg-card px-5 py-3 text-xs font-semibold text-foreground hover:border-gold"
            >
              View public page
            </Link>
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-5 py-3 text-xs font-semibold text-espresso"
            >
              <Plus className="h-4 w-4" /> Add room
            </button>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-xs font-semibold text-linen hover:bg-gold hover:text-espresso"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </header>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
          {roomsQuery.isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-gold" />
            </div>
          ) : rooms.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">
              No rooms yet — add your first one.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {rooms.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center gap-4 p-5">
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    {r.image_url && (
                      <img src={r.image_url} alt={r.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-[180px] flex-1">
                    <p className="font-display text-xl text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.category} · {r.capacity} guests · {r.bed_type ?? "—"} · #{r.sort_order}
                    </p>
                  </div>
                  <p className="font-display text-2xl text-foreground">
                    {Number(r.price_per_night).toLocaleString()}
                    <span className="ml-1 text-xs text-muted-foreground">ETB</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleAvailability(r)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wide ${
                        r.is_available
                          ? "bg-sage/80 text-espresso"
                          : "bg-espresso/85 text-linen"
                      }`}
                    >
                      {r.is_available ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      {r.is_available ? "Available" : "Booked"}
                    </button>
                    <button
                      onClick={() => setEditing(r)}
                      aria-label={`Edit ${r.name}`}
                      className="rounded-full border border-border p-2.5 text-foreground hover:border-gold"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(r)}
                      aria-label={`Delete ${r.name}`}
                      className="rounded-full border border-border p-2.5 text-destructive hover:border-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <RoomFormDialog
        open={creating || !!editing}
        room={editing}
        saving={saveMutation.isPending}
        onClose={() => {
          setEditing(null);
          setCreating(false);
        }}
        onSave={(values) => saveMutation.mutate({ id: editing?.id ?? null, values })}
      />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-light">Remove room</DialogTitle>
            <DialogDescription>
              {confirmDelete?.name} will be permanently deleted from the website.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmDelete(null)}
              className="flex-1 rounded-full border border-border px-5 py-3 text-xs font-semibold text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={() => confirmDelete && deleteMutation.mutate(confirmDelete.id)}
              disabled={deleteMutation.isPending}
              className="flex-1 rounded-full bg-destructive px-5 py-3 text-xs font-semibold text-destructive-foreground disabled:opacity-60"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RoomFormDialog({
  open,
  room,
  saving,
  onClose,
  onSave,
}: {
  open: boolean;
  room: RoomRow | null;
  saving: boolean;
  onClose: () => void;
  onSave: (values: Record<string, unknown>) => void;
}) {
  const initial = useMemo(
    () =>
      room
        ? {
            name: room.name,
            name_am: room.name_am ?? "",
            category: room.category,
            description: room.description ?? "",
            price_per_night: Number(room.price_per_night),
            capacity: room.capacity,
            bed_type: room.bed_type ?? "",
            size_sqm: room.size_sqm ?? 0,
            amenities: room.amenities.join(", "),
            image_url: room.image_url ?? "",
            gallery_urls: (room.gallery_urls ?? []).join(", "),
            sort_order: room.sort_order,
            is_available: room.is_available,
          }
        : emptyRoom,
    [room],
  );

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(initial);
    setErrors({});
  }, [initial, open]);

  const set = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = roomSchema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] = i.message;
      setErrors(next);
      return;
    }
    const v = parsed.data;
    const split = (s?: string) =>
      (s ?? "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

    onSave({
      name: v.name,
      name_am: v.name_am || null,
      category: v.category,
      description: v.description || null,
      price_per_night: v.price_per_night,
      capacity: v.capacity,
      bed_type: v.bed_type || null,
      size_sqm: v.size_sqm || null,
      amenities: split(v.amenities),
      image_url: v.image_url || null,
      gallery_urls: split(v.gallery_urls),
      sort_order: v.sort_order,
      is_available: v.is_available,
    });
  };

  const field =
    "mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-gold";
  const label = "text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-light">
            {room ? "Edit room" : "Add room"}
          </DialogTitle>
          <DialogDescription>
            Changes appear on the public Rooms &amp; Suites page immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="f-name">Name</label>
            <input id="f-name" value={form.name} onChange={(e) => set("name", e.target.value)} className={field} />
            {errors['name'] && <p className="mt-1 text-xs text-destructive">{errors['name']}</p>}
          </div>
          <div>
            <label className={label} htmlFor="f-name-am">Name (Amharic)</label>
            <input id="f-name-am" value={form.name_am} onChange={(e) => set("name_am", e.target.value)} className={`${field} font-ethiopic`} />
          </div>
          <div>
            <label className={label} htmlFor="f-cat">Category</label>
            <input id="f-cat" value={form.category} onChange={(e) => set("category", e.target.value)} className={field} placeholder="Standard / Deluxe / Suite / Family" />
            {errors['category'] && <p className="mt-1 text-xs text-destructive">{errors['category']}</p>}
          </div>
          <div>
            <label className={label} htmlFor="f-price">Price per night (ETB)</label>
            <input id="f-price" type="number" min={0} value={form.price_per_night} onChange={(e) => set("price_per_night", e.target.value)} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="f-cap">Capacity</label>
            <input id="f-cap" type="number" min={1} max={20} value={form.capacity} onChange={(e) => set("capacity", e.target.value)} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="f-bed">Bed type</label>
            <input id="f-bed" value={form.bed_type} onChange={(e) => set("bed_type", e.target.value)} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="f-size">Size (m²)</label>
            <input id="f-size" type="number" min={0} value={form.size_sqm} onChange={(e) => set("size_sqm", e.target.value)} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="f-sort">Display order</label>
            <input id="f-sort" type="number" min={0} value={form.sort_order} onChange={(e) => set("sort_order", e.target.value)} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="f-desc">Description</label>
            <textarea id="f-desc" rows={3} maxLength={1000} value={form.description} onChange={(e) => set("description", e.target.value)} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="f-amen">Amenities (comma separated)</label>
            <input id="f-amen" value={form.amenities} onChange={(e) => set("amenities", e.target.value)} className={field} placeholder="Free Wi-Fi, Smart TV, Balcony" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="f-img">Main image URL</label>
            <input id="f-img" value={form.image_url} onChange={(e) => set("image_url", e.target.value)} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="f-gal">Gallery image URLs (comma separated)</label>
            <textarea id="f-gal" rows={2} value={form.gallery_urls} onChange={(e) => set("gallery_urls", e.target.value)} className={field} />
          </div>
          <label className="flex items-center gap-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.is_available}
              onChange={(e) => set("is_available", e.target.checked)}
              className="h-4 w-4 accent-[var(--color-gold,#C87A4B)]"
            />
            <span className="text-sm text-foreground">Available for booking</span>
          </label>

          <div className="mt-2 flex gap-3 sm:col-span-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-full border border-border px-5 py-3 text-xs font-semibold text-foreground">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-5 py-3 text-xs font-semibold text-espresso disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {room ? "Save changes" : "Add room"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
