import React from "react";
import Image from "next/image";

const AnimatedBuilding: React.FC = () => {
  return (
    <div className="animated-container">
      <Image
        src="/images/building-phase-0.gif" // Sostituisci con il percorso corretto
        alt="Schizzo"
        width={1024}
        height={300}
      />
    </div>
  );
};

export default AnimatedBuilding;