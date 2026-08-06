import { useMemo, useState } from "react";
import {
  Users,
  BedDouble,
  Maximize,
  Phone,
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
  Clock,
  Ban,
  CreditCard,
  PawPrint,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Room } from "@/lib/rooms.functions";

import { RECEPTION_PHONE, RECEPTION_TEL, TELEGRAM_URL } from "@/lib/contact";

export { RECEPTION_PHONE };

const policies = [
  { icon: Clock, title: "Check-in / Check-out", body: "Check-in from 12:00 PM · Check-out by 11:00 AM" },
  { icon: Ban, title: "Cancellation", body: "Free cancellation up to 24 hours before arrival" },
  { icon: CreditCard, title: "Payment", body: "Cash, telebirr or bank transfer on arrival · ID required" },
  { icon: PawPrint, title: "House rules", body: "No smoking in rooms · Pets on request · Children welcome" },
];

const inquirySchema = z.object({
  name: z.string().trim().min(2, { message: "Please enter your name" }).max(100),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Please enter a valid phone number" })
    .max(20)
    .regex(/^[0-9+()\s-]+$/, { message: "Phone can only contain digits and + ( ) -" }),
  checkIn: z.string().trim().min(1, { message: "Select an arrival date" }),
  nights: z.coerce.number().int().min(1).max(60),
  guests: z.coerce.number().int().min(1).max(12),
  notes: z.string().trim().max(500).optional(),
});

function Gallery({ room }: { room: Room }) {
  const images = useMemo(() => {
    const list = room.gallery_urls?.length ? room.gallery_urls : [];
    return list.length ? list : room.image_url ? [room.image_url] : [];
  }, [room]);
  const [i, setI] = useState(0);

  if (images.length === 0) return null;
  const go = (d: number) => setI((p) => (p + d + images.length) % images.length);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={images[i]}
          alt={`${room.name} photo ${i + 1}`}
          className="h-64 w-full object-cover sm:h-80"
        />
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous photo"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next photo"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-espresso/70 px-3 py-1 text-[11px] text-linen">
              {i + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, idx) => (
            <button
              key={src + idx}
              onClick={() => setI(idx)}
              aria-label={`Show photo ${idx + 1}`}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                idx === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ReservationForm({ room }: { room: Room }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const buildMessage = (v: z.infer<typeof inquirySchema>) =>
    `Reservation inquiry — Rediet Assefa Hotel\n\nRoom: ${room.name} (${room.category})\nRate: ${room.price_per_night.toLocaleString()} ETB / night\nName: ${v.name}\nPhone: ${v.phone}\nArrival: ${v.checkIn}\nNights: ${v.nights}\nGuests: ${v.guests}${v.notes ? `\nNotes: ${v.notes}` : ""}`;

  const handle = async (e: React.FormEvent<HTMLFormElement>, channel: "telegram" | "call") => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = inquirySchema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const message = buildMessage(parsed.data);

    if (channel === "call") {
      window.location.href = `tel:${RECEPTION_TEL}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      toast.success("Inquiry copied — paste it in Telegram to reception");
    } catch {
      toast.message("Send this to reception on Telegram", { description: message });
    }
    window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
  };

  const field =
    "mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-gold";
  const label = "text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

  return (
    <form
      onSubmit={(e) => handle(e, "telegram")}
      className="rounded-2xl border border-border bg-secondary/50 p-5"
    >
      <p className="font-display text-2xl font-light text-foreground">Send a reservation inquiry</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Reception replies on Telegram or by phone — {RECEPTION_PHONE}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Full name</label>
          <input id="name" name="name" maxLength={100} className={field} placeholder="Abebe Bekele" />
          {errors['name'] && <p className="mt-1 text-xs text-destructive">{errors['name']}</p>}
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" maxLength={20} className={field} placeholder="09xx xxx xxx" />
          {errors['phone'] && <p className="mt-1 text-xs text-destructive">{errors['phone']}</p>}
        </div>
        <div>
          <label className={label} htmlFor="checkIn">Arrival date</label>
          <input id="checkIn" name="checkIn" type="date" className={field} />
          {errors['checkIn'] && <p className="mt-1 text-xs text-destructive">{errors['checkIn']}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label} htmlFor="nights">Nights</label>
            <input id="nights" name="nights" type="number" min={1} max={60} defaultValue={1} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="guests">Guests</label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              max={12}
              defaultValue={room.capacity}
              className={field}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="notes">Notes (optional)</label>
          <textarea id="notes" name="notes" rows={3} maxLength={500} className={field} placeholder="Airport pickup, late arrival…" />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-3.5 text-sm font-semibold text-espresso transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Send className="h-4 w-4" /> Reserve via Telegram
        </button>
        <button
          type="button"
          onClick={(e) =>
            handle(
              { ...e, currentTarget: e.currentTarget.form! } as unknown as React.FormEvent<HTMLFormElement>,
              "call",
            )
          }
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-linen transition-colors duration-300 hover:bg-gold hover:text-espresso"
        >
          <Phone className="h-4 w-4" /> Call {RECEPTION_PHONE}
        </button>
      </div>
    </form>
  );
}

export function RoomDetailDialog({
  room,
  onClose,
}: {
  room: Room | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!room} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        {room && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl font-light">{room.name}</DialogTitle>
              <DialogDescription className="font-ethiopic">
                {room.name_am ?? room.category}
              </DialogDescription>
            </DialogHeader>

            <Gallery room={room} />

            {room.description && (
              <p className="text-sm text-muted-foreground">{room.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground sm:grid-cols-4">
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
              <span className="font-display text-lg text-foreground">
                {room.price_per_night.toLocaleString()} ETB
              </span>
            </div>

            {room.amenities.length > 0 && (
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-gold" /> {a}
                  </li>
                ))}
              </ul>
            )}

            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Policies</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {policies.map((p) => (
                  <div
                    key={p.title}
                    className="flex gap-3 rounded-2xl border border-border bg-card p-4"
                  >
                    <p.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ReservationForm room={room} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
