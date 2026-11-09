import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/configuratorepage");

export default function ConfiguratoreLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
