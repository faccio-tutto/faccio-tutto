import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/contatti");

export default function ContattiLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
