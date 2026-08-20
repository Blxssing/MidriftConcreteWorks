import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/data/site";

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
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      {image && (
        <img
          src={image}
          alt={imageAlt ?? title}
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-25"
        />
      )}
      <Container className="relative py-20 md:py-32">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl display-1">{title}</h1>
        {lead && <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-foreground/70 md:text-lg">{lead}</p>}
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
      className="inline-flex items-center justify-center bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90 rounded-full"
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
      className={cn(
        "inline-flex items-center justify-center gap-2 border px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
        dark
          ? "border-hairline-invert text-ink-foreground hover:bg-ink-foreground/10"
          : "border-foreground text-foreground hover:bg-foreground hover:text-background",
      )}
    >
      <MessageCircle className="size-4" /> WhatsApp Sales
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
        <figure key={src + i} className={cn("overflow-hidden bg-concrete", i === 0 && "sm:col-span-2")}>
          <img
            src={src}
            alt={`${alt} — image ${i + 1}`}
            loading="lazy"
            className={cn("w-full rounded-2xl object-cover", i === 0 ? "aspect-16/9" : "aspect-4/3")}
          />
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
