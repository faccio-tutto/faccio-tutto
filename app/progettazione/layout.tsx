import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/progettazione");

export default function ProgettazioneLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
