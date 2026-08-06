import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { RECEPTION_TEL } from "@/lib/contact";

const links = [
  { label: "Home", href: "/#home", to: "/" as const },
  { label: "Rooms & Suites", href: "/rooms", to: "/rooms" as const },
  { label: "Meeting & Events", href: "/#amenities" },
  { label: "Restaurant & Bar", href: "/#amenities" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors ${
              scrolled ? "border-gold/50 text-gold" : "border-white/50 text-white"
            }`}
          >
            <span className="font-display text-lg leading-none">RA</span>
          </span>
          <span className="min-w-0">
            <span
              className={`block truncate font-display text-lg leading-tight tracking-wide sm:text-xl ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              Rediet Assefa Hotel
            </span>
            <span
              className={`block truncate font-ethiopic text-[11px] tracking-[0.2em] ${
                scrolled ? "text-muted-foreground" : "text-white/70"
              }`}
            >
              ረድኤት አስፋ ሆቴል · ቡታጅራ
            </span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-7 xl:flex">
            {links.map((l) => {
              const cls = `relative text-[13px] font-medium tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "text-foreground/80 hover:text-gold" : "text-white/85 hover:text-white"
              }`;
              return l.to === "/rooms" ? (
                <Link key={l.label} to="/rooms" className={cls}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} className={cls}>
                  {l.label}
                </a>
              );
            })}

          </nav>

          <a
            href={`tel:${RECEPTION_TEL}`}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-[13px] font-semibold text-espresso shadow-[0_12px_28px_-14px_rgba(200,122,75,0.9)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            Book Now
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border xl:hidden ${
              scrolled ? "border-border text-foreground" : "border-white/40 text-white"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/98 px-5 py-4 backdrop-blur-xl xl:hidden">
          <nav className="flex flex-col">
            {links.map((l) => {
              const cls =
                "border-b border-border/60 py-3 text-sm font-medium text-foreground/85 last:border-0 hover:text-gold";
              return l.to === "/rooms" ? (
                <Link key={l.label} to="/rooms" onClick={() => setOpen(false)} className={cls}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className={cls}>
                  {l.label}
                </a>
              );
            })}

          </nav>
        </div>
      )}
    </header>
  );
}
