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
    sm: "text-[22px] md:text-[26px]",
    md: "text-[25px] sm:text-[28px] md:text-[32px]",
    lg: "text-[38px] md:text-5xl",
    xl: "text-[44px] sm:text-6xl md:text-7xl lg:text-[5.75rem]",
  }[size];


  return (
    <span className={cn("wordmark", scale, animate && "wordmark-animate", animate && "wordmark-sheen", className)}>
      Midrift{stacked ? <br /> : " "}Concrete Works
    </span>
  );
}
