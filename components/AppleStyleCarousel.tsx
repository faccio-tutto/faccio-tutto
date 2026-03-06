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
  speed = 3.0,
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
      <div className="absolute left-0 top-0 w-32 h-full z-20 pointer-events-none bg-gradient-to-r from-gray-100 to-transparent" />

      {/* Blur destra */}
      <div className="absolute right-0 top-0 w-32 h-full z-20 pointer-events-none bg-gradient-to-l from-gray-100 to-transparent" />

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-scroll scrollbar-hide px-10"
        style={{ scrollBehavior: "smooth" }}
      >
        {slides.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 transition-all duration-500 hover:scale-110"
            style={{
              height: height,
              width: height * 1.6,
            }}
          >
            <div className="absolute inset-0 rounded-2xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition" />

            <Image
              src={src}
              alt="servizio"
              width={height * 1.6}
              height={height}
              className="rounded-2xl object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
