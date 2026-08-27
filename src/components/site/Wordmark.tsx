import { cn } from "@/lib/utils";

/**
 * The single source of truth for how "Midrift Concrete Works" is typeset.
 * One uniform, elegant treatment — same family, weight and tracking throughout,
 * with a soft iOS-style entrance animation.
 */
export function Wordmark({
  size = "md",
  stacked = false,
  animate = true,
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  stacked?: boolean;
  animate?: boolean;
  className?: string;
}) {
  const scale = {
    sm: "text-[19px] md:text-[22px]",
    md: "text-xl md:text-2xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-6xl",
  }[size];

  return (
    <span className={cn("wordmark", scale, animate && "wordmark-animate", className)}>
      Midrift{stacked ? <br /> : " "}Concrete Works
    </span>
  );
}
