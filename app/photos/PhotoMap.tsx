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
      // Add source with clustering
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

      // Cluster circles
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "photos",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#8B1A1A",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18, 5,
            24, 10,
            30,
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#f5f0eb",
        },
      });

      // Cluster count labels
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "photos",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 13,
        },
        paint: {
          "text-color": "#f5f0eb",
        },
      });

      // Individual photo pins
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "photos",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#8B1A1A",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#f5f0eb",
        },
      });

      // Click on cluster → zoom in
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        if (!features.length) return;
        const clusterId = features[0].properties?.cluster_id;
        const source = map.getSource("photos") as mapboxgl.GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          const geometry = features[0].geometry;
          if (geometry.type === "Point") {
            map.easeTo({
              center: geometry.coordinates as [number, number],
              zoom: zoom ?? 10,
            });
          }
        });
      });

      // Click on pin → show popup
      map.on("click", "unclustered-point", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        const props = feature.properties!;
        const geometry = feature.geometry;
        if (geometry.type !== "Point") return;
        const coordinates = geometry.coordinates.slice() as [number, number];

        // Wrap longitude for maps that span the date line
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const popup = new mapboxgl.Popup({ offset: 12, maxWidth: "240px" })
          .setLngLat(coordinates)
          .setHTML(
            `<div class="${styles.popup}" data-photo-id="${props.id}">
              <img src="${props.thumb}" alt="${props.caption}" class="${styles.popupImage}" />
              <p class="${styles.popupCaption}">${props.caption}</p>
            </div>`
          )
          .addTo(map);

        // Click on popup card → open lightbox
        const el = popup.getElement();
        if (!el) return;
        const card = el.querySelector(`.${styles.popup}`) as HTMLElement | null;
        if (card) {
          card.addEventListener("click", () => {
            const photo = photos.find((p) => p.id === props.id);
            if (photo) {
              popup.remove();
              setLightboxPhoto(photo);
            }
          });
        }
      });

      // Cursor style changes
      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = "";
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
        <p>No geotagged photos yet. Add photos with GPS data to <code>public/photos/originals/</code> and run the generate script.</p>
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
