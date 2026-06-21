"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ModuloContatti from "./ModuloContatti";

import {
  FaInstagramSquare,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function ContattiPage() {
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
    <main>
      
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
          src="/images/hero-contatti.png"
          alt="Contatti"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            Contattaci
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Assistenza tecnica, manutenzione programmata e supporto
            professionale per la tua abitazione e la tua attività.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+393334491881"
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Chiama ora
            </a>

            <a
              href="#modulo"
              className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition"
            >
              Richiedi assistenza
            </a>
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">
            Sempre al tuo fianco
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Il nostro team è disponibile per consulenze tecniche,
            manutenzione impianti, assistenza specializzata e supporto
            nella scelta delle migliori soluzioni per la tua casa.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 text-center"
          >
            <FaMapMarkerAlt
              size={40}
              className="mx-auto mb-5 text-red-400"
            />

            <h3 className="text-xl mb-3">
              Sede Operativa
            </h3>

            <p className="text-gray-400">
              Via J.F. Kennedy 67
              <br />
              92024 Canicattì (AG)
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 text-center"
          >
            <FaEnvelope
              size={40}
              className="mx-auto mb-5 text-blue-400"
            />

            <h3 className="text-xl mb-3">
              Email
            </h3>

            <a
              href="mailto:info@faccio-tutto.it"
              className="text-gray-400 hover:text-white"
            >
              info@faccio-tutto.it
            </a>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 text-center"
          >
            <FaPhone
              size={40}
              className="mx-auto mb-5 text-green-400"
            />

            <h3 className="text-xl mb-3">
              Telefono
            </h3>

            <a
              href="tel:+393334491881"
              className="text-gray-400 hover:text-white"
            >
              +39 333 4491881
            </a>
          </motion.div>

        </div>
      </section>

      {/* SEZIONE IMMERSIVA */}
      <section className="relative h-[700px]">
        <Image
          src="/images/tecnico-assistenza.png"
          alt="Tecnico"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

      </section>

      {/* MODULO */}
      <section
        id="modulo"
        className="py-28 px-6"
      >
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6">
              Richiedi informazioni
            </h2>

            <p className="text-gray-400 text-lg">
              Compila il modulo e sarai ricontattato
              nel più breve tempo possibile.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-6 md:p-14">
            <ModuloContatti
              destinatarioEmail="info@faccio-tutto.it"
            />
          </div>

        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <h2 className="text-4xl md:text-5xl font-light mb-6">
          Hai bisogno di assistenza?
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Contattaci oggi stesso per ricevere una consulenza
          professionale e una soluzione su misura.
        </p>

        <a
          href="tel:+393334491881"
          className="inline-block bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
        >
          Chiama +39 333 4491881
        </a>
      </section>

      {/* FOOTER */}
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