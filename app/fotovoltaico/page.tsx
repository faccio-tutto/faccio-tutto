"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BatteryCharging,
  Sun,
  ShieldCheck,
  ArrowRight,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";

export default function EnergyLandingPage() {
  return (
    <main className="bg-black text-white overflow-hidden">

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

          <div className="hidden sm:flex items-center gap-3 text-xs tracking-wider uppercase font-bold text-neutral-300">
            <span>faccio-tutto.it</span>
            <a href="https://www.instagram.com/infofacciotutto/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaInstagramSquare className="text-base" /></a>
            <a href="https://www.linkedin.com/company/faccio-tutto/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaLinkedin className="text-base" /></a>
          </div>
        </div>

        <ul className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.25em] text-white/60">
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
      <section className="relative h-screen flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070"
          alt="Fotovoltaico"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
            Energia per il futuro
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">
            Fotovoltaico, accumulo e riqualificazione energetica
            con progettazione e installazione professionale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/preventivoFV" className="relative z-10 mt-8 inline-block">
              <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                Crea il tuo preventivo
              </button>
            </Link>
    
            <button className="border border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition">
              Scopri di più
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION POWER */}
      <section className="min-h-screen grid md:grid-cols-2">
        <div className="relative h-[500px] md:h-auto">
          <img
            src="/images/accumulo.png"
            alt="Accumulo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center px-8 md:px-20 py-20">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BatteryCharging className="w-14 h-14 mb-6 text-blue-400" />

            <div className="text-4xl md:text-4xl font-semibold mb-6">
              Accumula la tua energia
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Sistemi di accumulo intelligenti progettati per ridurre
              i consumi energetici e aumentare l’autonomia della tua casa.
            </p>

            <button className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-500 transition">
              Scopri il sistema
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION SOLAR */}
      <section className="relative min-h-screen flex items-center">
        <img
          src="/images/fotovoltaicoaltaefficienza.png"
          alt="Solar"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-5xl px-8 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Sun className="w-14 h-14 mb-6 text-yellow-400" />

            <div className="text-5xl md:text-4xl font-semibold leading-tight mb-8">
              Fotovoltaico ad alta efficienza
            </div>

            <p className="text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
              Soluzioni avanzate per abitazioni e aziende con gestione
              completa pratiche, incentivi e installazione certificata.
            </p>
<Link href="/CalcolatoreFV" className="relative z-10 mt-8 inline-block">
              <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition">
                Calcola il tuo risparmio
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 px-6 md:px-20 bg-[#0f1115]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">
              Tecnologia. Affidabilità. Efficienza.
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Un unico referente per progettazione, pratiche,
              installazione e assistenza tecnica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition">
              <Sun className="w-12 h-12 mb-6 text-yellow-400" />

              <h3 className="text-2xl font-semibold mb-4">
                Energia Pulita
              </h3>

              <p className="text-gray-400">
                Produzione energetica intelligente con impianti ad alte prestazioni.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition">
              <BatteryCharging className="w-12 h-12 mb-6 text-blue-400" />

              <h3 className="text-2xl font-semibold mb-4">
                Accumulo Smart
              </h3>

              <p className="text-gray-400">
                Batterie di accumulo avanzate per indipendenza energetica.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition">
              <ShieldCheck className="w-12 h-12 mb-6 text-green-400" />

              <h3 className="text-2xl font-semibold mb-4">
                Assistenza Completa
              </h3>

              <p className="text-gray-400">
                Supporto tecnico, incentivi, GSE e pratiche incluse.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-40 text-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0f1115]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 px-6"
        >
          <div className="text-5xl md:text-4xl font-semibold mb-8">
            Inizia oggi
          </div>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Richiedi una consulenza tecnica gratuita e scopri
            quanto puoi risparmiare con il tuo nuovo impianto.
          </p>
<Link href="/contatti" className="relative z-10 mt-8 inline-block">
              <button className="bg-blue-600 hover:bg-blue-500 transition px-10 py-4 rounded-full text-lg font-medium">
                Contattaci
              </button>
            </Link>
        </motion.div>
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
  );
}