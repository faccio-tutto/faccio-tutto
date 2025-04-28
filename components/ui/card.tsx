export function Card({ children }: { children: React.ReactNode }) {
    return <div className="border rounded-lg shadow-lg">{children}</div>;
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="bg-white p-4">{children}</div>;
  }