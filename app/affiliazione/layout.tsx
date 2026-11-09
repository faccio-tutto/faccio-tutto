import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/affiliazione");

export default function AffiliazioneLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
