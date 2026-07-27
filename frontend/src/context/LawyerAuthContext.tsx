"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export interface LawyerSession {
  id: string;
  name: string;
  email: string;
  designation: string;
  specialization: string;
  experience?: number;
  barRegistration?: string;
  photoUrl?: string | null;
  isVerified?: boolean;
}

interface LawyerAuthContextValue {
  lawyer: LawyerSession | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const LawyerAuthContext = createContext<LawyerAuthContextValue>({
  lawyer: null,
  isLoggedIn: false,
  isLoading: true,
  refresh: async () => {},
  logout: async () => {},
});

export function LawyerAuthProvider({ children }: { children: ReactNode }) {
  const [lawyer, setLawyer] = useState<LawyerSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/lawyer/me");
      if (res.ok) {
        const data = await res.json();
        setLawyer(data.lawyer);
      } else {
        setLawyer(null);
      }
    } catch {
      setLawyer(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/lawyer/logout", { method: "POST" });
    setLawyer(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <LawyerAuthContext.Provider
      value={{ lawyer, isLoggedIn: !!lawyer, isLoading, refresh, logout }}
    >
      {children}
    </LawyerAuthContext.Provider>
  );
}

export function useLawyerAuth() {
  return useContext(LawyerAuthContext);
}
