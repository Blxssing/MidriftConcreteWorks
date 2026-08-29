import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactDock } from "@/components/site/ContactDock";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { QuoteProvider } from "@/components/site/QuoteProvider";
import { Toaster } from "@/components/ui/sonner";
import { initAnalytics, trackPageView } from "@/lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-1">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-accent px-6 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-accent px-6 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-input bg-background px-6 py-3 text-[12px] font-bold uppercase tracking-[0.12em]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "kJZNULEKA6PSDogzKfFqHSofclwQWM5GiaMcKJstdBk" },
      { title: "Midrift Concrete Works Ltd | Precast Concrete Kenya" },
      {
        name: "description",
        content:
          "Kenyan manufacturer of precast concrete: cabro paving, concrete blocks, ventilation blocks, kerbs and custom precast solutions.",
      },
      { name: "author", content: "Midrift Concrete Works Ltd" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Midrift Concrete Works" },
      { property: "og:locale", content: "en_KE" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://midriftconcreteworks.com/#business",
          name: "Midrift Concrete Works Ltd",
          url: "https://midriftconcreteworks.com",
          description:
            "Kenyan manufacturer of precast concrete: cabro paving, concrete blocks, ventilation blocks, kerbs, culverts and custom precast solutions.",
          telephone: "+254791502707",
          email: "midmerchants@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Old Nairobi Road",
            addressLocality: "Nakuru",
            addressCountry: "KE",
          },
          geo: { "@type": "GeoCoordinates", latitude: -0.3031, longitude: 36.08 },
          hasMap: "https://maps.app.goo.gl/QvdwAQEf79oM6LwZ9",
          areaServed: { "@type": "Place", name: "Nakuru, Kenya" },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "07:30",
              closes: "17:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday"],
              opens: "07:30",
              closes: "13:00",
            },
          ],
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },

      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerInstance = useRouter();

  useEffect(() => {
    initAnalytics();
    trackPageView(window.location.pathname);
    return routerInstance.subscribe("onResolved", ({ toLocation }) => {
      trackPageView(toLocation.pathname);
    });
  }, [routerInstance]);

  return (
    <QueryClientProvider client={queryClient}>
      <QuoteProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
          <div className="h-24 print:hidden" aria-hidden />
        </div>
        <ContactDock />
        <WhatsAppFab />
        <Toaster position="top-right" />
      </QuoteProvider>
    </QueryClientProvider>
  );
}
