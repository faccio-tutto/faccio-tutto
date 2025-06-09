"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "./riparazioni-veloci.css"; // ✅ Importa il CSS
import Link from "next/link"; // Importa Link
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaDraftingCompass, FaSolarPanel, FaDoorOpen, FaPlug, FaWrench, FaPhone } from "react-icons/fa";
import { Card } from "@/components/ui/card"; // Importa il componente Card personalizzato
import React from "react";

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

// CustomCardContent e CustomCard sono importati da "@/components/ui/card"

export default function Home() {
  const services = [
    { name: "Riparazione tubi", image: "/images/tubo-rotto.jpeg" },
    { name: "Sostituzione rubinetti", image: "/images/rubinetto.jpeg" },
    { name: "Tinteggiatura stanze", image: "/images/imbiancatura.jpeg" },
    { name: "Montaggio cassetti e mobili", image: "/images/mobili.jpeg" },
    { name: "Riparazione ante armadio", image: "/images/armadio.jpeg" },
    { name: "Sostituzione lampadari", image: "/images/lampadario.jpeg" },
    { name: "Sostituzione antenna TV", image: "/images/antenna.jpeg" },
    { name: "Installazione prese elettriche", image: "/images/presa-elettrica.jpeg" },
    { name: "Installazione interruttori smart", image: "/images/interruttore-smart.jpeg" },
    { name: "Configurazione assistente vocale", image: "/images/assistente-vocale.jpeg" },
    { name: "Montaggio staffa TV", image: "/images/staffa-tv.jpeg" },
    { name: "Fissaggio quadri", image: "/images/quadri.jpeg" },
    { name: "Montaggio scaffali", image: "/images/scaffali.jpeg" },
    { name: "Riparazioni elettriche generiche", image: "/images/elettricista.jpeg" },
    { name: "Montaggio tenda", image: "/images/tenda.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-black text-blue">
       {/* Navbar */}
           <nav className="bg-black text-white py-1 px-4 sm:px-6 flex flex-wrap justify-between items-center shadow-lg">
  <div className="flex items-center gap-1 min-w-[220px]">
    <a href="/">
      <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={160} height={160} className="rounded" />
    </a>
    <h1 className="text-base sm:text-xl font-normal flex items-center gap-2">
      faccio-tutto.it
      <a href="https://www.instagram.com/infofacciotutto/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Link">
        <FaInstagramSquare className="text-lg sm:text-xl" />
      </a>
      <a href="https://www.linkedin.com/company/faccio-tutto/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Link">
        <FaLinkedin className="text-lg sm:text-xl" />
      </a>
    </h1>
  </div>

  {/* Scrollable menu on small screens */}
  <ul className="flex gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible w-full sm:w-auto mt-2 sm:mt-0 text-sm sm:text-base">
    {[
      { name: "Home", href: "/" },
      { name: "Mission", href: "/mission" },
      { name: "Vision", href: "/vision" },
      { name: "Chi siamo", href: "/chisiamo" },
      { name: "Affiliazione", href: "/affiliazione" },
      { name: "Contatti", href: "/contatti" },
    ].map((link) => (
      <li key={link.href} className="whitespace-nowrap">
        <a href={link.href} className="hover:underline">{link.name}</a>
      </li>
    ))}
  </ul>
</nav>

{/* Header */}
<header className="text-center py-20 bg-cover bg-center text-white relative" style={{
  // Immagine di sfondo dell'uomo che ripara elettrodomestici con passione
  backgroundImage: 'url("/images/header riparazioni veloci.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: "#000000", /* Colore di fallback */
  minHeight: '700px' /* Altezza minima per visualizzare l'immagine */
}}>
  {/* Overlay per migliorare la leggibilità del testo */}
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <motion.h2
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 mt-70 text-8xl font-bold"
    style={{ fontSize: "1.7rem", color: "#2196F3" }} // Blue scuro
  >
    RIPARAZIONI VELOCI
  </motion.h2>
  <motion.p
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative z-10 mt-10 text-lg text-justify mt-4 max-w-5xl mx-auto"
    style={{ fontSize: "1.2rem", color: "#E5E7EB" }} // Grigio chiaro
  >
    Interventi rapidi per ogni riparazione domestica. Vogliamo creare una rete di professionisti indipendenti che offrono servizi di riparazione, configurazione e installazione per la casa e la tecnologia.
    I nostri artigiani sono persone comuni che hanno sviluppato competenze specializzate attraverso l'interesse personale e l'esperienza pratica.
  </motion.p>
</header>
    
{/* Main Content container with 2 columns */}
     <main className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 mt-10">
        {/* Colonna sinistra: pulsanti laterali (Sidebar) */}
        <aside className="hidden md:block sticky top-4 h-fit w-full md:w-1/4 lg:w-2/8 xl:w-1/8 z-10 bg-gray-200 p-4 rounded-lg shadow-lg">
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg space-y-4 flex flex-col items-center">
            {[{
              id: "progettazione",
              icon: <FaDraftingCompass className="text-3xl mb-0 text-purple-500" />,
              title: "Progettazione architettonica",
              link: "/progettazione"
            }, {
              id: "fotovoltaico",
              icon: <FaSolarPanel className="text-3xl mb-0 text-yellow-500" />,
              title: "Impianti fotovoltaici",
              link: "/fotovoltaico"
            }, {
              id: "infissi",
              icon: <FaDoorOpen className="text-3xl mb-0 text-orange-900" />,
              title: "Vendita e installazione infissi",
              link: "/infissi"
            }, {
              id: "riparazione-elettrodomestici",
              icon: <FaPlug className="text-3xl mb-0 text-orange-500" />,
              title: "Riparazione elettrodomestici",
              link: "/riparazione-elettrodomestici"
            }, {
              id: "riparazioni-veloci",
              icon: <FaWrench className="text-3xl mb-0 text-blue-500" />,
              title: "Riparazioni veloci",
              link: "/riparazioni-veloci"
            }, {
              id: "contatti",
              icon: <FaPhone className="text-3xl mb-0 text-green-500" />,
              title: "Prenota subito",
              link: "/prenota"
            }].map(service => (
                <Link href={service.link} key={service.id} className="block transform transition duration-300 hover:scale-105 w-full">
                    <Card className="bg-white border border-gray-200 p-0"> {/* Aggiunto bg-white, border e p-0 qui */}
                        <div className="p-4 text-center flex flex-col justify-center items-center">
                            <div className="rounded-full p-3 shadow-md bg-white">
                                {service.icon}
                            </div>
                            <h3 className={`text-sm font-semibold mt-2 text-gray-800`}>{service.title}</h3>
                        </div>
                    </Card>
                </Link>
            ))}
          </div>
        </aside>

      {/* --- Inizio Sezione Servizi Ottimizzata --- */}
<section className="py-16 sm:py-20 px-4 max-w-screen-xl mx-auto w-full text-white">

  {/* Titolo principale della sezione */}
  <div className="text-center mb-12">
    <div className="text-blue-400 text-2xl sm:text-3xl font-bold">
      Servizi Specializzati per la Casa e la Tecnologia
    </div>
    <div className="text-xl text-gray-400 mt-2">
      Soluzioni rapide e professionali per ogni tua esigenza.
    </div>
  </div>

  {/* --- Griglia a 3 colonne per i contenuti testuali (visibile su schermi grandi) --- */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

    {/* COLONNA 1: Cosa Offriamo */}
    <div className="p-6 bg-gray-900 rounded-lg">
      <div className="text-2xl font-semibold mb-4 text-blue-400">
        Cosa offriamo
      </div>
      {/* ✅ OTTIMIZZATO: Rimossi i <br/> e usata la classe space-y-4 per la spaziatura */}
      <ul className="text-left list-disc list-inside space-y-4 text-gray-300">
        <li>
          <b>RIPARAZIONI DOMESTICHE:</b>
          <br />
          Riparazioni idrauliche, elettriche, di elettrodomestici, mobili e altro ancora.
        </li>
        <li>
          <b>CONFIGURAZIONE DISPOSITIVI:</b>
          <br />
          Configurazione di smart home, assistenti vocali, reti domestiche e dispositivi mobili.
        </li>
        <li>
          <b>INSTALLAZIONI:</b>
          <br />
          Installazione di lampadari, tende, scaffali, supporti TV, prese e interruttori smart.
        </li>
      </ul>
    </div>

    {/* COLONNA 2: I Nostri Vantaggi */}
    <div className="p-6 bg-gray-900 rounded-lg">
      <div className="text-2xl font-semibold mb-4 text-blue-400">
        I nostri vantaggi
      </div>
      {/* ✅ OTTIMIZZATO: Spaziatura migliorata con space-y-4 */}
      <ul className="text-left list-disc list-inside space-y-4 text-gray-300">
        <li>
          <b>COMPETENZA SPECIALIZZATA:</b>
          <br/>
          I nostri artigiani hanno competenze specifiche in una o più aree di servizio.
        </li>
        <li>
          <b>FLESSIBILITÀ:</b>
          <br />
          Offriamo servizi su richiesta e ci adattiamo alle esigenze dei nostri clienti.
        </li>
        <li>
          <b>PREZZI COMPETITIVI:</b>
          <br />
          I nostri prezzi sono inferiori a quelli delle aziende tradizionali.
        </li>
        <li>
           <b>SERVIZIO PERSONALIZZATO:</b>
           <br/>
           Offriamo un servizio attento e personalizzato per ogni cliente.
        </li>
      </ul>
    </div>
    
    {/* COLONNA 3: Call to Action */}
    <div className="p-6 bg-blue-900/50 rounded-lg flex flex-col justify-center items-center text-center">
       <div className="text-2xl font-semibold mb-4 text-white">
        Hai bisogno di aiuto?
      </div>
      <p className="text-gray-300 mb-6">
        Non aspettare! Contattaci ora per un preventivo gratuito e senza impegno. Risolviamo il tuo problema in modo rapido e professionale.
      </p>
      <a 
        href="/contatti" 
        className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600 transition-colors font-semibold"
      >
        Richiedi un Preventivo
      </a>
    </div>

  </div>

  {/* --- Sezione Griglia Card Servizi --- */}
  <div className="mt-20">
    <div className="text-center mb-12">
        <div className="text-3xl text-blue-400 sm:text-2xl font-bold">
          I NOSTRI INTERVENTI PIU' RICHIESTI
        </div>
    </div>
    
    {/* ✅ OTTIMIZZATO: La griglia delle card è ora introdotta da un titolo e ben spaziata */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          // ✅ OTTIMIZZATO: Rimossi max-w-xs e mx-auto per permettere alla card di riempire lo spazio della griglia
          className="w-full p-6 bg-blue-200 rounded-2xl shadow-lg flex flex-col items-center text-gray-900" 
        >
          <Image src={service.image} alt={service.name} width={150} height={150} className="rounded-lg mb-4" />
          <h3 className="text-xl font-medium text-center">{service.name}</h3>
        </motion.div>
      ))}
    </div>
  </div>

</section>
{/* --- Fine Sezione Servizi Ottimizzata --- */}
    </main>
      <footer className="text-center mt-6 p-4 bg-black text-white">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}