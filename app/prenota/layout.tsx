import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/prenota");

export default function PrenotaLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
