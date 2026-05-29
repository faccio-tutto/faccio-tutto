"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import ModuloContatti from "./ModuloContatti";

const InfissiPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo faccio tutto 3.png"
            alt="Logo"
            width={120}
            height={120}
          />
        </Link>

        <div className="flex gap-6 items-center text-sm text-neutral-300">
          <Link href="/infissi">Infissi</Link>
          <Link href="/fotovoltaico">Fotovoltaico</Link>
          <Link href="/progettazione">Architettura</Link>

          <a href="https://www.instagram.com/infofacciotutto/" target="_blank">
            <FaInstagramSquare />
          </a>

          <a href="https://www.linkedin.com/company/faccio-tutto/" target="_blank">
            <FaLinkedin />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop"
          alt="Infissi moderni"
          fill
          className="object-cover opacity-40"
          priority
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.4em] uppercase text-neutral-400"
          >
            Serramenti premium
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light mt-6"
          >
            Infissi che migliorano
            <br />
            la tua casa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-neutral-300 mt-8 text-lg"
          >
            Design minimale, prestazioni elevate e comfort abitativo superiore.
          </motion.p>
        </div>
      </header>

      {/* SECTION INFO */}
      <section className="bg-black py-28 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-neutral-500">
            Soluzioni
          </p>
          <h2 className="text-4xl md:text-5xl font-light mt-4">
            Infissi su misura
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* PVC */}
          <div className="rounded-3xl overflow-hidden bg-[#111] border border-neutral-800">
            <div className="relative h-72">
              <Image
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070&auto=format&fit=crop"
                alt="PVC"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-light">Infissi PVC</h3>
              <p className="text-neutral-400 mt-3">
                Isolamento termico avanzato e ottimo rapporto qualità/prezzo.
              </p>
            </div>
          </div>

          {/* ALLUMINIO */}
          <div className="rounded-3xl overflow-hidden bg-[#111] border border-neutral-800">
            <div className="relative h-72">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
                alt="Alluminio"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-light">
                Alluminio a taglio termico
              </h3>
              <p className="text-neutral-400 mt-3">
                Design moderno, durata e massima resistenza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#0a0a0a] py-28 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-light">Servizi inclusi</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 max-w-4xl mx-auto text-neutral-400">
          {[
            "Sopralluogo tecnico",
            "Progettazione su misura",
            "Installazione certificata",
            "Consulenza energetica",
            "Gestione pratiche",
            "Assistenza post-vendita",
          ].map((item, i) => (
            <div
              key={i}
              className="border-b border-neutral-800 py-5 text-lg font-light"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA + FORM */}
      <section className="bg-black py-28 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-xs tracking-[0.4em] text-neutral-500 uppercase">
              Contatto
            </p>

            <h2 className="text-4xl font-light mt-4">
              Richiedi un preventivo
            </h2>

            <p className="text-neutral-400 mt-6">
              Ti risponderemo con una soluzione su misura per la tua casa.
            </p>
          </div>

          <div className="bg-[#111] border border-neutral-800 rounded-3xl p-6">
            <ModuloContatti destinatarioEmail="infissi@faccio-tutto.it" />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-neutral-500 text-sm">
        © {new Date().getFullYear()} faccio-tutto.it
      </footer>

    </div>
  );
};

export default InfissiPage;