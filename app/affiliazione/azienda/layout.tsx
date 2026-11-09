import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/affiliazione/azienda");

export default function AffiliazioneAziendaLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
