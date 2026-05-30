'use client';

import { useEffect, useState } from 'react';
import styles from './WeatherLine.module.css';

function message(tempC: number, code: number): string {
  if (code >= 95) return "Thunder's rolling in — stay cozy ⚡";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "Rain's doing its thing today.";
  if (code >= 71 && code <= 77) return "Snow-day vibes.";
  if (code === 45 || code === 48) return "Bit of fog hanging around.";
  if (tempC >= 34) return "Shade feels extra nice today :)";
  if (tempC >= 28) return "Perfect day for an iced coffee.";
  if (tempC >= 22) return "Genuinely lovely out right now.";
  if (tempC >= 15) return "Light-jacket weather.";
  return "A bit nippy — bundle up.";
}

export default function WeatherLine() {
  const [data, setData] = useState<{ c: number; f: number; msg: string } | null>(null);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,weather_code'
    )
      .then((r) => r.json())
      .then((j) => {
        const c = j.current?.temperature_2m;
        const code = j.current?.weather_code ?? 0;
        if (typeof c === 'number') {
          setData({ c: Math.round(c), f: Math.round((c * 9) / 5 + 32), msg: message(c, code) });
        }
      })
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className={styles.weather}>
      <span className={styles.tooltip}>{data.msg}</span>
      <span className={styles.value}>
        {data.c}°C / {data.f}°F · Chennai
      </span>
    </div>
  );
}
