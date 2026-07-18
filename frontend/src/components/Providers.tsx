"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
