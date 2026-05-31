"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWrench, FaPhone, FaDraftingCompass, FaSolarPanel, FaWind, FaDoorOpen, FaInstagramSquare, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
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
      <section className="h-screen snap-start relative flex items-center justify-center overflow-hidden">

        <Image
          src="/images/architettura1.png"
          alt="hero"
          fill
          priority
          className="object-cover scale-110"
        />

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Architettura Essenziale
          </h1>

          <p className="mt-6 text-white/70 text-lg">
            Progettazione · Direzione Lavori · Innovazione
          </p>
        </motion.div>
      </section>

      {/* PROGETTAZIONE */}
      <section className="h-screen snap-start flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-center"
        >
          <div className="text-4xl md:text-5xl font-light mb-6">
            Progettazione Architettonica
          </div>

          <p className="text-white/60 leading-relaxed text-lg">
            La progettazione architettonica non è solo disegno, ma la
            trasformazione dello spazio in esperienza. Ogni progetto nasce
            dall’equilibrio tra funzione, estetica e sostenibilità.
          </p>
        </motion.div>
      </section>

      {/* GALLERY CINEMATICA */}
      <section className="h-screen snap-start flex items-center justify-center">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-8xl px-6">

          {[
            "/images/building-phase-0.png",
            "/images/building-phase-1.png",
            "/images/building-phase-2.png",
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative h-[40vh] overflow-hidden rounded-2xl"
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover scale-110 hover:scale-125 transition duration-700"
              />
            </motion.div>
          ))}

        </div>
      </section>

      {/* DIREZIONE LAVORI */}
      <section className="h-screen snap-start relative flex items-center justify-center">

        <Image
          src="/images/direzione10.png"
          alt="direzione lavori"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <div className="text-5xl font-light">
            Direzione Lavori
          </div>

          <p className="mt-6 text-white/60 text-lg">
            Controllo, precisione e responsabilità in ogni fase del cantiere.
            Garantiamo qualità e rispetto del progetto.
          </p>
        </motion.div>
      </section>

      {/* IMPATTO VISIVO */}
      <section className="h-screen snap-start relative flex items-center justify-center">

        <Image
          src="/images/spazi1.png"
          alt="progetto"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <div className="text-5xl font-light">
            Spazi che prendono forma
          </div>

          <p className="mt-6 text-white/60">
            Ogni progetto è una trasformazione concreta dell’idea in realtà.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="h-screen snap-start flex items-center justify-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-light mb-8">
            Iniziamo il tuo progetto
          </div>

          <a
            href="/contatti"
            className="px-10 py-4 bg-white text-black rounded-full hover:scale-105 transition"
          >
            Contattaci
          </a>
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