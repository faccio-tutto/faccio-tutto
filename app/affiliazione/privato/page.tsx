"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  FaLinkedin,
  FaArrowRight,
  FaFileDownload,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import ModuloContatti from "./ModuloContatti";

const AffiliazionePrivati = () => {
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
        <title>Affiliazione Privati | faccio-tutto.it</title>

        <meta
          name="description"
          content="Entra nella rete professionale di faccio-tutto.it e valorizza le tue competenze."
        />

        <link
          rel="canonical"
          href="https://www.faccio-tutto.it/affiliazione/privato"
        />
      </Head>

      <main className="bg-black text-white overflow-hidden">
        <nav
          aria-label="Navigazione principale"
          className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/30 text-white backdrop-blur-md"
        >
          <div className="flex items-center justify-between px-6 py-4 md:px-12">
            <div className="flex items-center gap-6">
              <Link href="/" aria-label="Faccio Tutto, pagina iniziale">
                <Image
                  src="/logo faccio tutto 3.png"
                  alt="Logo Faccio Tutto"
                  width={100}
                  height={100}
                  className="rounded"
                />
              </Link>

              <div className="hidden items-center gap-3 text-xs font-bold uppercase tracking-wider text-neutral-300 sm:flex">
                <span>faccio-tutto.it</span>
                <a
                  href="https://www.instagram.com/infofacciotutto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Faccio Tutto su Instagram"
                  className="transition hover:text-white"
                >
                  <FaInstagram className="text-base" />
                </a>
                <a
                  href="https://www.linkedin.com/company/faccio-tutto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Faccio Tutto su LinkedIn"
                  className="transition hover:text-white"
                >
                  <FaLinkedin className="text-base" />
                </a>
              </div>
            </div>

            <ul className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-200 lg:flex xl:gap-8 xl:tracking-[0.2em]">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition duration-200 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="text-2xl text-white lg:hidden"
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
              >
                <div className="flex flex-col">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="border-b border-white/10 px-8 py-5 text-sm uppercase tracking-widest text-white hover:bg-white/5"
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="flex justify-center gap-6 py-6">
                    <a
                      href="https://www.instagram.com/infofacciotutto/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Faccio Tutto su Instagram"
                      className="text-2xl text-white"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/faccio-tutto/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Faccio Tutto su LinkedIn"
                      className="text-2xl text-white"
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
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">

          <Image
            src="/images/talento-network.png"
            alt="Affiliazione Privati"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 px-6 max-w-5xl"
          >

            <span className="text-xs uppercase tracking-[0.35em] text-neutral-300 font-semibold">
              Network Professionale
            </span>

            <h1 className="mt-6 text-5xl md:text-8xl font-light tracking-tight leading-none">
              Trasforma il tuo
              <br />
              talento in lavoro.
            </h1>

            <p className="mt-10 text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Entra nella rete di faccio-tutto.it
              e valorizza le tue competenze professionali.
            </p>

            <div className="mt-12 flex justify-center">

              <a
                href="#modulo-affiliazione"
                className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-neutral-200 transition"
              >
                Inizia Ora
              </a>

            </div>

          </motion.div>

        </section>

        {/* INTRO */}
        <section className="bg-white text-black py-32">

          <div className="max-w-5xl mx-auto px-6 text-center">

            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-semibold">
              Opportunità Reali
            </span>

            <div className="mt-6 text-4xl md:text-6xl font-light tracking-tight leading-tight">
              Le tue capacità
              meritano visibilità.
            </div>

            <div className="mt-10 text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Offriamo uno spazio professionale
              dove ogni persona può trasformare
              esperienza, manualità e competenze
              in nuove opportunità concrete.
            </div>

          </div>

        </section>

        {/* MODULO */}
        <section
          id="modulo-affiliazione"
          className="relative py-32 bg-[#0a0a0a]"
        >

          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

            {/* TESTO */}
            <div>

              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-semibold">
                Affiliazione Privati
              </span>

              <h3 className="mt-6 text-4xl md:text-6xl font-light leading-tight">
                Inizia il tuo
                <br />
                percorso.
              </h3>

              <p className="mt-8 text-lg text-neutral-400 leading-relaxed max-w-xl">
                Compila il modulo per entrare
                nella rete professionale di
                faccio-tutto.it.
              </p>

              <div className="mt-12">

                <a
                  href="/MODELLO RICEVUTA PRESTAZIONE OCCASIONALE TRA PRIVATI.pdf"
                  download
                  className="inline-flex items-center gap-4 text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/10 transition"
                >

                  <FaFileDownload />

                  Scarica modello ricevuta prestazioni occasionali

                </a>

              </div>

            </div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 md:p-12"
            >

              <ModuloContatti destinatarioEmail="affiliazione@faccio-tutto.it" />

            </motion.div>

          </div>

        </section>

        {/* CTA FINALE */}
        <section className="relative py-40 text-center overflow-hidden">

          <Image
            src="/images/community3.png"
            alt="Community"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 px-6">

            <div className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
              Ogni competenza
              <br />
              ha valore.
            </div>

            <div className="mt-10 text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Unisciti a una community
              che valorizza capacità,
              professionalità e crescita.
            </div>

            <Link href="/contatti">

              <button className="mt-12 bg-white text-black px-12 py-5 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-neutral-200 transition">

                Contattaci

                <FaArrowRight className="inline ml-3" />

              </button>

            </Link>

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
};

export default AffiliazionePrivati;