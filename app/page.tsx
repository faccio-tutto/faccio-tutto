"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWrench, FaPhone, FaDraftingCompass, FaSolarPanel, FaWind, FaDoorOpen, FaInstagramSquare, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONTENUTO PRINCIPALE ---

const MainContent = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const servizi = [
    { id: "progettazione", icon: <FaDraftingCompass />, title: "Architettura", link: "/progettazione" },
    { id: "fotovoltaico", icon: <FaSolarPanel />, title: "Fotovoltaico", link: "/fotovoltaico" },
    { id: "infissi", icon: <FaDoorOpen />, title: "Infissi", link: "/infissi" },
    { id: "climatizzazione", icon: <FaWind />, title: "Climatizzazione", link: "/climatizzazione" },
    { id: "riparazioni-veloci", icon: <FaWrench />, title: "Riparazioni", link: "/riparazioni-veloci" },
    { id: "contatti", icon: <FaPhone />, title: "Prenota", link: "/prenota" }
  ];

  const workflow = [
    { num: "01", title: "Richiesta", desc: "Inviaci la tua esigenza online" },
    { num: "02", title: "Selezione", desc: "Scegliamo i tecnici migliori" },
    { num: "03", title: "Preventivo", desc: "Ricevi una quotazione chiara" },
    { num: "04", title: "Esecuzione", desc: "Lavori eseguiti a regola d'arte" },
    { num: "05", title: "Feedback", desc: "Valuta il nostro professionista" }
  ];

  const postRecenti = [
    "/images/post 8 maggio architettura.png",
    "/images/post 10 maggio.png",
    "/images/post 14 maggio.png",
    "/images/post 21 maggio.png",
    "/images/post 29 maggio.png",
    "/images/post 3 giugno.png",
  ];

  return (
    <div className="w-full bg-white font-sans antialiased" style={{ backgroundColor: '#ffffff', color: '#171717' }}>

      {/* Macro Sezione 1: Progettazione & Spazio */}
      <section className="bg-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <span className="text-xs font-bold tracking-widest uppercase block" style={{ color: '#a3a3a3' }}>Design & Direzione Lavori</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight" style={{ color: '#171717' }}>Progettazione Architettonica</h2>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: '#404040' }}>
              Hai bisogno di un progetto per la tua nuova casa o per la tua attività? Affidati ai nostri esperti per ridefinire i tuoi spazi interni ed esterni con soluzioni su misura e cura dei dettagli.
            </p>
            <div className="pt-4">
              <Link href="/progettazione" className="inline-flex items-center gap-2 text-sm font-bold border-b-2 pb-1 hover:opacity-70 transition" style={{ color: '#171717', borderColor: '#171717' }}>
                Scopri i dettagli <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-square w-full bg-neutral-100 rounded-2xl overflow-hidden order-1 lg:order-2 shadow-sm">
            <Image src="/images/progettazione.png" alt="Progettazione" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Macro Sezione 2: Efficienza & Futuro */}
      <section className="border-y border-neutral-100" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video lg:aspect-square w-full bg-neutral-100 rounded-2xl overflow-hidden shadow-sm">
            <Image src="/images/energia-verde.png" alt="Risparmio energetico" fill className="object-cover" />
          </div>
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase block" style={{ color: '#a3a3a3' }}>Sostenibilità Energetica</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight" style={{ color: '#171717' }}>Impianti Fotovoltaici e Infissi</h2>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: '#404040' }}>
              Riduci l'impatto ambientale e abbatti i costi in bolletta. Progettiamo e installiamo impianti fotovoltaici di ultima generazione, impianti di climatizzazione invernale ed estiva uniti ad infissi ad alta efficienza termica per aumentare il valore della tua abitazione.
            </p>
            <div className="pt-4">
              <Link href="/fotovoltaico" className="inline-flex items-center gap-2 text-sm font-bold border-b-2 pb-1 hover:opacity-70 transition" style={{ color: '#171717', borderColor: '#171717' }}>
                Calcola il risparmio <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Macro Sezione 3: Comfort Clima & Aria */}
      <section className="bg-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <span className="text-xs font-bold tracking-widest uppercase block" style={{ color: '#a3a3a3' }}>Comfort Termico</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight" style={{ color: '#171717' }}>Impianti di Climatizzazione</h2>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: '#404040' }}>
              Rinfresca d'estate e riscalda d'inverno con la massima efficienza. Ci occupiamo della fornitura, installazione e manutenzione di condizionatori e sistemi di climatizzazione avanzati adatti a ogni stanza della tua casa.
            </p>
            <div className="pt-4">
              <Link href="/climatizzazione" className="inline-flex items-center gap-2 text-sm font-bold border-b-2 pb-1 hover:opacity-70 transition" style={{ color: '#171717', borderColor: '#171717' }}>
                Richiedi un preventivo <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-square w-full bg-neutral-100 rounded-2xl overflow-hidden order-1 lg:order-2 shadow-sm">
            {/* Nota: Ricordati di aggiungere una foto adatta o lasciare quella generica se preferisci */}
            <Image src="/images/climatizzazione.png" alt="Impianti di Climatizzazione" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Sezione Statistiche */}
      <section className="bg-neutral-950 text-white py-24 border-t border-neutral-900" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "24h", label: "Tempo di Risposta" },
            { val: "100+", label: "Interventi Completati" },
            { val: "97%", label: "Clienti Soddisfatti" },
            { val: "1", label: "Unico Referente" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-6xl font-light tracking-tight text-white">{stat.val}</div>
              <p className="text-xs text-neutral-400 font-bold tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sezione Workflow Lineare */}
      <section className="bg-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 space-y-16">
          <div className="text-center space-y-3">
            <h3 className="text-2xl md:text-4xl font-light tracking-tight" style={{ color: '#171717' }}>Efficienza dall'inizio alla fine</h3>
            <p className="text-sm max-w-md mx-auto" style={{ color: '#737373' }}>Un ecosistema studiato per eliminare stress, attese e burocrazia.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8">
            {workflow.map((step, index) => (
              <div key={index} className="space-y-3 relative group">
                <div className="text-3xl font-light text-neutral-300 group-hover:text-neutral-900 transition duration-300">{step.num}</div>
                <div className="h-[2px] bg-neutral-100 w-full mb-4" />
                <h4 className="text-sm font-bold" style={{ color: '#171717' }}>{step.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#525252' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galleria Post Informativi */}
      <section className="border-t border-neutral-100 py-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: '#a3a3a3' }}>Aggiornamenti</span>
            <p className="text-2xl font-light" style={{ color: '#171717' }}>Ultimi approfondimenti dal network</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {postRecenti.map((src, index) => (
              <div
                key={index}
                className="cursor-pointer overflow-hidden rounded-xl border border-neutral-200 shadow-sm bg-white aspect-square relative group"
                onMouseEnter={() => setHoveredImage(src)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <Image src={src} alt={`Approfondimento ${index + 1}`} fill className="object-cover group-hover:scale-105 transition duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-white py-32 text-center space-y-6 border-t border-neutral-100">
        <h3 className="text-3xl md:text-5xl font-light tracking-tight" style={{ color: '#171717' }}>Gestisci la tua casa in modo intelligente</h3>
        <p className="text-sm max-w-sm mx-auto" style={{ color: '#525252' }}>Richiedi un preventivo gratuito per interventi tecnici, infissi, impianti fotovoltaici e di climatizzazione invernale ed estiva</p>
        <div className="pt-4 flex justify-center gap-4">
          <Link href="/prenota">
            <button className="hover:bg-neutral-800 text-white font-bold px-10 py-3.5 rounded-full text-xs uppercase tracking-widest transition shadow-sm" style={{ backgroundColor: '#171717' }}>
              Contattaci ora
            </button>
          </Link>
        </div>
      </section>

      {/* Modal di Ingrandimento */}
      <AnimatePresence>
        {hoveredImage && (
          <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white p-2 shadow-2xl rounded-2xl max-w-md w-full"
            >
              <Image src={hoveredImage} alt="Anteprima" width={300} height={300} className="rounded-xl object-contain w-full h-auto" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- PAGINA APERTURA (HERO FULL-SCREEN STILE TESLA) ---

const HomePage = () => {
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
        
      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center text-center px-4 overflow-hidden">
        <Image src="/sfondo nuovo.png" alt="Sfondo Casa Sostenibile" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-neutral-950/50" />

        <div className="relative z-10 max-w-3xl space-y-4 pt-12">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight"
          >
            Casa Intelligente, <br /><span className="font-medium text-amber-400">Un Solo Riferimento</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base text-neutral-200 max-w-md mx-auto tracking-wide font-light"
          >
            Progettazione, impianti fotovoltaici, infissi e soluzioni di climatizzazione.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-8 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xs mx-auto sm:max-w-none"
          >
            <Link href="/prenota">
              <button className="w-full sm:w-auto bg-white hover:bg-neutral-100 font-bold px-12 py-3.5 rounded-full text-xs uppercase tracking-widest transition shadow-md" style={{ color: '#171717' }}>
                Richiedi Preventivo
              </button>
            </Link>
            <Link href="/chisiamo">
              <button className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-black px-12 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white transition duration-200">
                Scopri di più
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase animate-pulse hidden md:block font-bold">
          Scorri per esplorare
        </div>
      </header>

      {/* Intro Iconica dei Tre Pilastri Fondamentali */}
      <section className="py-24 text-neutral-300 border-t border-neutral-900" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {[
            { title: "Gestione Unificata", desc: "Un unico manager tecnico dedicato per eliminare l'incomprensione tra professionisti diversi." },
            { title: "Standard Qualitativi", desc: "Selezioniamo rigorosamente solo artigiani esperti e architetti ed ingegneri abilitati nel territorio." },
            { title: "Zero Sprechi", desc: "Ottimizziamo l'efficienza energetica del tuo stabile abbattendo definitivamente i consumi." }
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">{item.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Render */}
      <main className="flex-grow bg-white" style={{ backgroundColor: '#ffffff' }}>
        <MainContent />
      </main>

     {/* Footer Tesla Style */}
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
};

export default HomePage;