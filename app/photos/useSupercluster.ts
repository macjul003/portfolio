import { useMemo } from "react";
import Supercluster from "supercluster";
import type { Photo } from "@/lib/photos";
import type { Viewport } from "./useMapViewport";

interface PhotoProperties {
  photo: Photo;
}

export interface ClusterPoint {
  type: "photo";
  id: string;
  lat: number;
  lng: number;
  photo: Photo;
}

export interface ClusterGroup {
  type: "cluster";
  id: number;
  lat: number;
  lng: number;
  count: number;
  photos: Photo[];
}

export type MapMarker = ClusterPoint | ClusterGroup;

export function useSupercluster(
  photos: Photo[],
  viewport: Viewport | null,
): MapMarker[] {
  const index = useMemo(() => {
    const sc = new Supercluster<PhotoProperties>({
      radius: 50,
      maxZoom: 14,
    });
    sc.load(
      photos.map((p) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
        properties: { photo: p },
      })),
    );
    return sc;
  }, [photos]);

  return useMemo(() => {
    if (!viewport) return [];

    const clusters = index.getClusters(viewport.bbox, viewport.zoom);

    return clusters.map((feature): MapMarker => {
      const [lng, lat] = feature.geometry.coordinates;
      const props = feature.properties;

      if ("cluster" in props && props.cluster) {
        const clusterId = props.cluster_id;
        const leaves = index.getLeaves(clusterId, Infinity);
        const clusterPhotos = leaves.map((l) => l.properties.photo);

        return {
          type: "cluster",
          id: clusterId,
          lat,
          lng,
          count: props.point_count,
          photos: clusterPhotos,
        };
      }

      return {
        type: "photo",
        id: props.photo.id,
        lat,
        lng,
        photo: props.photo,
      };
    });
  }, [index, viewport]);
}
