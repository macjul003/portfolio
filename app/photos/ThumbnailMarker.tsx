import type { MapMarker } from "./useSupercluster";
import styles from "./PhotoMap.module.css";

interface ThumbnailMarkerProps {
  marker: MapMarker;
}

export default function ThumbnailMarker({ marker }: ThumbnailMarkerProps) {
  const isCluster = marker.type === "cluster";
  const thumb =
    marker.type === "photo" ? marker.photo.thumb : marker.photos[0]?.thumb;
  const alt =
    marker.type === "photo" ? marker.photo.caption || "" : "";

  return (
    <div className={isCluster ? styles.clusterMarker : styles.photoMarker}>
      <div className={styles.markerCard}>
        <img className={styles.markerImage} src={thumb} alt={alt} />
        {isCluster && (
          <span className={styles.markerCount}>{marker.count}</span>
        )}
      </div>
      <div className={styles.markerPointer} />
    </div>
  );
}
