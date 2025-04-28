"use client";
import React from "react";
import { FaTools, FaRecycle, FaPhone, FaMailBulk, FaMailchimp, FaRegMoneyBillAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import styles from "./page.module.css";
import ModuloContatti from './ModuloContatti';

const RepairPage = () => {
  const appliances = [
    {
      name: "Asciugacapelli",
      image: "/images/asciugacapelli.jpeg",
      description: "Riparazione di asciugacapelli con problemi di surriscaldamento, motore o cavi danneggiati.",
    },
    {
      name: "Ferro da stiro",
      image: "/images/ferrodaStiro.jpeg",
      description: "Riparazione di ferri da stiro con problemi di riscaldamento, vapore o perdite d'acqua.",
    },
    {
      name: "Frullatore",
      image: "/images/frullatore.jpeg",
      description: "Riparazione di frullatori con problemi di motore, lame o guarnizioni.",
    },
    {
      name: "Aspirapolvere",
      image: "/images/aspirapolvere.jpeg",
      description: "Riparazione di aspirapolvere con problemi di aspirazione, motore o filtri.",
    },
    {
      name: "Tablet",
      image: "/images/tablet.jpeg",
      description: "Riparazione di tablet con problemi di schermo, batteria o software.",
    },
    {
      name: "Smartphone",
      image: "/images/telefono.jpeg",
      description: "Riparazione di telefoni cellulari con problemi di schermo, batteria, fotocamera o software.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-white flex flex-col"
    >
      {/* Navbar */}
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <a href="/">
            <Image
              src="/logo faccio tutto 3.png"
              alt="Logo Faccio Tutto"
              width={180}
              height={180}
              className="rounded-full"
            />
          </a>
          <h1 className="text-2xl font-semibold">faccio-tutto.it</h1>
        </div>
        <ul className="flex gap-8">
          {[
            { name: "Home", href: "/" },
            { name: "Mission", href: "/mission" },
            { name: "Vision", href: "/vision" },
            { name: "Chi siamo", href: "/chisiamo" },
            { name: "Affiliazione", href: "/affiliazione" },
            { name: "Contatti", href: "/contatti" },
          ].map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-blue-400 transition-colors duration-300">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

{/* Header */}
<header className="text-center py-20" style={{ backgroundColor: "#000000" }}> {/* Nero */}
  <motion.h2
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="text-8xl font-bold"
    style={{ fontSize: "1.7rem", color: "#FFA500" }} // Giallo
  >
    Ripariamo i tuoi piccoli elettrodomestici
  </motion.h2>
  <motion.p
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="text-lg mt-4 max-w-2xl mx-auto"
    style={{ fontSize: "1.2rem", color: "#E5E7EB" }} // Grigio chiaro
  >
    Risparmia denaro e aiuta l'ambiente con il nostro servizio di riparazione professionale e affidabile.
  </motion.p>
</header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 bg-black flex-1">
        <section id="about" className="mb-16 bg-black">
          <motion.h2 style={{ color: "#FFA500" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold mb-6 text-blue-400"
          >
            PERCHE' SCEGLIERE LA RIPARAZIONE?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-200 text-left mb-8 max-w-2xl"
          >
            Riparare i piccoli elettrodomestici è una scelta sostenibile che aiuta a ridurre i rifiuti e a risparmiare denaro. Inoltre, prolunga la vita dei tuoi dispositivi, contribuendo a un ambiente più pulito. Optare per la riparazione, anziché la sostituzione, rappresenta un atto di responsabilità ambientale che si traduce in una significativa riduzione dei rifiuti elettronici, una delle forme di inquinamento più insidiose e in rapida crescita.
La riparazione contribuisce a preservare le risorse naturali, limitando l'estrazione di materie prime necessarie per la produzione di nuovi apparecchi ed è anche un modo per valorizzare il lavoro artigianale e le competenze tecniche, spesso sottovalutate in una società dominata dalla produzione di massa. Affidarsi a chi sa riparare un elettrodomestico significa sostenere un'economia locale e una tradizione di saper fare che merita di essere preservata.
In definitiva, la riparazione dei piccoli elettrodomestici rappresenta una scelta etica e sostenibile, che coniuga rispetto per l'ambiente, risparmio economico e valorizzazione delle competenze artigianali.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-10"
          >
            <FaTools size={60} className="text-blue-400" />
            <FaRecycle size={60} className="text-green-400" />
          </motion.div>
        </section>

        <section id="repair" className="mb-16 bg-black">
          <motion.h2 style={{ color: "#FFA500" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold mb-8 text-blue-400"
          >
            RIPARAZIONE DI PICCOLI 
            <br/>ELETTRODOMESTICI
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliances.map((appliance, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-orange-100 p-6 rounded-xl text-center text-yellow-600 hover:shadow-2xl transition-shadow duration-300" // Modifica bg-gray-800 a bg-black
            >
              <Image
                src={appliance.image}
                alt={appliance.name}
                width={250}
                height={250}
                className="mx-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{appliance.name}</h3>
              <p className="text-gray-400">{appliance.description}</p>
            </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="text-center bg-black flex-col justify-center items-center">
          <motion.h2 style={{ color: "#FFA500" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold mb-6 text-blue-400"
          >
           INFORMAZIONI E PREVENTIVI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 text-left mb-8 max-w-2xl mx-auto"
          >
          Il nostro team di esperti è a tua completa disposizione per fornirti preventivi dettagliati e consulenze personalizzate, senza alcun costo aggiuntivo.

Siamo consapevoli che ogni elettrodomestico presenta problematiche specifiche e che ogni cliente ha esigenze diverse. Per questo motivo, ci impegniamo a offrire un servizio di consulenza approfondito, durante il quale analizzeremo attentamente il tuo caso, ti forniremo tutte le informazioni necessarie e ti guideremo nella scelta della soluzione più adatta alle tue esigenze e al tuo budget.

Il nostro obiettivo è quello di instaurare un rapporto di fiducia con i nostri clienti, basato sulla trasparenza, sulla professionalità e sulla competenza. Per questo motivo, ci impegniamo a fornirti preventivi chiari e dettagliati, che ti permetteranno di valutare in modo consapevole i costi e i benefici della riparazione.

Non esitare a contattarci per qualsiasi informazione o richiesta. Saremo lieti di rispondere a tutte le tue domande e di fornirti il supporto necessario per risolvere i tuoi problemi con i piccoli elettrodomestici.
          </motion.p>
          <motion.a
  href="/contatti"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="inline-block bg-blue-500 text-white py-3 px-8 rounded-xl hover:bg-blue-600 transition-colors duration-300"
>
  <TfiEmail className="inline-block mr-3" /> Contattaci
</motion.a>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-black text-gray-300">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </motion.div>
  );
};

export default RepairPage;