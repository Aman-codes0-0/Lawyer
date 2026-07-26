"use client";

import { ReactNode } from "react";

// Lenis smooth scroll has been disabled as it interferes with click events.
// Using native CSS scroll-behavior instead.
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
