"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaWrench,
  FaPhone,
  FaDraftingCompass,
  FaSolarPanel,
  FaWind,
  FaDoorOpen,
  FaInstagramSquare,
  FaLinkedin,
  FaArrowRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ModuloContatti from "./ModuloContatti";
import { motion, AnimatePresence } from "framer-motion";

export default function ClimatizzazionePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Architettura", href: "/progettazione" },
    { name: "Fotovoltaico", href: "/fotovoltaico" },
    { name: "Infissi", href: "/infissi" },
    { name: "Climatizzazione", href: "/climatizzazione" },
    { name: "Riparazioni", href: "/riparazioni-veloci" },
    { name: "Contatti", href: "/prenota" },
  ];

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* NAVBAR PREMIUM */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/5">

  <div className="px-6 md:px-12 py-4 flex justify-between items-center">

    <div className="flex items-center gap-6">

      <Link href="/">
        <Image
          src="/logo faccio tutto 3.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </Link>

      <div className="hidden md:flex items-center gap-3 text-xs tracking-wider uppercase font-bold text-neutral-300">

        <span>faccio-tutto.it</span>

        <a
          href="https://www.instagram.com/infofacciotutto/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaInstagramSquare className="text-base" />
        </a>

        <a
          href="https://www.linkedin.com/company/faccio-tutto/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaLinkedin className="text-base" />
        </a>

      </div>

    </div>

    {/* Desktop Menu */}

    <ul className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.25em] text-white/60">

      {menuItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="hover:text-white transition duration-200"
          >
            {item.name}
          </Link>
        </li>
      ))}

    </ul>

    {/* Mobile Button */}

    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="lg:hidden text-white text-2xl"
      aria-label="Apri menu"
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>

  </div>

  {/* Mobile Menu */}

  <AnimatePresence>

    {menuOpen && (

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
      >

        <div className="flex flex-col">

          {menuItems.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-5 text-white uppercase tracking-widest text-sm border-b border-white/10 hover:bg-white/5"
            >
              {item.name}
            </Link>

          ))}

          <div className="flex justify-center gap-6 py-6">

            <a
              href="https://www.instagram.com/infofacciotutto/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
            >
              <FaInstagramSquare />
            </a>

            <a
              href="https://www.linkedin.com/company/faccio-tutto/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

      </motion.div>

    )}

  </AnimatePresence>

</nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/images/hero-clima.png"
          alt="Climatizzazione"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            Climatizzazione Intelligente
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-neutral-200">
            Comfort in ogni stagione grazie a pompe di calore,
            impianti radianti e climatizzatori ad alta efficienza.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="#contatti"
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition"
            >
              Richiedi Preventivo
            </a>

            <a
              href="#sistemi"
              className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              Scopri di più
            </a>
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section
        id="sistemi"
        className="max-w-6xl mx-auto py-28 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-8">
          Un unico sistema per il comfort della tua casa
        </h2>

        <p className="max-w-4xl mx-auto text-lg text-neutral-700">
          Progettiamo e realizziamo impianti di climatizzazione
          estiva e invernale ad alta efficienza energetica,
          integrabili con impianti fotovoltaici e sistemi smart.
        </p>
      </section>

      {/* IMPIANTO A PAVIMENTO */}
      <section className="grid lg:grid-cols-2 items-center min-h-screen">
        <div className="relative h-[500px] lg:h-screen">
          <Image
            src="/images/impianto-pavimento.png"
            alt="Impianto radiante"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-10 lg:p-24">
          <div className="text-4xl md:text-5xl font-light mb-8">
            Impianti Radianti a Pavimento
          </div>

          <p className="text-lg text-neutral-700 leading-relaxed">
            Il calore viene distribuito in modo uniforme in ogni ambiente,
            eliminando i punti freddi e migliorando il comfort abitativo.
          </p>

          <ul className="mt-8 space-y-4 text-neutral-700">
            <li>✓ Calore uniforme</li>
            <li>✓ Massimo comfort</li>
            <li>✓ Risparmio energetico</li>
            <li>✓ Nessun radiatore a vista</li>
          </ul>
        </div>
      </section>

      {/* POMPE DI CALORE */}
      <section className="grid lg:grid-cols-2 items-center min-h-screen bg-neutral-100">
        <div className="order-2 lg:order-1 p-10 lg:p-24">
          <div className="text-4xl md:text-5xl font-light text-black mb-8">
            Pompe di Calore
          </div>

          <p className="text-lg text-neutral-700 leading-relaxed">
            Riscaldamento, raffrescamento e produzione di acqua calda
            sanitaria in un unico impianto ad altissima efficienza.
          </p>

          <p className="mt-6 text-neutral-700">
            Le moderne pompe di calore sfruttano l'energia presente
            nell'aria esterna riducendo drasticamente i consumi.
          </p>
        </div>

        <div className="relative h-[500px] lg:h-screen order-1 lg:order-2">
          <Image
            src="/images/pompa-calore.png"
            alt="Pompa di calore"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CLIMATIZZATORI */}
      <section className="grid lg:grid-cols-2 items-center min-h-screen">
        <div className="relative h-[500px] lg:h-screen">
          <Image
            src="/images/climatizzatore.png"
            alt="Climatizzatore"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-10 lg:p-24">
          <div className="text-4xl md:text-5xl font-light mb-8">
            Climatizzatori Inverter
          </div>

          <p className="text-lg text-neutral-700 leading-relaxed">
            Tecnologia avanzata per garantire temperature ideali
            durante tutto l'anno.
          </p>

          <div className="mt-8 space-y-4 text-neutral-700">
            <div>✓ Controllo Wi-Fi</div>
            <div>✓ Filtri avanzati</div>
            <div>✓ Silenziosità elevata</div>
            <div>✓ Classe energetica A+++</div>
          </div>
        </div>
      </section>

      {/* SCALDACQUA */}
      <section className="grid lg:grid-cols-2 items-center min-h-screen bg-neutral-100">
        <div className="order-2 lg:order-1 p-10 lg:p-24">
          <div className="text-4xl md:text-5xl font-light text-black mb-8">
            Acqua Calda Sanitaria
          </div>

          <p className="text-lg text-neutral-700 leading-relaxed">
            Gli scaldacqua a pompa di calore permettono di produrre
            acqua calda sanitaria con consumi molto inferiori rispetto
            ai sistemi tradizionali.
          </p>

          <p className="mt-6 text-neutral-700">
            Ideali per abitazioni, strutture ricettive e attività
            commerciali.
          </p>
        </div>

        <div className="relative h-[500px] lg:h-screen order-1 lg:order-2">
          <Image
            src="/images/scaldacqua.png"
            alt="Scaldacqua pompa di calore"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* NUMERI */}
      <section className="bg-black text-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">

          <div>
            <div className="text-6xl font-light">70%</div>
            <p className="mt-3 text-neutral-400">
              Riduzione dei consumi
            </p>
          </div>

          <div>
            <div className="text-6xl font-light">365</div>
            <p className="mt-3 text-neutral-400">
              Giorni di comfort
            </p>
          </div>

          <div>
            <div className="text-6xl font-light">A+++</div>
            <p className="mt-3 text-neutral-400">
              Efficienza energetica
            </p>
          </div>

          <div>
            <div className="text-6xl font-light">100%</div>
            <p className="mt-3 text-neutral-400">
              Integrabile con fotovoltaico
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[700px] flex items-center justify-center">
        <Image
          src="/images/impianto-pavimento2.png"
          alt="Comfort"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Progetta oggi il comfort di domani
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-neutral-200">
            Soluzioni su misura per abitazioni, aziende,
            uffici e strutture ricettive.
          </p>
        </div>
      </section>

      {/* CONTATTI */}
      <section
        id="contatti"
        className="max-w-6xl mx-auto py-24 px-6"
      >
        <div className="text-center mb-12">
          <h2 className="text-5xl font-light mb-4">
            Richiedi una consulenza
          </h2>

          <p className="text-neutral-600">
            Un nostro tecnico analizzerà la soluzione più adatta.
          </p>
        </div>

        <ModuloContatti
          destinatarioEmail="info@faccio-tutto.it"
        />
      </section>
 <footer className="w-full text-center py-8 bg-black border-t border-neutral-900 text-[10px] text-neutral-500 font-medium tracking-[0.15em] uppercase flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <span className="text-neutral-600">faccio-tutto.it © {new Date().getFullYear()}</span>
        <Link href="/privacy" className="hover:text-neutral-300 transition underline-offset-2 hover:underline">
          Privacy e Note Legali
        </Link>
        <Link href="/contatti" className="hover:text-neutral-300 transition underline-offset-2 hover:underline">
          Contatti
        </Link>
      </footer>
    </main>
  );
}