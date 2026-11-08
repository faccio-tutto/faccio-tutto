"use client";

import Image from "next/image";
import { useState } from "react";

const projects = [
  { place: "Caltanissetta", count: 4 },
  { place: "Campofelice di Roccella", count: 3, filePrefix: "Campofelice" },
  { place: "Aidone", count: 4 },
  { place: "Licata", count: 2 },
  { place: "Riesi", count: 2 },
  { place: "San Cataldo", count: 7 },
  { place: "Serradifalco", count: 7 },
].flatMap(({ place, count, filePrefix = place }) =>
  Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const fileName = `${filePrefix} ${number}.png`;

    return {
      src: `/images/Impianti%20fotovoltaici/${encodeURIComponent(fileName)}`,
      alt: `Impianto fotovoltaico realizzato a ${place}, foto ${number}`,
      place,
    };
  }),
);

export default function ImpiantiFotovoltaiciGallery() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      aria-labelledby="impianti-realizzati-title"
      className="overflow-hidden border-y border-neutral-200 bg-neutral-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-500">
              Lavori realizzati
            </span>
            <h2
              id="impianti-realizzati-title"
              className="text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl"
            >
              Alcuni dei nostri impianti fotovoltaici
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
              Una selezione di installazioni realizzate in diverse località.
            </p>
          </div>

          <button
            type="button"
            aria-pressed={isPaused}
            onClick={() => setIsPaused((paused) => !paused)}
            className="min-h-11 shrink-0 self-start rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:self-auto"
          >
            {isPaused ? "Riprendi scorrimento" : "Metti in pausa"}
          </button>
        </div>
      </div>

      <div
        className="solar-gallery mt-10"
        role="region"
        aria-label="Galleria degli impianti fotovoltaici realizzati"
      >
        <div
          className="solar-gallery-track"
          style={{ animationPlayState: isPaused ? "paused" : undefined }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="solar-gallery-group"
              aria-hidden={copy === 1}
            >
              {projects.map(({ src, alt, place }, index) => (
                <figure
                  key={`${place}-${index}`}
                  className="solar-gallery-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900">
                    <div
                      aria-hidden="true"
                      className="solar-gallery-backdrop"
                      style={{ backgroundImage: `url("${src}")` }}
                    />
                    <Image
                      src={src}
                      alt={copy === 0 ? alt : ""}
                      fill
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 350px"
                      className="z-10 object-contain"
                      draggable={false}
                      loading={copy === 0 && index < 3 ? "eager" : "lazy"}
                    />
                  </div>
                  {copy === 0 && (
                    <figcaption className="mt-3 text-sm font-medium text-neutral-700">
                      {place}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
