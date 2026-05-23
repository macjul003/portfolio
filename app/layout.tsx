import type { Metadata } from "next";
import Script from "next/script";
import { Agentation } from "agentation";
import Sidebar from "./components/Sidebar";
import AskPanel from "./components/AskPanel";
import { AskPanelProvider } from "./components/AskPanelContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Julian Samuel - Product Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}else if(!t&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.classList.add('light');}}catch(e){}})();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
      </head>
      <body>
        <AskPanelProvider>
          <div className="shell">
            <div className="layout-wrap">
              <Sidebar />
              <div className="main-content">
                {children}
              </div>
            </div>
          </div>
          <AskPanel />
        </AskPanelProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-5XHD652ETP" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5XHD652ETP');
        `}</Script>
      </body>
    </html>
  );
}
