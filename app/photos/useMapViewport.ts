import { useState, useCallback } from "react";
import { useMap, type MapCameraChangedEvent } from "@vis.gl/react-google-maps";

export interface Viewport {
  bbox: [number, number, number, number]; // [westLng, southLat, eastLng, northLat]
  zoom: number;
}

export function useMapViewport() {
  const map = useMap();
  const [viewport, setViewport] = useState<Viewport | null>(null);

  const onCameraChanged = useCallback(
    (ev: MapCameraChangedEvent) => {
      const detail = ev.detail;
      const bounds = detail.bounds;
      if (!bounds) return;
      setViewport({
        bbox: [bounds.west, bounds.south, bounds.east, bounds.north],
        zoom: Math.floor(detail.zoom),
      });
    },
    [],
  );

  return { viewport, onCameraChanged };
}
