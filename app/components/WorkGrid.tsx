import styles from '../(site)/page.module.css';

type WorkItem = {
  client: string;
  date: string;
  title: string;
  href: string;
  thumbnail?: string;
  external: boolean;
};

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <a
      href={item.href}
      className={styles.workCard}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
    >
      <div className={styles.workImageWrap}>
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.title} className={styles.workImage} />
        ) : (
          <div className={styles.workImage} />
        )}
        {item.external && (
          <span className={styles.workExternalBadge}>
            <i className="ph-bold ph-arrow-up-right" />
          </span>
        )}
      </div>
      <div className={styles.workMeta}>
        <p className={styles.workClient}>{item.client} · {item.date}</p>
        <h3 className={styles.workTitle}>{item.title}</h3>
      </div>
    </a>
  );
}

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className={styles.workList}>
      {items.map((item) => (
        <WorkCard key={item.title} item={item} />
      ))}
    </div>
  );
}
