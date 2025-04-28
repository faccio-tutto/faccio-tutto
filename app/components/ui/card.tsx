import * as React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white shadow-md rounded-lg p-6">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}