import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/riparazione-elettrodomestici");

export default function RiparazioneElettrodomesticiLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
