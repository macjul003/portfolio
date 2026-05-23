'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { useFirstVisit } from './FirstVisitProvider';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AnimateIn({ children, delay = 0, className, style }: Props) {
  const isFirst = useFirstVisit();
  const controls = useAnimation();

  useEffect(() => {
    if (isFirst) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: EASE },
      });
    } else {
      controls.set({ opacity: 1, y: 0 });
    }
  }, [isFirst, controls, delay]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
