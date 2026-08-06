import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Mike Fekadu",
    origin: "Local Guide · 35 reviews · Google Maps",
    when: "a year ago",
    rating: 5,
    text: "I recently had the pleasure of staying at Rediet Hotel, and I must say it was an exceptional experience. Food was amazing and the hospitality extended by the staff was warm and welcoming, making me feel right at home. Highly recommended!",
  },
  {
    name: "Yannick St",
    origin: "Local Guide · 180 reviews · Google Maps",
    when: "a year ago",
    rating: 5,
    text: "Wonderful lunch in the garden. Tasty coffee in the sun. What an experience out of nowhere.",
  },
  {
    name: "Alan Owens",
    origin: "Local Guide · 221 reviews · Google Maps",
    when: "6 years ago",
    rating: 5,
    text: "From Wales UK, travelling from Addis to Hosanna and stopped by here for a meal and rest. Nice place, nice food, worth a visit...",
  },
  {
    name: "Daniel Kretsu",
    origin: "Local Guide · 174 reviews · Google Maps",
    when: "6 years ago",
    rating: 5,
    text: "Great Macchiato with milk here!",
  },
];

export function Reviews() {
  return (
    <section className="bg-secondary/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold">Guest Voices</span>
          <h2 className="mt-4 font-display text-4xl font-light text-foreground sm:text-5xl">
            Real reviews from our guests
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">Rated highly on Google Maps</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 [perspective:1600px] md:grid-cols-2 xl:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="card-3d relative flex flex-col rounded-3xl border border-border bg-card p-7"
            >
              <Quote className="h-8 w-8 text-gold/30" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-lg text-foreground">{r.name}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {r.origin}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground/70">{r.when}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
