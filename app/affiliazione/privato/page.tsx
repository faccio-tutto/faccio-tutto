"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  FaInstagramSquare,
  FaLinkedin,
  FaArrowRight,
  FaFileDownload,
  FaInstagram,
} from "react-icons/fa";

import ModuloContatti from "./ModuloContatti";

const AffiliazionePrivati = () => {
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

 {/* Navbar Minimal Tesla Style */}
      <nav className="absolute top-0 left-0 w-full text-white py-4 px-6 md:px-12 flex justify-between items-center z-40 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-6">
          <a href="/" className="transition hover:opacity-80">
            <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={110} height={110} className="rounded" />
          </a>
          <div className="hidden sm:flex items-center gap-3 text-xs tracking-wider uppercase font-bold text-neutral-300">
            <span>faccio-tutto.it</span>
            <a href="https://www.instagram.com/infofacciotutto/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaInstagram className="text-base" /></a>
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

      </main>
    </>
  );
};

export default AffiliazionePrivati;