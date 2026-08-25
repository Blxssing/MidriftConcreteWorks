import { cn } from "@/lib/utils";

/**
 * The single source of truth for how "Midrift Concrete Works" is typeset.
 * Use this everywhere the company name appears as a mark.
 */
export function Wordmark({
  size = "md",
  stacked = false,
  className,
}: {
  size?: "sm" | "md" | "lg";
  stacked?: boolean;
  className?: string;
}) {
  const scale = {
    sm: "text-[15px] md:text-base",
    md: "text-lg md:text-xl",
    lg: "text-2xl md:text-3xl",
  }[size];

  return (
    <span className={cn("wordmark", scale, className)}>
      <span className="wordmark-primary">Midrift</span>
      {stacked ? <br /> : " "}
      <span className="wordmark-secondary">Concrete Works</span>
    </span>
  );
}

export function WordmarkBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center rounded-[13px] bg-accent font-display text-base font-semibold text-accent-foreground shadow-[0_6px_18px_-8px_color-mix(in_oklab,var(--accent-raw)_90%,transparent)]",
        className,
      )}
    >
      M
    </span>
  );
}
