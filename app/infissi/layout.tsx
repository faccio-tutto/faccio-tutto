import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo";

export const metadata = canonicalMetadata("/infissi");

export default function InfissiLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
