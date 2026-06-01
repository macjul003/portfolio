import styles from './WorkCarousel.module.css';

export default function WorkCarousel({ images }: { images: string[] }) {
  // Duplicate the list so the marquee loops seamlessly at -50%.
  const loop = [...images, ...images];

  return (
    <a href="/work" className={styles.card} aria-label="View all work">
      <div className={styles.fade}>
        <div className={styles.track}>
          {loop.map((src, i) => (
            <div className={styles.thumb} key={i}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.scrim} />
      <div className={styles.content}>
        <span className={styles.heading}>
          View all work <i className="ph-bold ph-arrow-right" />
        </span>
        <span className={styles.subtitle}>All work, AI experiments and prototypes</span>
      </div>
    </a>
  );
}
