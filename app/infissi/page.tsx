"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import ModuloContatti from "./ModuloContatti";

const InfissiPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* NAVBAR PREMIUM */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center">

        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/logo faccio tutto 3.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-white/60">
            <span>faccio-tutto.it</span>
            <a href="#" className="hover:text-white transition">
              <FaInstagramSquare />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <ul className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.25em] text-white/60">
          {[
            "Architettura",
            "Fotovoltaico",
            "Infissi",
            "Climatizzazione",
            "Riparazioni",
          ].map((item) => (
            <li key={item} className="hover:text-white transition">
              <Link href="#">{item}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <header className="relative h-screen flex items-center justify-center text-center">

        <Image
          src="/images/infissi-hero.png"
          alt="Infissi"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-6 max-w-4xl">

          <p className="text-xs tracking-[0.6em] text-white/60 uppercase">
            Infissi di nuova generazione
          </p>

          <h1 className="text-5xl md:text-7xl font-light mt-6 leading-tight">
            Luce, comfort<br />e silenzio.
          </h1>

          <p className="text-white/70 mt-8 text-lg md:text-xl">
            Prestazioni termiche avanzate. Design minimale. Integrazione perfetta con la tua casa.
          </p>

        </div>
      </header>

      {/* KPI SECTION */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-16">

          {[
            { value: "-45%", label: "dispersioni termiche" },
            { value: "Uw 0.8", label: "trasmittanza media" },
            { value: "40 dB", label: "isolamento acustico" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-5xl font-extralight">{item.value}</div>
              <div className="text-white/40 mt-3 text-sm tracking-wide uppercase">
                {item.label}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-32 space-y-40 max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Image
            src="/images/pvc1.png"
            width={1200}
            height={800}
            className="rounded-2xl"
            alt=""
          />
          <div>
            <div className="text-5xl font-light">PVC premium</div>
            <div className="text-white/50 mt-6 text-lg">
              Massima efficienza energetica con manutenzione minima.
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-5xl font-light">Alluminio minimal</div>
            <div className="text-white/50 mt-6 text-lg">
              Profili sottili per massima luce naturale.
            </div>
          </div>
          <Image
            src="/images/alluminio2.png"
            width={1200}
            height={800}
            className="rounded-2xl"
            alt=""
          />
        </div>

      </section>

      {/* SERVICES */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="text-4xl font-light">Servizi inclusi</div>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2">
          {[
            "Sopralluogo tecnico",
            "Progettazione su misura",
            "Installazione certificata",
            "Consulenza energetica",
            "Gestione pratiche",
            "Assistenza post-vendita",
          ].map((item) => (
            <div
              key={item}
              className="border-b border-white/5 py-5 text-white/60 text-lg font-light"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA + FORM (TESLA STYLE CLEAN) */}
      <section className="py-32 border-t border-white/5 px-6">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-start">

         {/* TESTO + IMMAGINE */}
<div className="flex flex-col h-full">

  <p className="text-xs tracking-[0.4em] text-white/40 uppercase">
    Preventivo personalizzato
  </p>

  <div className="text-5xl font-light mt-6">
    Progetta i tuoi infissi
  </div>

  <p className="text-white/50 mt-6 text-lg">
    Inserisci le informazioni e ricevi una proposta tecnica dettagliata entro 24h.
  </p>

  <div className="relative mt-12 flex-1 min-h-[650px] overflow-hidden rounded-3xl">
    <Image
      src="/images/infissi-minimal.png"
      alt="Infissi Design"
      fill
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

    <div className="absolute bottom-8 left-8 right-8">
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
        Design minimale
      </p>

      <h3 className="text-3xl font-light mt-3">
        Soluzioni su misura
      </h3>

      <p className="text-white/70 mt-3">
        Profili sottili, massima luminosità e prestazioni elevate.
      </p>
    </div>

  </div>

</div>

          {/* FORM (NO BOX PESANTE) */}
          <div className="border border-white/5 p-8 md:p-">

            <ModuloContatti destinatarioEmail="infissi@faccio-tutto.it" />

          </div>

        </div>
      </section>

     <footer
  className="text-center py-8 bg-white border-t border-neutral-100 text-[11px] text-black font-bold tracking-wider uppercase space-y-2 md:space-y-0 md:space-x-6"
  style={{ backgroundColor: '#ffffff', borderColor: '#f5f5f5', color: '#000000' }}
>
  <span>faccio-tutto.it &copy; {new Date().getFullYear()}</span>

  <Link
    href="/privacy"
    className="hover:opacity-70 transition"
  >
    Privacy e Note Legali
  </Link>

  <Link
    href="/contatti"
    className="hover:opacity-70 transition"
  >
    Contatti
  </Link>
</footer>

    </div>
  );
};

export default InfissiPage;