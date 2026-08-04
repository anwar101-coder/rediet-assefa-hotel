import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Room = {
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
};

export const listRooms = createServerFn({ method: "GET" }).handler(async (): Promise<Room[]> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;

  const supabasePublic = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  const { data, error } = await supabasePublic
    .from("rooms")
    .select(
      "id, name, name_am, category, description, price_per_night, capacity, bed_type, size_sqm, amenities, image_url, gallery_urls, is_available",
    )
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => ({
    ...r,
    price_per_night: Number(r.price_per_night),
    amenities: r.amenities ?? [],
    gallery_urls: r.gallery_urls ?? [],
  })) as Room[];
});
