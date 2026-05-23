'use client';

import { Agentation } from "agentation";
import Sidebar from "../components/Sidebar";
import AskPanel from "../components/AskPanel";
import { AskPanelProvider } from "../components/AskPanelContext";
import { FirstVisitProvider } from "../components/FirstVisitProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirstVisitProvider>
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
    </FirstVisitProvider>
  );
}
