"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ModuloContatti from './ModuloContatti';
import { FaInstagramSquare, FaLinkedin, FaGlobe, FaEnvelope, FaPhone, FaBars, FaTimes } from "react-icons/fa";

 const menuItems = [
    { name: "Architettura", href: "/progettazione" },
    { name: "Fotovoltaico", href: "/fotovoltaico" },
    { name: "Infissi", href: "/infissi" },
    { name: "Climatizzazione", href: "/climatizzazione" },
    { name: "Riparazioni", href: "/riparazioni-veloci" },
    { name: "Contatti", href: "/prenota" },
  ];

export default function ContattiPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex flex-col justify-between">
      
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
            
      {/* SEZIONE CENTRALE: CONTATTI & MODULO */}
      <main className="flex-grow flex items-center justify-center py-32 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="container max-w-5xl mx-auto"
        >
          {/* Intestazione Principale Minimalista */}
          <div className="text-center space-y-3 mb-16">
            <h1 className="text-4xl font-light tracking-tight text-neutral-100">
              Contatti ed assistenza
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium max-w-lg mx-auto leading-relaxed">
              Siamo a tua disposizione. Richiedi una consulenza tecnica o contatta la nostra sede principale.
            </p>
          </div>

          {/* Griglia a due colonne asimmetrica */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Colonna Sinistra (Info Aziendali - 2 quinti della larghezza) */}
            <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 px-1">
                Sede Generale e Canali diretti
              </div>

              {[
                {
                  id: "home",
                  icon: <FaGlobe className="text-sm text-neutral-400" />,
                  title: "Sede Legale ed Operativa",
                  description: "Via J.F. Kennedy 67, 92024 Canicattì (AG)",
                  link: "https://maps.google.com" // Sostituisci eventualmente con il link esatto alla mappa
                },
                {
                  id: "mail",
                  icon: <FaEnvelope className="text-sm text-neutral-400" />,
                  title: "E-mail Corrispondenza",
                  description: "info@faccio-tutto.it",
                  link: "info@faccio-tutto.it"
                },
                {
                  id: "telefono",
                  icon: <FaPhone className="text-sm text-neutral-400" />,
                  title: "Supporto Telefonico",
                  description: "+39 333 4491881",
                  link: "+39 333 4491881"
                }
              ].map((service) => (
                <a
                  key={service.id}
                  href={
                    service.id === "mail"
                      ? `mailto:${service.link}`
                      : service.id === "telefono"
                      ? `tel:${service.link.replace(/\s+/g, '')}`
                      : service.link
                  }
                  target={service.id === "home" ? "_blank" : undefined}
                  rel={service.id === "home" ? "noopener noreferrer" : undefined}
                  className="block p-5 bg-neutral-900/30 border border-neutral-800/60 rounded-xl hover:border-neutral-600 transition duration-300"
                >
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                      {service.icon}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                        {service.title}
                      </div>
                      <div className="text-sm text-neutral-200 font-light">
                        {service.description}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Colonna Destra (Modulo Contatti Integrato - 3 quinti della larghezza) */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-neutral-900/20 border border-neutral-800/50 p-2 rounded-2xl">
                <ModuloContatti destinatarioEmail="info@faccio-tutto.it" />
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* FOOTER PREMIUM IN TONI SCURI */}
     <footer className="w-full text-center py-8 bg-black border-t border-neutral-900 text-[10px] text-neutral-500 font-medium tracking-[0.15em] uppercase flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <span className="text-neutral-600">faccio-tutto.it © {new Date().getFullYear()}</span>
        <Link href="/privacy" className="hover:text-neutral-300 transition underline-offset-2 hover:underline">
          Privacy e Note Legali
        </Link>
        <Link href="/contatti" className="hover:text-neutral-300 transition underline-offset-2 hover:underline">
          Contatti
        </Link>
      </footer>


    </div>
  );
}