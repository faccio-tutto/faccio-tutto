import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/vision");

export default function VisionLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
