'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, CopySimple, Check, ArrowSquareOut, ArrowsClockwise } from '@phosphor-icons/react';
import styles from './InstallModal.module.css';

export type InstallGuide = {
  appName: string;
  appFileName: string;
  downloadUrl: string;
  homebrewTap: string;
  homebrewCask: string;
};

interface Props {
  guide: InstallGuide | null;
  onClose: () => void;
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.codeBlock}>
      <code className={styles.code}>{code}</code>
      <button className={styles.copyBtn} onClick={copy} aria-label="Copy">
        {copied ? <Check size={14} weight="bold" /> : <CopySimple size={14} weight="bold" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default function InstallModal({ guide, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<'direct' | 'homebrew'>('direct');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!guide) { setTab('direct'); return; }
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [guide, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {guide && (
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

            <h2 className={styles.title}>How to install {guide.appName}</h2>
            <p className={styles.intro}>
              Requires <strong>Apple Silicon (M-series) Mac</strong>. The app is not signed with an Apple Developer certificate — the steps below clear macOS Gatekeeper in under a minute.
            </p>

            {/* Tab toggle */}
            <div className={styles.tabs}>
              <button
                className={`${styles.tab}${tab === 'direct' ? ` ${styles.tabActive}` : ''}`}
                onClick={() => setTab('direct')}
              >
                Download &amp; install
              </button>
              <button
                className={`${styles.tab}${tab === 'homebrew' ? ` ${styles.tabActive}` : ''}`}
                onClick={() => setTab('homebrew')}
              >
                Homebrew
              </button>
            </div>

            {/* Download & install */}
            {tab === 'direct' && (
              <div className={styles.steps}>
                <div className={styles.step}>
                  <span className={styles.stepNum}>1</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepText}>
                      <strong>Download</strong> the latest release and unzip it.
                    </p>
                    <a
                      href={guide.downloadUrl}
                      className={styles.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download {guide.appName}.zip
                      <ArrowSquareOut size={13} weight="bold" />
                    </a>
                  </div>
                </div>

                <div className={styles.step}>
                  <span className={styles.stepNum}>2</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepText}>
                      Open <strong>Terminal</strong> and run this command to remove the quarantine flag:
                    </p>
                    <CodeBlock code={`xattr -cr ${guide.appFileName}`} />
                  </div>
                </div>

                <div className={styles.step}>
                  <span className={styles.stepNum}>3</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepText}>
                      Double-click <strong>{guide.appFileName}</strong> to launch. macOS will offer to move it to Applications — click <strong>Move to Applications</strong>.
                    </p>
                  </div>
                </div>

                <div className={styles.tip}>
                  <ArrowsClockwise size={16} weight="bold" className={styles.tipIcon} />
                  <span>
                    <strong>Easy updating</strong> — download the new zip, replace the app in Applications, and re-run the xattr command.
                  </span>
                </div>
              </div>
            )}

            {/* Homebrew */}
            {tab === 'homebrew' && (
              <div className={styles.steps}>
                <p className={styles.homebrewIntro}>
                  Install and keep {guide.appName} up to date with Homebrew.
                </p>

                <div className={styles.step}>
                  <span className={styles.stepNum}>1</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepText}>Add the tap:</p>
                    <CodeBlock code={`brew tap ${guide.homebrewTap}`} />
                  </div>
                </div>

                <div className={styles.step}>
                  <span className={styles.stepNum}>2</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepText}>Install:</p>
                    <CodeBlock code={`brew install --cask ${guide.homebrewCask}`} />
                  </div>
                </div>

                <div className={styles.tip}>
                  <ArrowsClockwise size={16} weight="bold" className={styles.tipIcon} />
                  <span>
                    <strong>Easy updating</strong> — run{' '}
                    <code className={styles.inlineCode}>brew upgrade --cask {guide.homebrewCask}</code>{' '}
                    anytime to get the latest version.
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
