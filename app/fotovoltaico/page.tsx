"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBuilding, FaDraftingCompass, FaDoorOpen, FaPlug, FaWrench, FaPhone, FaSolarPanel } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import ModuloContatti from './ModuloContatti'; // Assicurati che il percorso sia corretto
import { CheckCircle } from "lucide-react";
// import { cn } from '@/lib/utils'; // Assicurati di avere questa funzione se la usi altrove
import { Card, CardContent } from "@/components/ui/card"; // Assicurati di avere questi componenti per le card
import { Button } from "@/components/ui/button"; // Assicurati di avere questo componente per i pulsanti


const FotovoltaicoPage = () => {
  return (
    <div className="bg-black min-h-screen text-gray-500">
       {/* Navbar */}
      <nav className="bg-black text-white py-1 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-1">
          <a href="/">
            <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={200} height={200} className="rounded" />
          </a>
          <h1 className="text-xl font-normal flex items-center gap-2">
            faccio-tutto.it
            <a href="https://www.instagram.com/infofacciotutto/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Link">
              <FaInstagramSquare />
            </a>
            <a href="https://www.linkedin.com/company/faccio-tutto/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Link">
              <FaLinkedin />
            </a>
          </h1>
        </div>
        <ul className="flex gap-6">
          {[
            { name: "Home", href: "/" },
            { name: "Mission", href: "/mission" },
            { name: "Vision", href: "/vision" },
            { name: "Chi siamo", href: "/chisiamo" },
            { name: "Affiliazione", href: "/affiliazione" },
            { name: "Contatti", href: "/contatti" },
          ].map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:underline">{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex flex-col md:flex-row p-4 md:p-8 gap-8">

  {/* Pulsanti laterali a sinistra */}
  <aside className="hidden md:block sticky top-4 h-fit w-full md:w-1/8 space-y-4">
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
      {[{
        id: "progettazione",
        icon: <FaDraftingCompass className="text-3xl text-purple-500" />,
        title: "Progettazione architettonica",
        link: "/progettazione"
      }, {
        id: "fotovoltaico",
        icon: <FaSolarPanel className="text-3xl text-yellow-500" />,
        title: "Impianti fotovoltaici",
        link: "/fotovoltaico"
      }, {
        id: "infissi",
        icon: <FaDoorOpen className="text-3xl text-orange-900" />,
        title: "Vendita e installazione infissi",
        link: "/infissi"
      }, {
        id: "riparazione-elettrodomestici",
        icon: <FaPlug className="text-3xl text-orange-500" />,
        title: "Riparazione elettrodomestici",
        link: "/riparazione-elettrodomestici"
      }, {
        id: "riparazioni-veloci",
        icon: <FaWrench className="text-3xl text-blue-500" />,
        title: "Riparazioni veloci",
        link: "/riparazioni-veloci"
      }, {
        id: "contatti",
        icon: <FaPhone className="text-3xl text-green-500" />,
        title: "Prenota subito",
        link: "/prenota"
      }].map(service => (
        <Link
          href={service.link}
          key={service.id}
          className="block mb-4 p-4 bg-white rounded-lg shadow hover:scale-105 transition-transform flex flex-col items-center text-center"
        >
          <div className="rounded-full p-3 mb-2 bg-white shadow-md">
            {service.icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-800">{service.title}</h3>
        </Link>
      ))}
    </div>
  </aside>


        {/* Colonna principale: Contenuto della pagina, compreso il modulo */}
        <div className="flex-1"> {/* Questo div occuperà lo spazio rimanente */}
          {/* Hero Section */}
          <section className="relative text-white py-8 text-center md:py-20">
            <motion.h1
              className="text-3xl font-bold text-yellow-400 mt-8 sm:mt-12 md:mt-20"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Impianto Fotovoltaico
              <br/> investi nel tuo futuro rispettando l'ambiente
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-justify p-4 rounded-lg text-3xl px-4 md:px-20 text-yellow-400"
              style={{ fontSize: "1.2rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Scegliere un impianto fotovoltaico significa abbracciare un futuro di energia pulita, indipendenza economica e responsabilità ambientale. Immagina di ridurre drasticamente le tue bollette elettriche, fino al 90%, producendo energia direttamente dal sole. Un investimento intelligente che si ripaga in pochi anni, grazie agli incentivi fiscali del 50% e per gli impianti fotovoltaici che entreranno in esercizio entro il 29 maggio 2025, è possibile presentare una richiesta di accesso al meccanismo di Scambio sul Posto (SSP) fino al 26 settembre 2025. Se abiti in un comune con meno di 5.000 abitanti, si potrà installare un impianto fotovoltaico con un contributo a fondo perduto fino al 40% delle spese ammissibili, grazie al PNRR. Per accedere a questo incentivo, è necessario far parte di una Comunità Energetica Rinnovabile (CER).
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
              <a href="#modulo-contatti">
                <Button className="bg-blue-500 text-white text-l font-semibold hover:bg-blue-600">Contattaci subito</Button>
              </a>
            </motion.div>
            <div className="grid md:grid-cols-1 gap-6 items-center max-w-6xl mx-auto mt-6"></div>
            <div className="text-2xl text-yellow-400 font-bold flex justify-center gap-6 mt-14">Scopri tutti i vantaggi che ti offre un'impianto fotovoltaico</div>

            <div className="grid md:grid-cols-3 gap-6 mt-8 px-8 max-w-6xl mx-auto text-gray-500">
              {[{
                img: "/bolletta.jpeg", title: "Risparmio sulla bolletta", text: "Riduci i costi della bolletta fino al 90% grazie all'autoproduzione."
              }, {
                img: "/clean-energy.jpeg", title: "Energia Pulita", text: "Produci energia rinnovabile e riduci la dipendenza dai combustibili fossili."
              }, {
                img: "/eco-friendly.jpeg", title: "Salvaguardia dell'Ambiente", text: "Riduci le emissioni di CO₂ e contribuisci a un pianeta più verde."
              }].map((item, index) => (
                <Card key={index}>
                  <img src={item.img} alt={item.title} className="w-full h-48 object-cover shadow-lg bg-[#1E1E1E] text-[#D1D1D1]" />
                  <CardContent>
                    <div className="p-6">
                      <div className="text-xl font-semibold text-[#FFD700]">{item.title}</div>
                      <div className="texy-gray-500 mt-2">{item.text}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Servizi Section */}
          <section className="py-10 px-8 max-w-6xl mx-auto">
            <div className="font-bold text-center text-yellow-400" style={{ fontSize: "1.7rem" }}>
              Perchè scegliere noi?
            </div>
            <div className="font-bold text-center text-gray-500" style={{ fontSize: "1.2rem" }}>
              Scopri quanto puoi risparmiare con un impianto fotovoltaico, ti offriamo un servizio completo e senza pensieri:
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: "Sopralluogo e progettazione personalizzata",
                  description: "Analizziamo le tue esigenze e progettiamo l'impianto perfetto per la tua abitazione o azienda, creando una soluzione su misura che rispecchia le tue specifiche necessità e preferenze.",
                },
                {
                  title: "Installazione professionale",
                  description: "Il nostro team di esperti si occupa dell'installazione, garantendo la massima efficienza e sicurezza grazie al sistema di monitoraggio remoto, per ottimizzare la produzione di energia e massimizzare il tuo risparmio.",
                },
                {
                  title: "Gestione pratiche amministrative",
                  description: "Ci occupiamo di tutte le pratiche amministrative (E-distribuzione, Terna, ENEA e GSE), risparmiandoti tempo e stress.",
                },
                {
                  title: "Smaltimento moduli a fine vita",
                  description: "Pensiamo anche al futuro, garantendo lo smaltimento ecologico dei moduli, nel pieno rispetto delle normative e dell'ambiente.",
                },
              ].map((service, index) => (
                <div key={index} className="shadow-lg bg-white rounded-lg">
                  <Card>
                    <CardContent>
                      <div className="p-6">
                        <CheckCircle className="text-green-500 mr-4 inline-block" />
                        <span className="text-xl font-semibold text-yellow-500">{service.title}</span>
                        <div className="text-gray-500 mt-2">{service.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* Offerte Section */}
          <section className="py-10 bg-black text-center">
            <div className="font-bold text-center text-yellow-500" style={{ fontSize: "1.7rem" }}>
              Le nostre configurazioni
            </div>
            <div className="font-bold text-center text-gray-500" style={{ fontSize: "1.2rem" }}>"CHIAVI IN MANO"</div>
            <div className="grid md:grid-cols-2 gap-6 mt-8 px-6 max-w-6xl mx-auto">
              {[
                {
                  imgSrc: "/pannelli+inverter.jpeg",
                  title: "Impianto standard",
                  description: "Pannelli fotovoltaici + inverter ibrido senza batteria di accumulo",
                  filePath: "/moduli+inverter.pdf",
                },
                {
                  imgSrc: "/pannelli+inverter+batteria.jpeg",
                  title: "Impianto plus",
                  description: "Pannelli fotovoltaici + inverter ibrido + batteria di accumulo",
                  filePath: "/moduli+inverter+batteria.pdf",
                },
              ].map((offer, index) => (
                <div key={index} className="shadow-lg bg-white rounded-lg overflow-hidden">
                  <Card>
                    <img src={offer.imgSrc} alt={offer.title} className="w-full h-48 object-cover" />
                    <CardContent>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">{offer.title}</h3>
                        <div className="text-gray-500 mt-0">{offer.description}</div>
                        <div className="mt-6">
                          <a href={offer.filePath} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-yellow-400 text-white font-semibold hover:bg-yellow-500">
                              Guarda la scheda tecnica
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* Contatti Section - CON IL MODULO DI CONTATTO */}
          <section className="bg-black text-white py-6 mt-10 text-center">
            <div className="font-bold text-center text-yellow-500" style={{ fontSize: "1.7rem" }}>Non aspettare, contattaci!</div>
            <div className="font-bold text-center text-gray-500 p-2" style={{ fontSize: "1.2rem" }}>Fai una scelta consapevole per il tuo portafoglio e per il pianeta.
              <br/>Richiedi un preventivo gratuito e scopri come l'energia solare può trasformare la tua vita.</div>
            {/* Il modulo di contatto ora è contenuto qui. Le sue classi interne lo centreranno. */}
            <div className="mt-4 w-full max-w-4xl mx-auto" id="modulo-contatti">
                <ModuloContatti destinatarioEmail="fotovoltaico@faccio-tutto.it" />
            </div>
          </section>
        </div> {/* Chiusura del div che contiene il contenuto principale */}
      </main> {/* Chiusura del main principale */}

      {/* Footer */}
      <footer className="text-center mt-8 p-6 bg-gray-900 text-gray-300">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default FotovoltaicoPage;