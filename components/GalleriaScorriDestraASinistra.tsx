"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleriaScorriDestraAsinistraProps {
  images: string[];
  speed?: number; // secondi per un ciclo
  height?: number; // px
  gap?: number; // spaziatura tra le immagini
}

const GalleriaScorriDestraAsinistra: React.FC<GalleriaScorriDestraAsinistraProps> = ({
  images,
  speed = 30,
  height = 220,
  gap = 16,
}) => {
  // Duplico le immagini per ottenere loop infinito
  const slides = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          gap: `${gap}px`,
        }}
      >
        {slides.map((src, i) => (
          <motion.div
            key={`${src}-${i}`}
            className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
            style={{ height, width: height * 1.6 }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={src}
              alt={`galleria-${i}`}
              width={height * 1.6}
              height={height}
              style={{ objectFit: "cover" }}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Keyframes locali */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        /* Pausa animazione al passaggio mouse */
        div:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default GalleriaScorriDestraAsinistra;