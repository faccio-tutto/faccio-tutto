import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/riparazioni-veloci");

export default function RiparazioniVelociLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
