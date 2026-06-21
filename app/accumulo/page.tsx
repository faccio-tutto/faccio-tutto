"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Battery,
  Zap,
  Sun,
  ArrowRight,
} from "lucide-react";

import ModuloContatti from "./ModuloContatti";
import { FaInstagramSquare, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

// Dati dei produttori e sistemi premium
const brandSistemi = [
  {
    brand: "U CAN POWER",
    sistema: "UHome 3K0L~8K0L",
    tag: "Ecosistema Integrato",
    descrizione: "UHome è un sistema fotovoltaico domestico con stoccaggio dell'energia(ESS) all-in-one che integra l'inverter, il caricabatterie e le batterie in un unico sistema modulare precablato per un'installazione più semplice e veloce che riduce i tempi di installazione fino al 50%",
    image: "/images/u-can-power.png", // Sostituisci con le tue immagini nel folder public
  },
  {
    brand: "SMA",
    sistema: "Sunny Boy Smart Energy",
    tag: "Soluzione 2 in 1 per la produzione e l'utilizzo di energia solare",
    descrizione: "Inverter fotovoltaico ed un inverter per batteria racchiusi in un’unica soluzione, garantisce un approvvigionamento energetico sostenibile e sicuro.",
    image: "/images/sma-system.png",
  },
  {
    brand: "ZCS Azzurro Zucchetti",
    sistema: "EASY POWER – One And All",
    tag: "Tecnologia a Microinverter",
    descrizione: "ZCS Azzurro per accumulo ibrido costituisce la soluzione ideale per ottimizzare l’indipendenza energetica in ambito residenziale. Con una potenza nominale da 3 a 6kW ed una capacità in accumulo fino a 20,4kWh, si adatta ad ogni tipo di esigenza su impianti di nuova costruzione.",
    image: "/images/zcs-system.png",
  },
  {
    brand: "Huawei",
    sistema: "SUN2000 + FusionSolar Luna2000",
    tag: "Design Modulare Elegante",
    descrizione: "Estetica minimalista ed elettronica avanzata. Ogni blocco batteria è dotato di un ottimizzatore indipendente per sfruttare il 100% della capacità utile.",
    image: "/images/huawei-system.png",
  },
  {
    brand: "Fronius",
    sistema: "Primo Gen24 6.0 Plus + Reserva",
    tag: "Affidabilità Europea",
    descrizione: "Inverter ibrido monofase, ingegnerizzato in Austria. Offre funzioni di backup d'emergenza integrate uniche per la massima continuità di esercizio.",
    image: "/images/fronius-system.png",
  },
  {
    brand: "Deye",
    sistema: "SUN-6K-SG05LP1-EU + Batteria V-TAC VT-48200B LVB litio 48V 9,6KW",
    tag: "Sistema Ibrido",
    descrizione: "Efficienza di conversione al 96,6%, elevata capacità del campo fotovoltaico. Tecnologia di raffreddamento avanzata, design compatto e interfaccia con display LCD per un monitoraggio semplice e intuitivo.",
    image: "/images/deye-system.png",
  },
];

const menuItems = [
    { name: "Architettura", href: "/progettazione" },
    { name: "Fotovoltaico", href: "/fotovoltaico" },
    { name: "Infissi", href: "/infissi" },
    { name: "Climatizzazione", href: "/climatizzazione" },
    { name: "Riparazioni", href: "/riparazioni-veloci" },
    { name: "Contatti", href: "/prenota" },
  ];

export default function AccumuloPage() {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0.6]);

  return (
    <main className="bg-black text-white overflow-x-hidden">
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
      {/* HERO PARALLAX */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0">
          <Image
            src="/images/accumulo-hero.png"
            alt="Batteria energia"
            fill
            className="object-cover opacity-40"
            priority
          />
        </motion.div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Accumula la tua energia
          </h1>
          <p className="mt-6 text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Sistemi di accumulo intelligenti progettati per ridurre i consumi energetici
            e aumentare l’autonomia della tua casa.
          </p>
        </div>
      </section>

      {/* BENEFIT */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10 border-b border-zinc-900">
        {[{
          icon: Battery,
          title: "Autonomia energetica",
          text: "Usa l’energia quando serve davvero"
        },{
          icon: Sun,
          title: "Sistema integrato al fotovoltaico",
          text: "Massimo autoconsumo"
        },{
          icon: Zap,
          title: "Gestione smart",
          text: "Ottimizzazione automatica"
        }].map((item, i) => (
          <div key={i} className="text-center group">
            <item.icon className="mx-auto mb-4 text-gray-400 group-hover:text-white transition-colors duration-300" size={32} strokeWidth={1} />
            <h3 className="text-xl font-light">{item.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{item.text}</p>
          </div>
        ))}
      </section>

      {/* 🏭 GRIGLIA PRODUTTORI E SISTEMI */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              I NOSTRI PARTNER TECNOLOGICI
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto font-light">
              Selezioniamo solo i migliori produttori mondiali per garantire efficienza, sicurezza e monitoraggio da remoto di ultima generazione.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandSistemi.map((item, index) => (
              <div 
                key={index} 
                className="bg-black border border-zinc-900 rounded-lg overflow-hidden flex flex-col hover:border-zinc-700 transition-all duration-300 group"
              >
                {/* Contenitore Immagine */}
                <div className="relative h-64 w-full bg-zinc-900 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.brand} ${item.sistema}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-gray-300 uppercase">
                    {item.tag}
                  </div>
                </div>

                {/* Dettagli Testo */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
                      {item.brand}
                    </span>
                    <h3 className="text-2xl font-light mb-4 tracking-tight">
                      {item.sistema}
                    </h3>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">
                      {item.descrizione}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚡ COMPARATORE AUTOCONSUMO */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-10 tracking-tight">
          Autoconsumo vs Rete
        </h2>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div className="border border-zinc-900 p-8 rounded-xl bg-zinc-950/50">
            <h3 className="text-xl font-light mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span> Con accumulo
            </h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Fino all’80% di energia autoprodotta utilizzata in casa. Indipendenza quasi totale dai rincari delle bollette commerciali ed energia pulita di notte.
            </p>
          </div>

          <div className="border border-zinc-900 p-8 rounded-xl bg-zinc-950/50">
            <h3 className="text-xl font-light mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500"></span> Senza accumulo
            </h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              L'energia prodotta di giorno e non consumata all'istante viene immessa in rete e venduta con il meccanismo del Ritiro Dedicato per pochi centesimi.
            </p>
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-10 tracking-tight">
            Richiedi una consulenza tecnica
          </h2>
          <ModuloContatti destinatarioEmail={undefined} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-black">
        <h2 className="text-4xl font-light tracking-tight">
          Porta la tua casa nell'ecosistema del futuro
        </h2>
        <button className="mt-8 bg-white text-black px-8 py-4 rounded-full flex items-center gap-2 mx-auto hover:bg-gray-200 transition-colors font-medium text-sm">
          Inizia ora <ArrowRight size={16} />
        </button>
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