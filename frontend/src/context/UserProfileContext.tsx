"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

interface UserProfileContextValue {
  profile: UserProfile;
  saveProfile: (p: Partial<UserProfile>) => void;
  hasProfile: boolean;
}

const defaultProfile: UserProfile = { name: "", phone: "", email: "" };

const UserProfileContext = createContext<UserProfileContextValue>({
  profile: defaultProfile,
  saveProfile: () => {},
  hasProfile: false,
});

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lexprime_user_profile");
      if (saved) setProfile(JSON.parse(saved));
    } catch {}
  }, []);

  const saveProfile = (p: Partial<UserProfile>) => {
    const updated = { ...profile, ...p };
    setProfile(updated);
    localStorage.setItem("lexprime_user_profile", JSON.stringify(updated));
  };

  const hasProfile = !!(profile.name || profile.email || profile.phone);

  return (
    <UserProfileContext.Provider value={{ profile, saveProfile, hasProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}
