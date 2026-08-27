import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";

/** Nakuru — neutral starting view; never submitted unless the user picks a point. */
const START: [number, number] = [-0.3031, 36.08];

/**
 * Lightweight click-to-pick map (OpenStreetMap tiles, no API key). The customer
 * pans, zooms and taps to place the pin; coordinates are reported upward only
 * when they actually choose a point.
 */
export function LocationPicker({
  value,
  onPick,
}: {
  value?: { lat: number; lng: number } | undefined;
  onPick: (coords: { lat: number; lng: number }) => void;
}) {
  const el = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !el.current || mapRef.current) return;

      const map = L.map(el.current, { attributionControl: true }).setView(
        value ? [value.lat, value.lng] : START,
        value ? 15 : 12,
      );
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="width:18px;height:18px;border-radius:9999px;background:#e2571f;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.35)"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const place = (lat: number, lng: number) => {
        if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
        else markerRef.current = L.marker([lat, lng], { icon, keyboard: true }).addTo(map);
        onPickRef.current({ lat, lng });
      };

      if (value) place(value.lat, value.lng);
      map.on("click", (e) => place(e.latlng.lat, e.latlng.lng));
      mapRef.current = map;
      setTimeout(() => map.invalidateSize(), 80);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value && mapRef.current) mapRef.current.setView([value.lat, value.lng], 15);
  }, [value]);

  return (
    <div
      ref={el}
      role="application"
      aria-label="Map — tap or click to place your delivery location pin"
      className="h-64 w-full overflow-hidden rounded-2xl border border-hairline"
    />
  );
}

export default LocationPicker;
