import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = 'https://macjulian.com'
const defaultDescription = 'Julian is a product designer building AI-native products across fintech, crypto, and consumer apps. Based in London.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Julian | Product Designer",
    template: "%s | Julian",
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    siteName: 'Julian | Product Designer',
    title: 'Julian | Product Designer',
    description: defaultDescription,
    url: siteUrl,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Julian | Product Designer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julian | Product Designer',
    description: defaultDescription,
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#julian`,
                  "name": "Julian Samuel",
                  "url": siteUrl,
                  "jobTitle": "Product Designer",
                  "email": "juliansam003@gmail.com",
                  "sameAs": [
                    "https://x.com/macjuliansamuel",
                    "https://www.linkedin.com/in/juliansamuel003/",
                    "https://github.com/macjul003",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  "url": siteUrl,
                  "name": "Julian | Product Designer",
                  "description": defaultDescription,
                  "author": { "@id": `${siteUrl}/#julian` },
                  "dateModified": "2026-05-28",
                },
              ],
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Inter:wght@300;400;500&family=Noto+Sans:wght@400&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
      </head>
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-5XHD652ETP" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5XHD652ETP');
        `}</Script>
        <Analytics />
      </body>
    </html>
  );
}
