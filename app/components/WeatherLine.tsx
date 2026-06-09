'use client';

import { useEffect, useState } from 'react';
import styles from './WeatherLine.module.css';

export default function WeatherLine() {
  const [data, setData] = useState<{ c: number; f: number } | null>(null);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=45.5152&longitude=-122.6784&current=temperature_2m'
    )
      .then((r) => r.json())
      .then((j) => {
        const c = j.current?.temperature_2m;
        if (typeof c === 'number') {
          setData({ c: Math.round(c), f: Math.round((c * 9) / 5 + 32) });
        }
      })
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className={styles.weather}>
      <span className={styles.value}>
        {data.c}°C / {data.f}°F · Portland
      </span>
    </div>
  );
}
