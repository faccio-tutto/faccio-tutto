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
  minHeight: '300px' /* Altezza minima per visualizzare l'immagine */
}}>
  {/* Overlay per migliorare la leggibilità del testo */}
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <motion.h2
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 text-8xl font-bold"
    style={{ fontSize: "1.7rem", color: "#2196F3" }} // Blue scuro
  >
    Riparazioni veloci
  </motion.h2>
  <motion.p
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative z-10 text-lg text-justify mt-4 max-w-5xl mx-auto"
    style={{ fontSize: "1.2rem", color: "#E5E7EB" }} // Grigio chiaro
  >
    Interventi rapidi per ogni riparazione domestica. Vogliamo creare una rete di professionisti indipendenti che offrono servizi di riparazione, configurazione e installazione per la casa e la tecnologia.
    I nostri artigiani sono persone comuni che hanno sviluppato competenze specializzate attraverso l'interesse personale e l'esperienza pratica.
  </motion.p>
</header>
    
{/* Main Content container with 2 columns */}
     <main className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 mt-10">
        {/* Colonna sinistra: pulsanti laterali (Sidebar) */}
        <aside className="hidden md:block sticky top-4 h-fit w-full md:w-1/4 lg:w-2/8 xl:w-1/6 z-10 bg-gray-200 p-4 rounded-lg shadow-lg">
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

      {/* Services Section */}
      <section className="py-20 px-4 container mx-auto">
        <h2 className="text-2xl font-semibold mb-0 mt-0">
          SERVIZI SPECIALIZZATI PER LA CASA E LA TECNOLOGIA
        </h2>
        <div className="text-xl text-justify text-gray-300 mb-0">
        </div>
        <h2 className="text-2xl font-semibold mb-0 mt-0">
          COSA OFFRIAMO
        </h2>
        <ul className="text-left text-white list-disc list-inside mb-6 mt-2">
          <li>RIPARAZIONI DOMESTICHE:
            <br/>Riparazioni idrauliche, elettriche, di elettrodomestici, mobili e altro ancora.</li>
            <br/><li>CONFIGURAZIONE DI DISPOSITIVI:
            <br/>Configurazione di smart home, assistenti vocali, reti domestiche, dispositivi mobili e altro ancora.</li>
            <br/><li>INSTALLAZIONI:
            <br />Installazione di lampadari, tende, scaffali, supporti TV, prese elettriche, interruttori smart e altro ancora.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 -mt-26">ECCO ALCUNI DEI NOSTRI SERVIZI</h2>
        <ul className="text-left text-white list-disc list-inside mb-4">
          <li>COMPETENZA SPECIALIZZATA:
            <br/>I nostri artigiani hanno competenze specifiche in una o più aree di servizio.</li>
            <br/><li>FLESSIBILITA':
            <br /> Offriamo servizi su richiesta e ci adattiamo alle esigenze dei nostri clienti.</li>
            <br/><li>PREZZI COMPETITIVI:
            <br />I nostri prezzi sono inferiori a quelli delle aziende tradizionali.</li>
            <br/><li>SERVIZIO PERSONALIZZATO:
            <br />Offriamo un servizio attento e personalizzato per ogni cliente.</li>
            <br/><li>COMUNITA':
            <br />Supportiamo gli artigiani locali e promuoviamo l'economia di prossimità.</li>
        </ul>
        <p className="mt-4">
        </p>

        <div className="grid md:grid-cols-3 gap-4 -mt-174">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="p-6 bg-blue-200 rounded-2xl shadow-lg flex flex-col items-center"
            >
              <Image src={service.image} alt={service.name} width={150} height={150} className="rounded-lg mb-4" />
              <h3 className="text-xl font-medium">{service.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </main>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-black text-xl text-white text-center">
        <h2 className="text-3xl font-semibold">Hai bisogno di aiuto?</h2>
        <div className="text-gray-400 mt-2">Contattaci per una riparazione veloce e professionale!</div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-6"
        >
          <Link href="/contatti"> {/* Usa Link per collegare alla pagina /contatti */}
          <Button className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600">
            Clicca quì
          </Button>
          </Link>
        </motion.div>
      </section>
      <footer className="text-center mt-6 p-4 bg-black text-white">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}