import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/climatizzazione");

export default function ClimatizzazioneLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
