"use client";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FaInstagram,
  FaInstagramSquare,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ModuloContatti from "./ModuloContatti";

export default function AffiliazioneAzienda() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Chi siamo", href: "/chisiamo" },
    { name: "Architettura", href: "/progettazione" },
    { name: "Fotovoltaico", href: "/fotovoltaico" },
    { name: "Infissi", href: "/infissi" },
    { name: "Climatizzazione", href: "/climatizzazione" },
    { name: "Riparazioni", href: "/riparazioni-veloci" },
    { name: "Contatti", href: "/prenota" },
  ];

  return (
    <>
      <Head>
        <title>Affiliazione Azienda | faccio-tutto.it</title>
      </Head>

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
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
              alt="Affiliazione Aziende"
              fill
              priority
              className="object-cover opacity-40"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          >
            <div className="mb-6 tracking-[0.4em] uppercase text-sm text-neutral-400">
              Partnership Professionale
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
              Affilia la tua azienda
            </h1>

            <p className="mt-8 text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Entra nella rete di <strong>faccio-tutto.it</strong> e sviluppa
              nuove opportunità nel settore dei serramenti, fotovoltaico,
              edilizia ed efficientamento energetico.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#modulo-contatti"
                className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all duration-300"
              >
                Richiedi Affiliazione
              </a>

              <a
                href="https://www.faccio-tutto.it"
                className="px-8 py-4 rounded-full border border-white/30 hover:border-white transition-all duration-300"
              >
                Scopri di più
              </a>
            </div>
          </motion.div>
        </section>

        {/* BENEFICI */}
        <section className="bg-white text-black py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-4">
                Vantaggi
              </p>

              <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                Una rete costruita per crescere
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Nuovi Clienti",
                  text: "Espandi la tua rete commerciale attraverso richieste profilate e contatti qualificati.",
                },
                {
                  title: "Supporto Tecnico",
                  text: "Affiancamento professionale per pratiche tecniche, normative e consulenze specialistiche.",
                },
                {
                  title: "Crescita del Brand",
                  text: "Aumenta la visibilità della tua azienda con una presenza digitale moderna e professionale.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="bg-neutral-100 rounded-3xl p-10 hover:bg-neutral-200 transition-all duration-500"
                >
                  <div className="text-2xl font-semibold mb-5">
                    {item.title}
                  </div>

                  <div className="text-neutral-600 leading-relaxed text-lg">
                    {item.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FULL IMAGE SECTION */}
        <section className="relative h-[80vh]">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop"
            alt="Collaborazione professionale"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center max-w-4xl px-6">
              <div className="text-4xl md:text-6xl font-semibold leading-tight">
                Professionalità.
                <br />
                Innovazione.
                <br />
                Collaborazione.
              </div>
            </div>
          </div>
        </section>

        {/* MODULO */}
        <section
          id="modulo-contatti"
          className="bg-black py-28 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-5">
                  Contattaci
                </p>

                <div className="text-4xl md:text-5xl font-semibold leading-tight mb-8">
                  Inizia una nuova collaborazione
                </div>

                <div className="text-neutral-400 text-lg leading-relaxed mb-10">
                  Compila il modulo e verrai contattato dal nostro team per
                  ricevere informazioni dedicate alla tua azienda.
                </div>

                <div className="flex items-center gap-6 text-3xl">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    className="hover:text-neutral-400 transition"
                  >
                    <FaInstagramSquare />
                  </a>

                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    className="hover:text-neutral-400 transition"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </motion.div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-8 md:p-0 shadow-2xl"
              >
                <ModuloContatti destinatarioEmail="affiliazione@faccio-tutto.it" />
              </motion.div>
            </div>
          </div>
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
    </>
  );
}