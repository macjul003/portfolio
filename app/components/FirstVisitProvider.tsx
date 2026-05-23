'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const FirstVisitCtx = createContext(false);

export function useFirstVisit() {
  return useContext(FirstVisitCtx);
}

export function FirstVisitProvider({ children }: { children: React.ReactNode }) {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const key = '__pf_v1';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      setIsFirst(true);
    }
  }, []);

  return (
    <FirstVisitCtx.Provider value={isFirst}>
      {children}
    </FirstVisitCtx.Provider>
  );
}
