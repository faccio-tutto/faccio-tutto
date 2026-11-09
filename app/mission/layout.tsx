import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/mission");

export default function MissionLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
