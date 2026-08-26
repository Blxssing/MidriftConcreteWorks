import { cn } from "@/lib/utils";

/** Infinite horizontal text marquee (duplicated track for a seamless loop). */
export function TextMarquee({
  items,
  className,
  fast,
}: {
  items: readonly string[];
  className?: string;
  fast?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("group relative overflow-hidden border-y border-hairline py-5", className)}>
      <div className={cn("marquee-track group-hover:[animation-play-state:paused]", fast && "marquee-fast")}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-8 pr-8">
            <span className="font-display text-xl tracking-tight md:text-3xl">{item}</span>
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Infinite horizontal image strip. */
export function ImageMarquee({ images }: { images: { src: string; alt: string }[] }) {
  const doubled = [...images, ...images];
  return (
    <div className="group relative overflow-hidden py-2">
      <div className="marquee-track group-hover:[animation-play-state:paused]">
        {doubled.map((img, i) => (
          <figure key={`${img.src}-${i}`} className="media-zoom mr-4 w-[68vw] shrink-0 rounded-3xl md:w-[34vw]">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
            decoding="async"
              className="aspect-4/3 w-full rounded-3xl object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
