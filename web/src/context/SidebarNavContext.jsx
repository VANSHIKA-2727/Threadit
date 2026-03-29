import { createContext, useCallback, useContext, useMemo, useState } from "react";

const SidebarNavContext = createContext(null);

export function SidebarNavProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const value = useMemo(
    () => ({ mobileOpen, setMobileOpen, closeMobile }),
    [mobileOpen, closeMobile]
  );
  return <SidebarNavContext.Provider value={value}>{children}</SidebarNavContext.Provider>;
}

export function useSidebarNav() {
  const ctx = useContext(SidebarNavContext);
  if (!ctx) {
    throw new Error("useSidebarNav must be used within SidebarNavProvider");
  }
  return ctx;
}
