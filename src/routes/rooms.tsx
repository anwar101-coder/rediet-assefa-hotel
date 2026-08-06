import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { BackButton } from "@/components/site/BackButton";
import { Footer } from "@/components/site/Footer";
import { RoomsGrid } from "@/components/site/RoomsGrid";
import { listRooms } from "@/lib/rooms.functions";

const roomsQueryOptions = queryOptions({
  queryKey: ["rooms"],
  queryFn: () => listRooms(),
});

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites — Rediet Assefa Hotel, Butajira" },
      {
        name: "description",
        content:
          "Browse standard rooms, deluxe rooms, family rooms and VIP suites at Rediet Assefa Hotel in Butajira, with nightly rates in ETB.",
      },
      { property: "og:title", content: "Rooms & Suites — Rediet Assefa Hotel" },
      {
        property: "og:description",
        content:
          "Comfortable rooms and elegant suites in Butajira — check rates, amenities and availability.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(roomsQueryOptions);
  },
  component: RoomsPage,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6" role="alert">
      <p className="text-center text-muted-foreground">
        We couldn't load our rooms right now. {error.message}
      </p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">No rooms found.</p>
    </div>
  ),
});

function RoomsPage() {
  const { data: rooms } = useSuspenseQuery(roomsQueryOptions);

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
      <Navbar />
      <main>
        <section className="bg-secondary/60 px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold">
                Accommodation
              </span>
              <h1 className="mt-4 font-display text-4xl font-light text-foreground sm:text-5xl">
                Rooms &amp; Suites
              </h1>
              <p className="mt-2 font-ethiopic text-sm text-muted-foreground">ክፍሎች እና ስዊቶች</p>
              <div className="gold-rule mx-auto mt-6 w-40" />
              <p className="mt-6 text-muted-foreground">
                From quiet standard rooms to our garden-view VIP suite — every room is cleaned
                daily and fitted with hot showers, fast Wi-Fi and calm, air-conditioned comfort.
              </p>
            </div>

            <div className="mt-14">
              <RoomsGrid rooms={rooms} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
