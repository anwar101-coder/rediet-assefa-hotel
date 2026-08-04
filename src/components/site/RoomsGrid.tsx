import { useState } from "react";
import { Users, BedDouble, Maximize, ArrowUpRight } from "lucide-react";
import { RoomDetailDialog } from "@/components/site/RoomDetailDialog";
import type { Room } from "@/lib/rooms.functions";


function RoomCard({ room, onOpen }: { room: Room; onOpen: (r: Room) => void }) {
  return (
    <article className="card-3d group flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative h-60 overflow-hidden">
        {room.image_url ? (
          <img
            src={room.image_url}
            alt={room.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${
            room.is_available ? "bg-sage/90 text-espresso" : "bg-espresso/80 text-linen"
          }`}
        >
          {room.is_available ? "Available" : "Fully booked"}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground">
          {room.category}
        </span>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="font-display text-2xl">{room.name}</p>
          {room.name_am && <p className="font-ethiopic text-xs text-white/75">{room.name_am}</p>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-gold" /> {room.capacity} guests
          </span>
          {room.bed_type && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-gold" /> {room.bed_type}
            </span>
          )}
          {room.size_sqm && (
            <span className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-gold" /> {room.size_sqm} m²
            </span>
          )}
        </div>

        {room.description && (
          <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{room.description}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] text-muted-foreground"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3 pt-2">
          <p className="min-w-0">
            <span className="font-display text-3xl text-foreground">
              {room.price_per_night.toLocaleString()}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">ETB / night</span>
          </p>
          <button
            onClick={() => onOpen(room)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-espresso px-5 py-3 text-xs font-semibold text-linen transition-colors duration-300 hover:bg-gold hover:text-espresso"
          >
            View Details &amp; Reserve <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function RoomsGrid({ rooms }: { rooms: Room[] }) {
  const categories = ["All", ...Array.from(new Set(rooms.map((r) => r.category)))];
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Room | null>(null);

  const filtered = active === "All" ? rooms : rooms.filter((r) => r.category === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
              active === c
                ? "border-gold bg-gold text-espresso shadow-[0_10px_25px_-14px_rgba(200,122,75,0.9)]"
                : "border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No rooms in this category right now.
        </p>
      ) : (
        <div className="mt-14 grid gap-8 [perspective:1600px] md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RoomCard key={r.id} room={r} onOpen={setSelected} />
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-3xl font-light">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="font-ethiopic">
                  {selected.name_am ?? selected.category}
                </DialogDescription>
              </DialogHeader>

              {selected.image_url && (
                <img
                  src={selected.image_url}
                  alt={selected.name}
                  className="h-60 w-full rounded-2xl object-cover"
                />
              )}

              {selected.description && (
                <p className="text-sm text-muted-foreground">{selected.description}</p>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground sm:grid-cols-4">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-gold" /> {selected.capacity} guests
                </span>
                {selected.bed_type && (
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4 text-gold" /> {selected.bed_type}
                  </span>
                )}
                {selected.size_sqm && (
                  <span className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4 text-gold" /> {selected.size_sqm} m²
                  </span>
                )}
                <span className="font-display text-lg text-foreground">
                  {selected.price_per_night.toLocaleString()} ETB
                </span>
              </div>

              {selected.amenities.length > 0 && (
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selected.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-gold" /> {a}
                    </li>
                  ))}
                </ul>
              )}

              <a
                href="tel:+251913000000"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-3.5 text-sm font-semibold text-espresso transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                {selected.is_available ? "Call to reserve" : "Join the waiting list"}
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
