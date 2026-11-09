import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/CalcolatoreFV");

export default function CalcolatoreFVLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
