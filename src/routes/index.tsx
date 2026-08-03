import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Welcome } from "@/components/site/Welcome";
import { FeaturedRooms } from "@/components/site/FeaturedRooms";
import { Amenities } from "@/components/site/Amenities";
import { Attractions } from "@/components/site/Attractions";
import { Reviews } from "@/components/site/Reviews";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rediet Assefa Hotel — Luxury Stays in Butajira, Ethiopia" },
      {
        name: "description",
        content:
          "Book comfortable rooms, suites and event halls at Rediet Assefa Hotel in Butajira. Restaurant, secure parking, fast Wi-Fi and 24/7 service.",
      },
      { property: "og:title", content: "Rediet Assefa Hotel — Butajira, Ethiopia" },
      {
        property: "og:description",
        content:
          "Elegant rooms, event halls and warm Ethiopian hospitality in the heart of Butajira city.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Welcome />
        <FeaturedRooms />
        <Amenities />
        <Attractions />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
