import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/accumulo");

export default function AccumuloLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
