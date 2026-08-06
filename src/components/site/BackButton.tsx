import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackButton({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Back to home"
      className={`fixed left-4 top-4 z-[60] inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2.5 text-[13px] font-medium text-foreground shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] backdrop-blur transition-colors duration-300 hover:border-gold hover:text-gold lg:left-6 lg:top-6 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Home
    </Link>
  );
}
