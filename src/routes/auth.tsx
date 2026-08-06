import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BackButton } from "@/components/site/BackButton";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Sign In — Rediet Assefa Hotel" },
      {
        name: "description",
        content:
          "Secure staff sign in for the Rediet Assefa Hotel management dashboard in Butajira, Ethiopia.",
      },
      { property: "og:title", content: "Staff Sign In — Rediet Assefa Hotel" },
      {
        property: "og:description",
        content: "Secure staff access to the Rediet Assefa Hotel management dashboard.",
      },
    ],
  }),
  component: AuthPage,
});

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credentialsSchema.safeParse({ email, password });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] = i.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword(parsed.data);
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      navigate({ to: "/admin", replace: true });
    } else {
      const { data, error } = await supabase.auth.signUp({
        ...parsed.data,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      if (data.session) {
        navigate({ to: "/admin", replace: true });
      } else {
        toast.success("Account created — check your email to confirm it, then sign in.");
        setMode("signin");
      }
    }
  };

  const field =
    "mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-gold";

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/60 px-5 py-16">
      <BackButton />
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[0_30px_80px_-50px_rgba(43,35,31,0.6)]">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-4 font-display text-3xl font-light text-foreground">
            {mode === "signin" ? "Staff sign in" : "Create staff account"}
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Rediet Assefa Hotel
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              maxLength={255}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              placeholder="you@example.com"
            />
            {errors['email'] && <p className="mt-1 text-xs text-destructive">{errors['email']}</p>}
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              maxLength={72}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
              placeholder="••••••••"
            />
            {errors['password'] && (
              <p className="mt-1 text-xs text-destructive">{errors['password']}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-linen transition-colors duration-300 hover:bg-gold hover:text-espresso disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {mode === "signin"
            ? "First time here? Create the admin account"
            : "Already have an account? Sign in"}
        </button>

        <Link
          to="/"
          className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground"
        >
          ← Back to the website
        </Link>
      </div>
    </div>
  );
}
