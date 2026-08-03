import { Link } from "@tanstack/react-router";
import { Users, BedDouble, ArrowUpRight } from "lucide-react";

import exterior from "@/assets/image-5.png.asset.json";
import entrance from "@/assets/image-4.png.asset.json";
import garden from "@/assets/image-2.png.asset.json";

const rooms = [
  {
    name: "Standard Room",
    am: "መደበኛ ክፍል",
    price: "1,800",
    capacity: 2,
    bed: "Queen bed",
    image: entrance.url,
    features: ["En-suite bathroom", "Smart TV", "Free Wi-Fi"],
  },
  {
    name: "Deluxe Room",
    am: "ዲላክስ ክፍል",
    price: "2,900",
    capacity: 3,
    bed: "King bed",
    image: exterior.url,
    features: ["Balcony", "Breakfast included", "Work desk"],
  },
  {
    name: "VIP Suite",
    am: "ቪአይፒ ስዊት",
    price: "4,500",
    capacity: 4,
    bed: "King + sofa bed",
    image: garden.url,
    features: ["Living room", "Garden view", "Airport pickup"],
  },
];

export function FeaturedRooms() {
  return (
    <section id="rooms" className="bg-secondary/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold">Accommodation</span>
          <h2 className="mt-4 font-display text-4xl font-light text-foreground sm:text-5xl">
            Rooms & Suites
          </h2>
          <div className="gold-rule mx-auto mt-6 w-40" />
          <p className="mt-6 text-muted-foreground">
            Every room is cleaned daily, fitted with hot showers, fast Wi-Fi and quiet air —
            chosen to suit business trips, family holidays and long stays alike.
          </p>
        </div>

        <div className="mt-16 grid gap-8 [perspective:1600px] md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r) => (
            <article
              key={r.name}
              className="card-3d group overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-sage/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-espresso">
                  Available
                </span>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-display text-2xl">{r.name}</p>
                  <p className="font-ethiopic text-xs text-white/75">{r.am}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gold" /> {r.capacity} guests
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4 text-gold" /> {r.bed}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {r.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
                  <p className="min-w-0">
                    <span className="font-display text-3xl text-foreground">{r.price}</span>
                    <span className="ml-1 text-xs text-muted-foreground">ETB / night</span>
                  </p>
                  <Link
                    to="/rooms"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-espresso px-5 py-3 text-xs font-semibold text-linen transition-colors duration-300 hover:bg-gold hover:text-espresso"
                  >
                    Reserve <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>

                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
