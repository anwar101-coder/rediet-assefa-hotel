import {
  UtensilsCrossed,
  PartyPopper,
  Car,
  Wifi,
  ConciergeBell,
  Shirt,
} from "lucide-react";
import hall from "@/assets/image-3.png";

const amenities = [
  { icon: UtensilsCrossed, title: "Restaurant & Bar", text: "Ethiopian classics and international dishes served all day." },
  { icon: PartyPopper, title: "Meeting & Event Hall", text: "Weddings, conferences and trainings with full setup." },
  { icon: Car, title: "Secure Parking", text: "Gated, guarded parking for guests and event visitors." },
  { icon: Wifi, title: "Fast Wi-Fi", text: "Complimentary high-speed internet across the property." },
  { icon: ConciergeBell, title: "24/7 Room Service", text: "Reception, hot showers and service at any hour." },
  { icon: Shirt, title: "Laundry Service", text: "Same-day laundry and pressing for longer stays." },
];

export function Amenities() {
  return (
    <section id="amenities" className="relative overflow-hidden bg-espresso py-24 text-linen lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative [perspective:1400px]">
            <div className="card-3d overflow-hidden rounded-[2rem] border border-white/10">
              <img src={hall} alt="Event and conference hall" className="h-[24rem] w-full object-cover" />
            </div>
            <div className="glass-card absolute -bottom-8 left-6 rounded-2xl px-6 py-4">
              <p className="font-display text-2xl text-gold-soft">Event Hall</p>
              <p className="text-xs text-white/70">Up to 400 guests</p>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold">Facilities</span>
            <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
              Everything you need, under one roof
            </h2>
            <p className="mt-3 font-ethiopic text-sm text-white/60">አገልግሎቶቻችን</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {amenities.map((a) => (
                <div
                  key={a.title}
                  className="card-3d rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <a.icon className="h-6 w-6 text-gold" />
                  <p className="mt-4 font-display text-xl">{a.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
