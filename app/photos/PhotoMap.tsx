"use client";

import { useState, useMemo } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import type { Photo } from "@/lib/photos";
import { useMapViewport } from "./useMapViewport";
import { useSupercluster } from "./useSupercluster";
import ThumbnailMarker from "./ThumbnailMarker";
import Lightbox from "./Lightbox";
import styles from "./PhotoMap.module.css";

interface PhotoMapProps {
  photos: Photo[];
}

function PhotoMapInner({ photos }: PhotoMapProps) {
  const [lightboxAlbum, setLightboxAlbum] = useState<{
    photos: Photo[];
    index: number;
  } | null>(null);

  const groupMap = useMemo(() => {
    const map = new Map<number, Photo[]>();
    for (const p of photos) {
      const arr = map.get(p.group) ?? [];
      arr.push(p);
      map.set(p.group, arr);
    }
    return map;
  }, [photos]);

  const defaultBounds = useMemo(() => {
    let west = Infinity,
      south = Infinity,
      east = -Infinity,
      north = -Infinity;
    for (const p of photos) {
      if (p.lng < west) west = p.lng;
      if (p.lat < south) south = p.lat;
      if (p.lng > east) east = p.lng;
      if (p.lat > north) north = p.lat;
    }
    return { west, south, east, north, padding: 60 };
  }, [photos]);

  const { viewport, onCameraChanged } = useMapViewport();
  const markers = useSupercluster(photos, viewport);

  function openAlbum(photo: Photo, explicit?: Photo[]) {
    const albumPhotos = explicit ?? groupMap.get(photo.group) ?? [photo];
    const idx = albumPhotos.findIndex((p) => p.id === photo.id);
    setLightboxAlbum({ photos: albumPhotos, index: Math.max(idx, 0) });
  }

  return (
    <>
      <GoogleMap
        className={styles.map}
        defaultBounds={defaultBounds}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
        gestureHandling="greedy"
        disableDefaultUI
        onCameraChanged={onCameraChanged}
      >
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.type === "cluster" ? `c-${marker.id}` : `p-${marker.id}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              if (marker.type === "cluster") {
                openAlbum(marker.photos[0], marker.photos);
              } else {
                openAlbum(marker.photo);
              }
            }}
          >
            <ThumbnailMarker marker={marker} />
          </AdvancedMarker>
        ))}
      </GoogleMap>
      {lightboxAlbum && (
        <Lightbox
          photos={lightboxAlbum.photos}
          initialIndex={lightboxAlbum.index}
          onClose={() => setLightboxAlbum(null)}
        />
      )}
    </>
  );
}

export default function PhotoMap({ photos }: PhotoMapProps) {
  if (photos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>
          No geotagged photos yet. Add photos with GPS data to{" "}
          <code>public/photos/originals/</code> and run the generate script.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
      <PhotoMapInner photos={photos} />
    </APIProvider>
  );
}
