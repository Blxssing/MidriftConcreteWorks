import { cn } from "@/lib/utils";

/**
 * The single source of truth for how "Midrift Concrete Works" is typeset.
 * One uniform, elegant treatment — same family, weight and tracking throughout.
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
    sm: "text-[16px] md:text-[17px]",
    md: "text-lg md:text-xl",
    lg: "text-2xl md:text-3xl",
  }[size];

  return (
    <span className={cn("wordmark", scale, className)}>
      Midrift{stacked ? <br /> : " "}Concrete Works
    </span>
  );
}
