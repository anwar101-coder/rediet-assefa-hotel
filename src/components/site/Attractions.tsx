import { MapPin, Mountain, Waves, Trees } from "lucide-react";
import { YANDEX_MAPS_URL } from "@/lib/contact";

const spots = [
  {
    icon: Waves,
    name: "Hare Shetan Crater Lake",
    detail: "HARA SHEYTANA — striking volcanic crater lake just outside Butajira",
  },
  {
    icon: Mountain,
    name: "የኢላል ዳገት",
    detail: "The Ilal escarpment — panoramic highland views and scenic drives",
  },
  {
    icon: Trees,
    name: "Zeytuna Chaka Natural Park",
    detail: "Shaded forest walks and birdlife a short trip from the hotel",
  },
];

export function Attractions() {
  return (
    <section id="gallery" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold">Explore Butajira</span>
            <h2 className="mt-4 font-display text-4xl font-light text-foreground sm:text-5xl">
              Your basecamp for the Gurage zone
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Butajira sits on the road between Addis Ababa and Hawassa, surrounded by highlands,
              crater lakes and some of Ethiopia's most remarkable heritage sites. Stay with us and
              explore it all in day trips.
            </p>

            <div className="mt-8 space-y-4">
              {spots.map((s) => (
                <div
                  key={s.name}
                  className="card-3d flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xl text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-luxe)]">
            <iframe
              title="Rediet Assefa Hotel location in Butajira"
              src="https://www.google.com/maps?q=Rediet%20Assefa%20Hotel%20Butajira&output=embed"
              className="h-[28rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-4 w-4 text-gold" /> Butajira, Gurage Zone, Central Ethiopia ·
          <a
            href={YANDEX_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:underline"
          >
            View on Yandex Maps
          </a>
        </p>
      </div>
    </section>
  );
}
