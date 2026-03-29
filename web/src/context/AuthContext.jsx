import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "threadit_user";

const defaultSocial = { twitter: "", github: "" };

function normalizeUser(data, prevSocial) {
  const mergedSocial =
    prevSocial != null
      ? { ...defaultSocial, ...prevSocial, ...(data.socialLinks || {}) }
      : { ...defaultSocial, ...(data.socialLinks || {}) };
  return {
    ...data,
    bio: data.bio ?? "Full-stack developer. Building in the open.",
    avatarUrl: data.avatarUrl ?? null,
    socialLinks: mergedSocial,
    followers: data.followers ?? 128,
  };
}

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeUser(JSON.parse(raw), null);
  } catch {
    /* ignore */
  }
  return null;
}

function persistUser(u) {
  if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  else localStorage.removeItem(STORAGE_KEY);
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = (userData) => {
    const next = normalizeUser(userData, null);
    setUser(next);
    persistUser(next);
  };

  const logout = () => {
    setUser(null);
    persistUser(null);
  };

  const register = (userData) => {
    const next = normalizeUser(userData, null);
    setUser(next);
    persistUser(next);
  };

  const updateUser = (patch) => {
    setUser((u) => {
      if (!u) return u;
      const next = normalizeUser({ ...u, ...patch }, u.socialLinks);
      persistUser(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
