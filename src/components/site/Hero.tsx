import { useEffect, useState } from "react";
import { ChevronDown, CalendarDays, BedDouble, Search } from "lucide-react";
import exterior from "@/assets/image-5.png";
import entrance from "@/assets/image-4.png";
import garden from "@/assets/image-2.png";

const slides = [
  {
    image: exterior,
    badge: "Butajira · Ethiopia",
    title: "Discover a Hotel That Defines a New Dimension of Luxury",
    text: "Refined rooms, warm Ethiopian hospitality and world-class service, right in the heart of Butajira city.",
  },
  {
    image: entrance,
    badge: "Since our first guest",
    title: "Take the Luxury Experience Home",
    text: "From sunlit terraces to elegant suites, every corner of Rediet Assefa is designed for effortless comfort.",
  },
  {
    image: garden,
    badge: "Gardens · Events · Dining",
    title: "Dream On! A Wonderful Holiday Awaits You",
    text: "Traditional tukul lounges, green gardens and grand event halls for gatherings you will never forget.",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-espresso">
      {slides.map((s, i) => (
        <div
          key={s.image}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt="Rediet Assefa Hotel in Butajira"
            className={`h-full w-full object-cover ${i === active ? "animate-kenburns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/55 to-espresso/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/40" />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center gap-12 px-5 pb-24 pt-32 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div key={active} className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-soft backdrop-blur">
            {slides[active]!.badge}
          </span>
          <p className="mt-6 font-ethiopic text-base text-gold-soft/90">
            እንኳን ወደ ረድኤት አስፋ ሆቴል በደህና መጡ
          </p>
          <h1 className="mt-3 font-display text-[2.6rem] font-light leading-[1.05] text-white sm:text-6xl lg:text-[4.4rem]">
            {slides[active]!.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
            {slides[active]!.text}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#rooms"
              className="rounded-full bg-gradient-to-r from-gold-soft to-gold px-8 py-4 text-sm font-semibold text-espresso shadow-[0_20px_45px_-20px_rgba(200,169,106,0.95)] transition-transform duration-300 hover:-translate-y-1"
            >
              Explore Rooms
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/40 px-8 py-4 text-sm font-medium text-white/90 transition-colors duration-300 hover:border-gold hover:text-gold-soft"
            >
              Contact Reception
            </a>
          </div>

          <div className="mt-10 flex gap-3">
            {slides.map((s, i) => (
              <button
                key={s.image}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === active ? "w-14 bg-gold" : "w-7 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        <BookingCard />
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-scroll-dot text-gold" />
      </div>
    </section>
  );
}

function BookingCard() {
  return (
    <div className="glass-card w-full animate-float-soft rounded-3xl p-6 sm:p-7 lg:ml-auto lg:max-w-sm">
      <h2 className="font-display text-2xl text-white">Check Availability</h2>
      <p className="mt-1 text-xs text-white/60">Best rates guaranteed when you book direct.</p>

      <div className="mt-6 space-y-4">
        <Field label="Check in" icon={<CalendarDays className="h-4 w-4" />}>
          <input
            type="date"
            className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
        </Field>
        <Field label="Check out" icon={<CalendarDays className="h-4 w-4" />}>
          <input
            type="date"
            className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
        </Field>
        <Field label="Room type" icon={<BedDouble className="h-4 w-4" />}>
          <select className="w-full bg-transparent text-sm text-white outline-none [&>option]:text-espresso">
            <option>Standard</option>
            <option>Deluxe</option>
            <option>VIP Suite</option>
            <option>Family</option>
          </select>
        </Field>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-soft to-gold py-4 text-sm font-semibold text-espresso transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-18px_rgba(200,169,106,0.9)]">
        <Search className="h-4 w-4" />
        Check Availability
      </button>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-2xl border border-white/20 bg-white/5 px-4 py-3 transition-colors duration-300 focus-within:border-gold/70 hover:border-white/40">
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/55">
        {icon}
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
