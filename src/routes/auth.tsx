import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, ShieldCheck } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { Container, Section } from "@/components/site/primitives";
import { site } from "@/data/site";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In | Midrift Concrete Works" },
      {
        name: "description",
        content: "Sign in to Midrift Concrete Works with your Google account.",
      },
      { property: "og:title", content: "Sign In | Midrift Concrete Works" },
      {
        property: "og:description",
        content: "Sign in to Midrift Concrete Works with your Google account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.16 7.16 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.86-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  );
}

function AuthPage() {
  const [session, setSession] = useState<{ email?: string } | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session?.user?.email ? { email: data.session.user.email! } : null))
      .finally(() => setReady(true));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s?.user?.email ? { email: s.user.email } : null);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signInWith = async (provider: "google" | "apple") => {
    setError(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(`${provider === "apple" ? "Apple" : "Google"} sign-in didn't complete. Please try again.`);
      setBusy(false);
      return;
    }
    if (result.redirected) return; // browser is heading to the provider
    setBusy(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <section className="bg-ink text-ink-foreground">
      <Container className="flex min-h-[70dvh] flex-col items-center justify-center py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
          <ShieldCheck className="size-4" /> Account access
        </span>
        <h1 className="mt-7 max-w-2xl display-1">
          {session ? "You're signed in." : "Sign in to Midrift Concrete Works."}
        </h1>

        {!ready ? null : session ? (
          <div className="mt-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl">
            <p className="text-sm text-ink-foreground/70">Signed in as</p>
            <p className="mt-1 truncate text-lg font-semibold tracking-tight">{session.email}</p>
            <button
              type="button"
              onClick={signOut}
              className="ios-cta mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LogOut className="size-4" aria-hidden="true" /> Sign out
            </button>
          </div>
        ) : (
          <div className="mt-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl">
            <p className="text-sm leading-relaxed text-ink-foreground/70">
              Use your Google account to continue. Fast and secure — we never see your password.
            </p>
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={busy}
              className="ios-cta mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-foreground shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <GoogleMark />
              {busy ? "Connecting…" : "Continue with Google"}
            </button>
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-300">
                {error}
              </p>
            )}
            <p className="mt-6 text-xs text-ink-foreground/50">
              Questions? WhatsApp us on {site.phone}.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
