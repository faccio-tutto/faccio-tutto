import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/affiliazione/privato");

export default function AffiliazionePrivatoLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
