"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProfileProvider } from "@/context/UserProfileContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <LanguageProvider>
          <UserProfileProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </UserProfileProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
