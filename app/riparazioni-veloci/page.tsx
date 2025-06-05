"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "./riparazioni-veloci.css"; // ✅ Importa il CSS
import Link from "next/link"; // Importa Link
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

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

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-4 px-4 bg-black text-blue-500">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold"
        >
          Riparazioni veloci
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-400 mt-4 text-lg"
        >
          Interventi rapidi per ogni riparazione domestica!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="text-gray-400 mt-8"
        >
          <Link href="/contatti"> {/* Usa Link per collegare alla pagina /contatti */}
          <Button className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600">
            Contattaci Ora
          </Button>
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 container mx-auto">
        <h2 className="text-2xl font-semibold mb-0 mt-45">
          SERVIZI SPECIALIZZATI PER LA CASA E LA TECNOLOGIA
        </h2>
        <div className="text-xl text-justify text-gray-300 mb-0">
          Vogliamo creare una rete di professionisti indipendenti che offrono servizi di riparazione, configurazione e installazione per la casa e la tecnologia.
          <br />I nostri artigiani sono persone comuni che hanno sviluppato competenze specializzate attraverso l'interesse personale e l'esperienza pratica.
        </div>
        <h2 className="text-2xl font-semibold mb-0 mt-45">
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
        <h3 className="text-2xl font-semibold mb-4 -mt-22">ECCO ALCUNI DEI NOSTRI SERVIZI</h3>
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

        <div className="grid md:grid-cols-3 gap-4 -mt-160">
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