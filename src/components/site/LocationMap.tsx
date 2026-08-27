import { MapPin, Clock } from "lucide-react";
import { site } from "@/data/site";

/**
 * Embedded Google Map of the Midrift yard with an explicit
 * "Open in Google Maps" button and the current opening hours.
 */
export function LocationMap() {
  return (
    <div className="soft-card overflow-hidden border border-hairline bg-card">
      <iframe
        title="Map of Midrift Concrete Works, Old Nairobi Road, Nakuru"
        src={site.mapsEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[320px] w-full border-0 md:h-[420px]"
      />
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:justify-between md:p-8">
        <div>
          <p className="eyebrow">Yard location</p>
          <p className="mt-2 flex items-start gap-2 text-sm font-semibold">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            {site.address}
          </p>
          <p className="eyebrow mt-6 flex items-center gap-2">
            <Clock className="size-4 text-accent" aria-hidden="true" /> Opening hours
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {site.hoursRows.map((r) => (
              <li key={r.day} className="flex justify-between gap-8 sm:w-72">
                <span className="text-muted-foreground">{r.day}</span>
                <span className="font-semibold">{r.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the Midrift Concrete Works yard location in Google Maps"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-all duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
        >
          <MapPin className="size-4" aria-hidden="true" /> Open in Google Maps
        </a>
      </div>
    </div>
  );
}
