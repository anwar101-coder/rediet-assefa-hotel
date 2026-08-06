import { Phone, Send, MapPin, Mail, Facebook, Lock, Navigation } from "lucide-react";
import {
  RECEPTION_PHONE,
  RECEPTION_TEL,
  TELEGRAM_URL,
  FACEBOOK_URL,
  YANDEX_MAPS_URL,
} from "@/lib/contact";

export function Footer() {
  return (
    <footer id="contact" className="bg-espresso text-linen">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl">Rediet Assefa Hotel</p>
            <p className="mt-1 font-ethiopic text-sm text-gold-soft">ረድኤት አስፋ ሆቴል</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Comfortable rooms, elegant event spaces and warm Ethiopian hospitality in Butajira city.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`tel:${RECEPTION_TEL}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-espresso transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" /> Call {RECEPTION_PHONE}
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/85 transition-colors duration-300 hover:border-gold hover:text-gold-soft"
              >
                <Send className="h-4 w-4" /> Telegram
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Butajira, Gurage Zone, Central Ethiopia
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${RECEPTION_TEL}`} className="hover:text-gold-soft">
                  {RECEPTION_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Send className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-gold-soft">
                  Telegram · {RECEPTION_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="mailto:info@redietassefahotel.com" className="hover:text-gold-soft">
                  info@redietassefahotel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Facebook className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="hover:text-gold-soft">
                  Rediet Assefa International Hotel
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={YANDEX_MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-gold-soft">
                  Find us on Yandex Maps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {[
                { label: "Rooms & Suites", href: "#rooms" },
                { label: "Meeting & Events", href: "#amenities" },
                { label: "Restaurant & Bar", href: "#amenities" },
                { label: "Gallery & Location", href: "#gallery" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-gold-soft">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-rule mt-14" />
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-xs text-white/45">
          <p className="min-w-0">
            © {new Date().getFullYear()} Rediet Assefa Hotel · Butajira, Ethiopia
          </p>
          <a href="/auth" className="inline-flex shrink-0 items-center gap-1.5 hover:text-gold-soft">
            <Lock className="h-3.5 w-3.5" /> Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
