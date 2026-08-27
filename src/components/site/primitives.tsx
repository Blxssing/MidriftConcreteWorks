import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { MessageCircle, Mail, Phone, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink, emailLink, site } from "@/data/site";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-5 md:px-10", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  dark,
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28", dark && "bg-ink text-ink-foreground", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="display-2">{title}</h2>
      {lead && <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string | undefined;
  imageAlt?: string | undefined;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      {image && (
        <img
          src={image}
          alt={imageAlt ?? title}
          loading="lazy"
            decoding="async"
          className="absolute inset-0 size-full object-cover opacity-25"
        />
      )}
      <Container className="relative py-20 md:py-32">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl display-1">{title}</h1>
        {lead && <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-foreground/70 md:text-lg">{lead}</p>}
        <div className="mt-9 flex flex-wrap gap-3">
          <QuoteCTA />
          <WhatsAppCTA dark />
          <EmailCTA dark />
          <MapCTA dark />
          <ReviewsCTA dark />
        </div>
      </Container>
    </section>
  );
}

export function AccentLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-accent"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}

export function QuoteCTA({ label = "Request a Quote" }: { label?: string }) {
  return (
    <Link
      to="/contact"
      className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_color-mix(in_oklab,var(--accent-raw)_85%,transparent)] hover:brightness-110"
    >
      {label}
    </Link>
  );
}

export function WhatsAppCTA({ message, dark }: { message?: string; dark?: boolean }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      data-cta-zone="whatsapp"
      aria-label="Get a quote on WhatsApp — opens a pre-filled WhatsApp chat with Midrift sales"
      className={cn(
        "wa-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dark && "ring-1 ring-white/20",
      )}
    >
      <MessageCircle className="size-4" aria-hidden="true" /> Get a Quote on WhatsApp
    </a>
  );
}

/** Full-width, high-contrast WhatsApp callout for use inside page sections. */
export function WhatsAppBanner({
  title = "Get a price on WhatsApp in minutes",
  lead = "Send the product, quantity and delivery town — our sales team replies with pricing and lead time.",
  message,
}: {
  title?: string;
  lead?: string;
  message?: string;
}) {
  return (
    <div className="wa-callout flex flex-col gap-6 rounded-[32px] p-7 md:flex-row md:items-center md:justify-between md:p-9">
      <div className="max-w-xl">
        <h3 className="font-display text-2xl tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lead}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          data-cta-zone="whatsapp-banner"
          aria-label="Talk to Midrift sales on WhatsApp — opens a pre-filled chat"
          className="wa-btn flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-4 text-[14px] font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <MessageCircle className="size-5" aria-hidden="true" /> Talk to Sales on WhatsApp
        </a>
        <a
          href={site.whatsappCatalog}
          target="_blank"
          rel="noreferrer"
          aria-label="Browse the Midrift WhatsApp product catalogue"
          className="ios-glass flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-4 text-[14px] font-bold tracking-tight transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
        >
          <MessageCircle className="size-5 text-accent" aria-hidden="true" /> WhatsApp catalogue
        </a>
      </div>
    </div>
  );
}

/** Opens the device mail app with a pre-filled quotation request. */
export function EmailCTA({ subject, dark }: { subject?: string; dark?: boolean }) {
  return (
    <a
      href={subject ? emailLink(subject) : emailLink()}
      aria-label="Email sales — opens a pre-filled email to the Midrift sales team"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out hover:-translate-y-0.5",
        dark
          ? "border-hairline-invert text-ink-foreground hover:bg-ink-foreground/10"
          : "border-hairline text-foreground hover:border-accent hover:text-accent",
      )}
    >
      <Mail className="size-4" aria-hidden="true" /> Email Sales
    </a>
  );
}

/** Opens the yard location in the Google Maps app. */
export function MapCTA({ dark }: { dark?: boolean }) {
  return (
    <a
      href={site.mapsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Open our yard location in Google Maps"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95",
        dark
          ? "border-hairline-invert text-ink-foreground hover:bg-ink-foreground/10"
          : "border-hairline text-foreground hover:border-accent hover:text-accent",
      )}
    >
      <MapPin className="size-4" /> Google Map
    </a>
  );
}

/** Opens the Google Business reviews tab for the yard. */
export function ReviewsCTA({ dark }: { dark?: boolean }) {
  return (
    <a
      href={site.reviewsUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95",
        dark
          ? "border-hairline-invert text-ink-foreground hover:bg-ink-foreground/10"
          : "border-hairline text-foreground hover:border-accent hover:text-accent",
      )}
    >
      <Star className="size-4" /> View Reviews
    </a>
  );
}

/** Opens the phone dialler directly. */
export function CallCTA({ dark }: { dark?: boolean }) {
  return (
    <a
      href={site.phoneHref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out hover:-translate-y-0.5",
        dark
          ? "border-hairline-invert text-ink-foreground hover:bg-ink-foreground/10"
          : "border-hairline text-foreground hover:border-accent hover:text-accent",
      )}
    >
      <Phone className="size-4" /> {site.phone}
    </a>
  );
}

export function CTABand({
  title = "Tell us what you're building.",
  lead = "Send your product, quantity and delivery location. Our team responds with a written quotation.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="border-y border-hairline bg-concrete">
      <Container className="flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 className="display-2">{title}</h2>
          <p className="mt-4 text-muted-foreground">{lead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <QuoteCTA />
          <WhatsAppCTA />
          <CallCTA />
          <MapCTA />
          <ReviewsCTA />
        </div>
      </Container>
    </section>
  );
}

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  if (!images.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {images.map((src, i) => (
        <figure
          key={src + i}
          className={cn("hover-lift overflow-hidden rounded-2xl bg-concrete", i === 0 && "sm:col-span-2")}
        >
          <div className="media-zoom">
            <img
              src={src}
              alt={`${alt} — image ${i + 1}`}
              loading="lazy"
            decoding="async"
              className={cn("w-full object-cover", i === 0 ? "aspect-16/9" : "aspect-4/3")}
            />
          </div>
          <figcaption className="flex flex-wrap items-center gap-3 border-t border-hairline bg-background px-5 py-4">
            <QuoteCTA label="Request a Quote" />
            <WhatsAppCTA message={`Hello Midrift, I'm interested in ${alt}.`} />
            <EmailCTA subject={`Quotation request — ${alt}`} />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-hairline border-y border-hairline">
      {rows.map((r) => (
        <div key={r.label} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
          <dt className="text-sm font-semibold">{r.label}</dt>
          <dd className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PhotoSlots({
  slots,
  title = "Product photography",
}: {
  slots: { label: string; note: string; image?: string; cta: { label: string; message: string } }[];
  title?: string;
}) {
  if (!slots?.length) return null;
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {slots.map((s) => (
          <figure
            key={s.label}
            className={`hover-lift flex flex-col overflow-hidden rounded-3xl border bg-concrete ${
              s.image ? "border-hairline" : "border-dashed border-hairline"
            }`}
          >
            {s.image ? (
              <img
                src={s.image}
                alt={s.label}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full object-cover"
              />
            ) : (
              <div className="flex aspect-4/3 w-full flex-col items-center justify-center gap-2 px-6 text-center">
                <span className="font-display text-lg tracking-tight">{s.label}</span>
                <span className="max-w-xs text-sm text-muted-foreground">{s.note}</span>
              </div>
            )}
            <figcaption className="flex flex-wrap items-center gap-3 border-t border-hairline bg-background px-6 py-5">
              <QuoteCTA label={s.cta.label} />
              <WhatsAppCTA message={s.cta.message} />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
