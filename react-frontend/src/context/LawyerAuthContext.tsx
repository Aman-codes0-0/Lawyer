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
  login: (data: LawyerSession) => void;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const LawyerAuthContext = createContext<LawyerAuthContextValue>({
  lawyer: null,
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
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
        const saved = localStorage.getItem("lexprime_lawyer_session");
        if (saved) setLawyer(JSON.parse(saved));
        else setLawyer(null);
      }
    } catch {
      const saved = localStorage.getItem("lexprime_lawyer_session");
      if (saved) setLawyer(JSON.parse(saved));
      else setLawyer(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (data: LawyerSession) => {
    setLawyer(data);
    localStorage.setItem("lexprime_lawyer_session", JSON.stringify(data));
  };

  const logout = useCallback(async () => {
    try {
      await fetch("/api/lawyer/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("lexprime_lawyer_session");
    setLawyer(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <LawyerAuthContext.Provider
      value={{ lawyer, isLoggedIn: !!lawyer, isLoading, login, refresh, logout }}
    >
      {children}
    </LawyerAuthContext.Provider>
  );
}

export function useLawyerAuth() {
  return useContext(LawyerAuthContext);
}
