import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { QuoteCTA } from "./primitives";

/**
 * Confirmed delivery service areas only. Add an entry here once an area has been
 * verified by the logistics desk — nothing is shown on the map that is not confirmed.
 */
export const serviceAreas = [
  {
    name: "Nakuru (yard and town)",
    note: "Our production yard on Old Nairobi Road — same-day loading and local delivery.",
    lat: -0.3031,
    lng: 36.08,
    radiusKm: 15,
  },
];

const CENTER: [number, number] = [-0.3031, 36.08];

/**
 * Interactive map of confirmed delivery service areas (OpenStreetMap tiles, no API key).
 * Leaflet is imported lazily after hydration so it never ships in the SSR bundle.
 */
export function DeliveryMap() {
  const el = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !el.current || mapRef.current) return;

      const map = L.map(el.current, { scrollWheelZoom: false }).setView(CENTER, 10);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      for (const area of serviceAreas) {
        L.circle([area.lat, area.lng], {
          radius: area.radiusKm * 1000,
          color: "#e2571f",
          weight: 2,
          fillColor: "#e2571f",
          fillOpacity: 0.15,
        })
          .addTo(map)
          .bindPopup(`<strong>${area.name}</strong><br/>${area.note}`);
      }

      mapRef.current = map;
      setTimeout(() => map.invalidateSize(), 80);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="soft-card overflow-hidden border border-hairline bg-card">
      <div
        ref={el}
        role="application"
        aria-label="Interactive map showing Midrift's confirmed delivery service areas"
        className="h-[320px] w-full md:h-[420px]"
      />
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8">
        <div>
          <p className="eyebrow">Confirmed service areas</p>
          <ul className="mt-4 space-y-3">
            {serviceAreas.map((a) => (
              <li key={a.name} className="text-sm">
                <span className="font-semibold">{a.name}</span>
                <span className="mt-1 block text-muted-foreground">{a.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            Outside these areas we deliver by arrangement — send your site location and load size and we will confirm
            transport cost and lead time.
          </p>
        </div>
        <QuoteCTA label="Request Delivery Quote" />
      </div>
    </div>
  );
}

export default DeliveryMap;
