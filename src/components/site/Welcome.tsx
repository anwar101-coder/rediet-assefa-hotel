import lounge from "@/assets/image.png";
import garden from "@/assets/image-2.png";

export function Welcome() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative [perspective:1400px]">
          <div className="card-3d overflow-hidden rounded-[2rem] shadow-[var(--shadow-luxe)]">
            <img src={lounge} alt="Hotel terrace and lounge entrance" className="h-[26rem] w-full object-cover" />
          </div>
          <div className="card-3d absolute -bottom-10 -right-2 hidden w-52 overflow-hidden rounded-3xl border-4 border-background shadow-[var(--shadow-lift)] sm:block lg:-right-8">
            <img src={garden} alt="Garden tukuls at the hotel" className="h-40 w-full object-cover" />
          </div>
          <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold">Welcome</span>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-foreground sm:text-5xl">
            A calm, elegant retreat in the heart of Butajira
          </h2>
          <p className="mt-3 font-ethiopic text-sm text-muted-foreground">
            ምቾት፣ ደህንነት እና እንግዳ ተቀባይነት — በቡታጅራ ከተማ ልብ ውስጥ።
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Rediet Assefa Hotel blends modern comfort with genuine Ethiopian warmth. Spacious rooms,
            secure parking, fast Wi-Fi, hot showers and a kitchen serving both traditional and
            international cuisine make us the preferred choice for business travellers, families and
            visitors exploring the Gurage zone.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "60+", label: "Rooms & Suites" },
              { value: "400", label: "Guest Event Hall" },
              { value: "24/7", label: "Reception & Service" },
            ].map((s) => (
              <div
                key={s.label}
                className="card-3d rounded-2xl border border-border bg-card p-5 text-center"
              >
                <p className="font-display text-3xl text-gold">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
