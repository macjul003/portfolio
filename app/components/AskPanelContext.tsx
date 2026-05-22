'use client';

import { createContext, useContext, useState } from 'react';

type AskPanelCtx = { open: boolean; setOpen: (v: boolean) => void };

const AskPanelContext = createContext<AskPanelCtx>({ open: false, setOpen: () => {} });

export function AskPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <AskPanelContext value={{ open, setOpen }}>{children}</AskPanelContext>;
}

export function useAskPanel() {
  return useContext(AskPanelContext);
}
