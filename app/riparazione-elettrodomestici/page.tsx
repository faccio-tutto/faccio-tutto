"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import { FaInstagramSquare, FaLinkedin, FaRecycle, FaTools } from "react-icons/fa";
import Link from "next/link";
import { FaBuilding, FaDraftingCompass, FaDoorOpen, FaPlug, FaWrench, FaPhone, FaSolarPanel } from "react-icons/fa";
 import Head from "next/head";

 function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
const CustomCardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
    // Ho rimosso il padding diretto qui per gestirlo sulla CustomCard se necessario,
    // o per lasciarlo ereditare dal contenitore.
    <div className={`card-content ${className}`} {...props}>
        {children}
    </div>
);

// Definizione di CustomCard (copiato dalla HomePage, per consistenza)
type CardProps = React.HTMLAttributes<HTMLDivElement>;
const CustomCard: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        // Ho aggiunto bg-white e border border-gray-300 qui
        <div className={`rounded-lg shadow-md ${className}`} {...props}>
            {children}
        </div>
    );
};

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

<Head>
       <title>Riparazione Elettrodomestici | faccio-tutto.it</title>
       <meta name="description" content="Ripariamo i tuoi piccoli elettrodomestici: risparmia e aiuta l’ambiente." />
     </Head>
     
{/* Header */}
<header className="text-center py-20 bg-cover bg-center text-white relative" style={{
  // Immagine di sfondo dell'uomo che ripara elettrodomestici con passione
  backgroundImage: 'url("/images/header riparazione piccoli elettrodomestici.jpeg")',
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
    className="relative mt-70 z-10 text-8xl font-bold"
    style={{ fontSize: "1.7rem", color: "#FFA500" }} // Giallo
  >
    Ripariamo i tuoi piccoli elettrodomestici
  </motion.h2>
  <motion.p
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative z-10 text-lg mt-10 max-w-2xl mx-auto"
    style={{ fontSize: "1.2rem", color: "#E5E7EB" }} // Grigio chiaro
  >
    Risparmia denaro e aiuta l'ambiente con il nostro servizio di riparazione professionale e affidabile.
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
                    <CustomCard className="bg-white border border-gray-200 p-0"> {/* Aggiunto bg-white, border e p-0 qui */}
                        <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                            <div className="rounded-full p-3 shadow-md bg-white">
                                {service.icon}
                            </div>
                            <h3 className={`text-sm font-semibold mt-2 text-gray-800`}>{service.title}</h3>
                        </CustomCardContent>
                    </CustomCard>
                </Link>
            ))}
          </div>
        </aside>

        {/* Central Content Area - Adjusted Width */}
        {/* La larghezza di questa colonna sarà complementare alla sidebar sinistra */}
        <div className="text-center w-full md:w-4/5 lg:w-6/8 xl:w-4/6 flex flex-col gap-24 pb-48"> {/* Larghezza calcolata in base alla sidebar sx */}
          <section id="about" className="bg-black">
            <motion.h2 style={{ color: "#FFA500" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-center font-semibold mb-6 text-blue-400"
            >
              PERCHE' SCEGLIERE LA RIPARAZIONE?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-200 text-justify mb-8 max-w-full mx-auto"
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

        <section id="repair" className="mb-10 bg-black">
          <motion.h2 style={{ color: "#FFA500" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold mb-8 text-blue-400"
          >
            RIPARAZIONE DI PICCOLI ELETTRODOMESTICI
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
              <div className="text-lg text-gray-500">{appliance.description}</div>
            </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="text-center bg-black flex-col justify-center items-center py-0">
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
            className="text-lg text-gray-300 text-justify mb-8 max-w-full mx-auto mb-14"
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
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-black text-gray-300">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </motion.div>
  );
};

export default RepairPage;