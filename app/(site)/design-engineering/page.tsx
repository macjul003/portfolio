import type { Metadata } from 'next';
import styles from './page.module.css';
import DockDemo from './DockDemo';

export const metadata: Metadata = {
  title: 'Design Engineering',
  description:
    'A notebook of interesting UI components and how they actually work — the elegant version, and the one that ships.',
};

const naiveCode = `onpointermove = e => document.querySelectorAll(".dock>*").forEach(el => {
  const r = el.getBoundingClientRect();
  const t = Math.max(0, 1 - Math.abs(e.clientX - r.x - r.width / 2) / 120);
  el.style.scale = 1 + t * .5;
});`;

const shippedCss = `/* grow upward from the baseline, not outward from the center */
.dock > * {
  transform-origin: bottom;
  transition: transform .12s ease-out;
}`;

const shippedCode = `const dock = document.querySelector(".dock");
const items = [...dock.children];
let centers = null; // measured once, while at rest

dock.addEventListener("pointerenter", () => {
  centers = items.map(el => {
    const r = el.getBoundingClientRect();
    return r.x + r.width / 2; // resting center — never re-read while scaled
  });
});

dock.addEventListener("pointermove", e => {
  const scale = centers.map(cx =>
    1 + Math.max(0, 1 - Math.abs(e.clientX - cx) / 120) * 0.6
  );

  items.forEach((el, i) => {
    // push neighbours aside by half the extra width each one gained
    let shift = 0;
    centers.forEach((cx, j) => {
      if (j === i) return;
      const half = (scale[j] - 1) * el.offsetWidth / 2;
      shift += cx < centers[i] ? half : -half;
    });
    el.style.transform = \`translateX(\${shift}px) scale(\${scale[i]})\`;
  });
});

dock.addEventListener("pointerleave", () => {
  centers = null;
  items.forEach(el => (el.style.transform = "")); // un-puff
});`;

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <figure className={styles.code}>
      <figcaption className={styles.codeLabel}>{label}</figcaption>
      <pre>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export default function DesignEngineeringPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.heading}>Design Engineering</h1>
        <p className={styles.subheading}>
          A notebook of interesting components and how they actually work — the elegant version,
          and the one that ships.
        </p>
      </header>

      <article className={styles.entry}>
        <div className={styles.entryHead}>
          <span className={styles.entryNum}>01</span>
          <h2 className={styles.entryTitle}>macOS-style dock magnification</h2>
        </div>
        <div className={styles.tags}>
          <span>pointer events</span>
          <span>transforms</span>
          <span>layout math</span>
        </div>

        <p className={styles.lede}>
          Icons swell as the cursor passes and settle as it leaves. The whole illusion is one
          pointer handler and a scale — but the gap between the demo that looks right and the one
          that feels right is three small details.
        </p>

        <DockDemo />

        <CodeBlock label="The elegant 4-line demo" code={naiveCode} />

        <p className={styles.body}>
          It reads beautifully and it half-works. Three things break the moment it meets a real
          dock:
        </p>

        <ol className={styles.notes}>
          <li>
            <strong>Jitter.</strong> <code>getBoundingClientRect()</code> reads the
            <em> already-scaled</em> element on every move, so the measured center drifts as the
            item grows and the math fights itself. Cache the resting centers once — on{' '}
            <code>pointerenter</code> — and the wobble disappears.
          </li>
          <li>
            <strong>Overlap.</strong> The default <code>transform-origin</code> is{' '}
            <code>center</code>, so items balloon in every direction and collide. A real dock grows{' '}
            <em>upward</em> from the baseline (<code>transform-origin: bottom</code>) and pushes its
            neighbours aside. Without that spread, scaled icons just sit on top of each other.
          </li>
          <li>
            <strong>Stuck &amp; global.</strong> Assigning to bare <code>onpointermove</code> binds
            the whole window, and with no reset the icons stay puffed once the pointer leaves. Scope
            the listener to the dock and clear every transform on <code>pointerleave</code>.
          </li>
        </ol>

        <CodeBlock label="The CSS that does half the work" code={shippedCss} />
        <CodeBlock label="What ships" code={shippedCode} />
      </article>
    </div>
  );
}
