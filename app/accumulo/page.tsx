"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Battery,
  Zap,
  Sun,
  ArrowRight,
} from "lucide-react";

import ModuloContatti from "./ModuloContatti";

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
    sistema: "Symo Gen24 Plus",
    tag: "Sistema Ibrido Avanzato",
    descrizione: "Inverter ibrido trifase pluripremiato, ingegnerizzato in Austria. Offre funzioni di backup d'emergenza integrate uniche per la massima continuità di esercizio.",
    image: "/images/brands/deye-system.jpg",
  },
];

export default function AccumuloPage() {
  const { scrollY } = useScroll();

  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0.6]);

  return (
    <main className="bg-black text-white overflow-x-hidden">

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

    </main>
  );
}