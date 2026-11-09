import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/chisiamo");

export default function ChiSiamoLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
