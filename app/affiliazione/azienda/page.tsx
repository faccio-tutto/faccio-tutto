"use client";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import ModuloContatti from "./ModuloContatti";

export default function AffiliazioneAzienda() {
  return (
    <>
      <Head>
        <title>Affiliazione Azienda | faccio-tutto.it</title>

        <meta
          name="description"
          content="Affilia la tua azienda a faccio-tutto.it. Collaborazioni professionali per fotovoltaico, serramenti, edilizia e servizi tecnici."
        />

        <link
          rel="canonical"
          href="https://www.faccio-tutto.it/affiliazione/azienda"
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
}