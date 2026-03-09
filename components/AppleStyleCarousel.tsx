"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  height?: number;
  speed?: number;
}

export default function AppleStyleCarousel({
  images,
  height = 320,
  speed = 3,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [...images, ...images];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frame: number;

    const animate = () => {
      if (!isHovered) {
        el.scrollLeft += speed;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [isHovered, speed]);

  return (
    <div className="relative w-full overflow-hidden py-12 bg-black">

      {/* Blur sinistra */}
      <div className="absolute left-0 top-0 w-32 h-full z-20 pointer-events-none bg-gradient-to-r from-black to-transparent" />

      {/* Blur destra */}
      <div className="absolute right-0 top-0 w-32 h-full z-20 pointer-events-none bg-gradient-to-l from-black to-transparent" />

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-2 overflow-x-scroll scrollbar-hide px-10"
      >
        {slides.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 transition-all duration-500 hover:scale-105 -mx-11"
            style={{
              height: height,
              width: height * 1.6,
            }}
          >
            {/* contenitore immagine */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black">

              <Image
                src={src}
                alt="installazione"
                fill
                className="object-contain"
                draggable={false}
              />

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}