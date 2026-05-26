'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, DownloadSimple, GithubLogo, type Icon as PhosphorIcon } from '@phosphor-icons/react';
import InstallModal, { type InstallGuide } from './InstallModal';
import styles from './ProjectModal.module.css';

export type Project = {
  name: string;
  tagline: string;
  desc: string;
  Icon?: PhosphorIcon;
  iconSrc?: string;
  bg?: string;
  iconColor?: string;
  tags: string[];
  githubUrl?: string;
  downloadUrl?: string;
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

            {project.features && project.features.length > 0 && (
              <div className={styles.features}>
                {project.features.map((f) => (
                  <div key={f.title} className={styles.feature}>
                    <strong className={styles.featureTitle}>{f.title}</strong>
                    <span className={styles.featureDesc}>{f.desc}</span>
                  </div>
                ))}
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
