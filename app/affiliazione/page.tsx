"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import {
  FaInstagramSquare,
  FaLinkedin,
  FaArrowRight,
  FaUserTie,
  FaBusinessTime,
} from "react-icons/fa";

export default function AffiliazionePage() {
  return (
    <>
      <Head>
        <title>Affiliazione | faccio-tutto.it</title>

        <meta
          name="description"
          content="Entra nella rete professionale di faccio-tutto.it."
        />
      </Head>

      <main className="bg-black text-white overflow-hidden">

        {/* Navbar Minimal Tesla Style */}
      <nav className="absolute top-0 left-0 w-full text-white py-4 px-6 md:px-12 flex justify-between items-center z-40 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-6">
          <a href="/" className="transition hover:opacity-80">
            <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={110} height={110} className="rounded" />
          </a>
          <div className="hidden sm:flex items-center gap-3 text-xs tracking-wider uppercase font-bold text-neutral-300">
            <span>faccio-tutto.it</span>
            <a href="https://www.instagram.com/infofacciotutto/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaInstagramSquare className="text-base" /></a>
            <a href="https://www.linkedin.com/company/faccio-tutto/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaLinkedin className="text-base" /></a>
          </div>
        </div>

    {/* Menu Centrale */}

    <ul className="hidden lg:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-200">

      {[

        { name: "Architettura", href: "/progettazione" },

        { name: "Fotovoltaico", href: "/fotovoltaico" },

        { name: "Infissi", href: "/infissi" },

        { name: "Climatizzazione", href: "/climatizzazione" },

        { name: "Riparazioni", href: "/riparazioni-veloci" },

      ].map((item) => (

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
      </nav>

        {/* HERO */}
        <section className="relative h-screen flex items-center justify-center text-center">

          <Image
            src="/images/network.png"
            alt="Affiliazione"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-5xl px-6"
          >

            <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-none">
              Entra nella
              <br />
              nostra rete.
            </h1>

            <p className="mt-10 text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Privati e aziende connessi in un ecosistema
              professionale moderno, dinamico e orientato alla crescita.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <Link href="/affiliazione/privato">
                <button className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-neutral-200 transition">
                  Affiliazione Privati
                </button>
              </Link>

              <Link href="/affiliazione/azienda">
                <button className="border border-white/30 px-10 py-4 rounded-full hover:bg-white/10 transition">
                  Affiliazione Aziende
                </button>
              </Link>

            </div>

          </motion.div>
        </section>

        {/* INTRO */}
        <section className="py-32 bg-white text-black">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <span className="text-xs uppercase tracking-[0.3em] text-neutral-800 font-semibold">
              Network Professionale
            </span>

            <div className="mt-6 text-4xl md:text-6xl font-light tracking-tight leading-tight">
              Talento,
              opportunità
              e crescita.
            </div>

            <div className="mt-10 text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Creiamo connessioni tra competenze reali,
              aziende e professionisti,
              offrendo strumenti concreti per trasformare
              capacità individuali in nuove opportunità.
            </div>

          </div>
        </section>

        {/* CARDS */}
        <section className="bg-[#0a0a0a] py-32">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

            {/* PRIVATI */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl"
            >

              <div className="relative h-[500px]">

                <Image
                  src="/images/affiliazione-privato2.jpeg"
                  alt="Privati"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute bottom-0 p-10">

                  <FaUserTie className="text-5xl text-white mb-6" />

                  <h3 className="text-4xl font-light">
                    Affiliazione
                    <br />
                    Privati
                  </h3>

                  <p className="mt-6 text-neutral-300 max-w-md leading-relaxed">
                    Trasforma le tue competenze
                    in opportunità concrete
                    e ricevi nuovi clienti.
                  </p>

                  <Link href="/affiliazione/privato">
                    <button className="mt-8 inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-neutral-200 transition">

                      Scopri di più

                      <FaArrowRight />

                    </button>
                  </Link>

                </div>
              </div>
            </motion.div>

            {/* AZIENDE */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl"
            >

              <div className="relative h-[500px]">

                <Image
                  src="/images/affiliazione-azienda2.jpeg"
                  alt="Aziende"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute bottom-0 p-10">

                  <FaBusinessTime className="text-5xl text-white mb-6" />

                  <h3 className="text-4xl font-light">
                    Affiliazione
                    <br />
                    Aziende
                  </h3>

                  <p className="mt-6 text-neutral-300 max-w-md leading-relaxed">
                    Espandi il tuo business,
                    aumenta la visibilità
                    e trova nuovi clienti.
                  </p>

                  <Link href="/affiliazione/azienda#modulo-contatti">
                    <button className="mt-8 inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-neutral-200 transition">

                      Scopri di più

                      <FaArrowRight />

                    </button>
                  </Link>

                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* CTA */}
        <section className="relative py-40 text-center overflow-hidden">

          <Image
            src="/images/community2.png"
            alt="Community"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 px-6">

            <div className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
              Costruiamo insieme
              <br />
              il futuro del lavoro.
            </div>

            <p className="mt-10 text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Unisciti a una piattaforma che valorizza
              competenze, relazioni e crescita professionale.
            </p>

            <Link href="/contatti">
              <button className="mt-12 bg-white text-black px-12 py-5 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-neutral-200 transition">
                Contattaci Ora
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
}