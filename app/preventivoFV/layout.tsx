import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/preventivoFV");

export default function PreventivoFVLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
