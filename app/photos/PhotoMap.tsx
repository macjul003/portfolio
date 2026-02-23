"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Photo } from "@/lib/photos";
import Lightbox from "./Lightbox";
import styles from "./PhotoMap.module.css";

interface PhotoMapProps {
  photos: Photo[];
}

export default function PhotoMap({ photos }: PhotoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  // Keep a ref so event listeners always see the latest setter
  const setLightboxRef = useRef(setLightboxPhoto);
  setLightboxRef.current = setLightboxPhoto;

  useEffect(() => {
    if (!containerRef.current || photos.length === 0) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [photos[0].lng, photos[0].lat],
      zoom: 2,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("photos", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: photos.map((p) => ({
            type: "Feature" as const,
            geometry: {
              type: "Point" as const,
              coordinates: [p.lng, p.lat],
            },
            properties: {
              id: p.id,
              src: p.src,
              thumb: p.thumb,
              caption: p.caption,
              date: p.date,
              camera: p.camera,
            },
          })),
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Invisible layer to force Mapbox to load source tiles
      map.addLayer({
        id: "photos-hidden",
        type: "circle",
        source: "photos",
        paint: { "circle-radius": 0, "circle-opacity": 0 },
      });

      // ---- Custom HTML markers ----
      const tracked: Record<
        string,
        { marker: mapboxgl.Marker; element: HTMLDivElement }
      > = {};
      let onScreen: Record<string, boolean> = {};

      function createEl(
        isCluster: boolean,
        props: Record<string, any>,
      ): HTMLDivElement {
        const el = document.createElement("div");
        el.className = isCluster ? styles.clusterMarker : styles.photoMarker;

        const card = document.createElement("div");
        card.className = styles.markerCard;

        const img = document.createElement("img");
        img.className = styles.markerImage;
        if (!isCluster) {
          img.src = props.thumb;
          img.alt = props.caption || "";
        }
        card.appendChild(img);

        if (isCluster) {
          const count = document.createElement("span");
          count.className = styles.markerCount;
          count.textContent =
            props.point_count_abbreviated ?? String(props.point_count);
          card.appendChild(count);
        }

        el.appendChild(card);

        const pointer = document.createElement("div");
        pointer.className = styles.markerPointer;
        el.appendChild(pointer);

        return el;
      }

      function updateMarkers() {
        const features = map.querySourceFeatures("photos");
        const next: Record<string, boolean> = {};

        for (const feature of features) {
          if (feature.geometry.type !== "Point") continue;
          const coords = feature.geometry.coordinates as [number, number];
          const props = feature.properties!;
          const isCluster = !!props.cluster;
          const id = isCluster
            ? `cluster-${props.cluster_id}`
            : `photo-${props.id}`;

          if (next[id]) continue; // deduplicate
          next[id] = true;

          if (!tracked[id]) {
            const element = createEl(isCluster, props);
            const marker = new mapboxgl.Marker({
              element,
              anchor: "bottom",
            }).setLngLat(coords);

            // Load a representative thumbnail for clusters
            if (isCluster) {
              const source = map.getSource("photos") as mapboxgl.GeoJSONSource;
              source.getClusterLeaves(
                props.cluster_id,
                1,
                0,
                (err, leaves) => {
                  if (!err && leaves?.length) {
                    const thumb = leaves[0].properties?.thumb;
                    if (thumb) {
                      const img = element.querySelector("img");
                      if (img) img.src = thumb;
                    }
                  }
                },
              );
            }

            // Click handlers
            element.addEventListener("click", (e) => {
              e.stopPropagation();
              if (isCluster) {
                const source = map.getSource(
                  "photos",
                ) as mapboxgl.GeoJSONSource;
                source.getClusterExpansionZoom(
                  props.cluster_id,
                  (err, zoom) => {
                    if (err) return;
                    map.easeTo({ center: coords, zoom: zoom ?? 10 });
                  },
                );
              } else {
                const photo = photos.find((p) => p.id === props.id);
                if (photo) setLightboxRef.current(photo);
              }
            });

            tracked[id] = { marker, element };
          }

          if (!onScreen[id]) {
            tracked[id].marker.addTo(map);
          }
          tracked[id].marker.setLngLat(coords);
        }

        // Remove markers no longer visible
        for (const id in onScreen) {
          if (!next[id]) {
            tracked[id].marker.remove();
            delete tracked[id];
          }
        }

        onScreen = next;
      }

      map.on("render", () => {
        if (!map.isSourceLoaded("photos")) return;
        updateMarkers();
      });

      // Fit map to show all photos
      const bounds = new mapboxgl.LngLatBounds();
      photos.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 12 });
    });

    return () => {
      map.remove();
    };
  }, [photos]);

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
    <>
      <div ref={containerRef} className={styles.map} />
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </>
  );
}
