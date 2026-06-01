'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, DownloadSimple, GithubLogo, type Icon as PhosphorIcon } from '@phosphor-icons/react';
import InstallModal, { type InstallGuide } from './InstallModal';
import styles from './ProjectModal.module.css';

export type Project = {
  name: string;
  tagline: string;
  desc: string;
  why?: string;
  stats?: Array<{ label: string; value: string }>;
  Icon?: PhosphorIcon;
  iconSrc?: string;
  bg?: string;
  iconColor?: string;
  tags: string[];
  githubUrl?: string;
  downloadUrl?: string;
  bookmarklet?: string;
  image?: string;
  video?: string;
  upcoming?: boolean;
  features?: Array<{ title: string; desc: string }>;
  installGuide?: InstallGuide;
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const dragRef = useRef<HTMLAnchorElement>(null);

  // Set the bookmarklet's javascript: href directly on the node — React strips
  // javascript: URLs from JSX, but the raw attribute is required for drag-to-install.
  // Reveal the drag tooltip shortly after the modal's open animation settles.
  useEffect(() => {
    setShowTip(false);
    if (!project?.bookmarklet) return;
    if (dragRef.current) dragRef.current.setAttribute('href', project.bookmarklet);
    const show = setTimeout(() => setShowTip(true), 450);
    const hide = setTimeout(() => setShowTip(false), 4000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [project]);

  useEffect(() => {
    if (!project) { setInstallOpen(false); return; }
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const portal = createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.close} onClick={onClose} aria-label="Close">
              <X size={16} weight="bold" />
            </button>

            {project.iconSrc ? (
              <img src={project.iconSrc} alt={project.name} className={styles.iconImg} />
            ) : project.Icon ? (
              <div className={styles.iconWrap} style={{ background: project.bg }}>
                <project.Icon size={44} weight="duotone" color={project.iconColor} />
              </div>
            ) : null}

            <h2 className={styles.name}>{project.name}</h2>
            <p className={styles.tagline}>{project.tagline}</p>
            <p className={styles.desc}>{project.desc}</p>

            <div className={styles.actions}>
              {project.bookmarklet && (
                <span className={styles.dragWrap}>
                  <a
                    ref={dragRef}
                    className={styles.btnPrimary}
                    draggable
                    onClick={(e) => e.preventDefault()}
                  >
                    Edit Page ✏️
                  </a>
                  <span
                    className={`${styles.dragTip} ${showTip ? styles.dragTipVisible : ''}`}
                    role="tooltip"
                  >
                    Drag me to your bookmarks bar to install
                  </span>
                </span>
              )}
              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  className={styles.btnPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadSimple size={15} weight="bold" />
                  Download
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className={styles.btnSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogo size={15} weight="bold" />
                  GitHub
                </a>
              )}
            </div>

            {project.installGuide && (
              <p className={styles.installLink}>
                <button className={styles.installTrigger} onClick={() => setInstallOpen(true)}>
                  How to install
                </button>
              </p>
            )}

            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.imageWrap}>
              {project.video ? (
                <video src={project.video} className={styles.image} autoPlay loop muted playsInline />
              ) : project.image ? (
                <img src={project.image} alt={`${project.name} screenshot`} className={styles.image} />
              ) : (
                <div className={styles.imagePlaceholder} />
              )}
            </div>

            {(project.why || project.stats) && (
              <div className={styles.details}>
                {project.why && (
                  <div className={styles.why}>
                    <span className={styles.whyLabel}>Why I built it</span>
                    <p className={styles.whyText}>{project.why}</p>
                  </div>
                )}
                {project.stats && project.stats.length > 0 && (
                  <div className={styles.stats}>
                    {project.stats.map((s) => (
                      <div key={s.label} className={styles.stat}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      {portal}
      <InstallModal
        guide={installOpen && project?.installGuide ? project.installGuide : null}
        onClose={() => setInstallOpen(false)}
      />
    </>
  );
}
