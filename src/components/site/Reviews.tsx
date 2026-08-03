import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Michael Brandt",
    origin: "Germany · Google Review",
    rating: 5,
    text: "One of the best hotels between Addis and Hawassa. Spotless room, hot shower, great Wi-Fi and the staff went out of their way to help us with directions.",
  },
  {
    name: "Sarah Delacroix",
    origin: "France · Google Review",
    rating: 5,
    text: "Beautiful gardens and the traditional tukul area is lovely at night. The breakfast was generous and the coffee ceremony was a highlight of our trip.",
  },
  {
    name: "Daniel Okoro",
    origin: "Kenya · Google Review",
    rating: 5,
    text: "We hosted a two-day training in their hall. Professional setup, reliable power, good catering. Easily the most organised venue in Butajira.",
  },
];

export function Reviews() {
  return (
    <section className="bg-secondary/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold">Guest Voices</span>
          <h2 className="mt-4 font-display text-4xl font-light text-foreground sm:text-5xl">
            Loved by travellers worldwide
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">Rated highly on Google Maps</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 [perspective:1600px] md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="card-3d relative rounded-3xl border border-border bg-card p-7"
            >
              <Quote className="h-8 w-8 text-gold/30" />
              <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-lg text-foreground">{r.name}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {r.origin}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
