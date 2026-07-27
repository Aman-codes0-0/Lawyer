import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lawyer Portal | LexPrime",
  description: "Secure lawyer authentication portal for LexPrime law firm professionals.",
};

export default function LawyerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
