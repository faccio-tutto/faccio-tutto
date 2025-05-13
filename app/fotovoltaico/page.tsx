"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Assicurati che Image sia importato
import ModuloContatti from "./ModuloContatti";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
  

const FotovoltaicoPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
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

      {/* Hero Section */}
<section className="relative bg-black text-white py-10 text-center">
  <motion.h1
    className="text-3xl font-bold text-yellow-400" // Modifica il colore del testo a oro
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
  >
    Impianto Fotovoltaico
    <br/> investi nel tuo futuro rispettando l'ambiente
  </motion.h1>
  <motion.p
    className="mt-6 text-lg text-justify p-6 rounded-lg text-3xl px-4 md:px-46 text-yellow-400" // Modifica il colore del testo a oro
    style={{ fontSize: "1.2rem" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
>
  Scegliere un impianto fotovoltaico significa abbracciare un futuro di energia pulita, indipendenza economica e responsabilità ambientale. Immagina di ridurre drasticamente le tue bollette elettriche, fino al 90%, producendo energia direttamente dal sole. Un investimento intelligente che si ripaga in pochi anni, grazie agli incentivi fiscali del 50% e per gli impianti fotovoltaici che entreranno in esercizio entro il 29 maggio 2025, è possibile presentare una richiesta di accesso al meccanismo di Scambio sul Posto (SSP) fino al 26 settembre 2025. Se abiti in un comune con meno di 5.000 abitanti, si potrà installare un impianto fotovoltaico con un contributo a fondo perduto fino al 40% delle spese ammissibili, grazie al PNRR. Per accedere a questo incentivo, è necessario far parte di una Comunità Energetica Rinnovabile (CER). 
</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-0">
        <a href="#modulo-contatti"> {/* Modifica il pulsante in un link */}
          <Button className="bg-blue-500 text-white text-l font-semibold hover:bg-blue-600">Contattaci subito</Button>
          </a>
        </motion.div>
        <div className="grid md:grid-cols-1 gap-6 items-center max-w-6xl mx-auto mt-8">
      
      <Image
        src="/images/Volantino fotovoltaico.png"
        alt="Offerta fotovoltaico"
        width={1144}
        height={600}
        className="rounded-xl shadow-xl max-w-full h-auto"
      priority
      />
      <Image
        src="/images/reddito energetico.png"
        alt="Reddito energetico"
        width={1144}
        height={600}
        className="rounded-xl shadow-xl max-w-full h-auto"
      priority
      />
       <Image
        src="/images/40 fondi PNRR.png"
        alt="40 fondi PNRR"
        width={1144}
        height={600}
        className="rounded-xl shadow-xl max-w-full h-auto"
      priority
      />
    </div>
    <div className="text-2xl font-bold flex justify-center gap-6 mt-20">Scopri tutti i vantaggi che ti offre un'impianto fotovoltaico</div>

        <div className="grid md:grid-cols-3 gap-6 mt-8 px-6 max-w-6xl mx-auto">
          {[{
            img: "/bolletta.jpeg", title: "Risparmio sulla bolletta", text: "Riduci i costi della bolletta fino al 90% grazie all'autoproduzione."
          }, {
            img: "/clean-energy.jpeg", title: "Energia Pulita", text: "Produci energia rinnovabile e riduci la dipendenza dai combustibili fossili."
          }, {
            img: "/eco-friendly.jpeg", title: "Salvaguardia dell'Ambiente", text: "Riduci le emissioni di CO₂ e contribuisci a un pianeta più verde."
          }].map((item, index) => (
            <Card key={index}>
              <img src={item.img} alt={item.title} className="w-full h-48 object-covershadow-lg bg-[#1E1E1E] text-[#D1D1D1]" />
              <CardContent>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#FFD700]">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>


{/* Servizi Section */}
<section className="py-10 px-8 max-w-6xl mx-auto">
  <h2 className="font-bold text-center text-gray-800" style={{ fontSize: "1.7rem" }}>
    Perchè scegliere noi?
  </h2>
  <p className="font-bold text-center text-gray-800" style={{ fontSize: "1.2rem" }}>
    Scopri quanto puoi risparmiare con un impianto fotovoltaico, ti offriamo un servizio completo e senza pensieri:
  </p>
  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
    {[
      {
        title: "Sopralluogo e progettazione personalizzata",
        description:
          "Analizziamo le tue esigenze e progettiamo l'impianto perfetto per la tua abitazione o azienda, creando una soluzione su misura che rispecchia le tue specifiche necessità e preferenze.",
      },
      {
        title: "Installazione professionale",
        description:
          "Il nostro team di esperti si occupa dell'installazione, garantendo la massima efficienza e sicurezza grazie al sistema di monitoraggio remoto, per ottimizzare la produzione di energia e massimizzare il tuo risparmio.",
      },
      {
        title: "Gestione pratiche amministrative",
        description:
          "Ci occupiamo di tutte le pratiche amministrative (E-distribuzione, Terna, ENEA e GSE), risparmiandoti tempo e stress.",
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
      <span className="text-xl font-semibold text-yellow-400">{service.title}</span>
      <p className="text-gray-600 mt-2">{service.description}</p>
    </div>
  </CardContent>
</Card>
      </div>
    ))}
  </div>
</section>

{/* Offerte Section */}
<section className="py-10 bg-black text-center">
  <h2 className="font-bold text-center text-gray-200" style={{ fontSize: "1.7rem" }}>
    Le nostre configurazioni
  </h2>
  <p className="font-bold text-center text-gray-200" style={{ fontSize: "1.2rem" }}>"CHIAVI IN MANO"</p>
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
      <p className="text-gray-600 mt-0">{offer.description}</p>
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

      {/* Contatti Section */}
      <section className="bg-black text-white py-6 text-center">
        <h2 className="font-bold text-center text-gray-800" style={{ fontSize: "1.7rem" }}>Non aspettare, contattaci!</h2>
        <p className="font-bold text-center text-gray-800 p-2" style={{ fontSize: "1.2rem" }}>Fai una scelta consapevole per il tuo portafoglio e per il pianeta. 
          <br/>Richiedi un preventivo gratuito e scopri come l'energia solare può trasformare la tua vita.</p>
          <div id="modulo-contatti">
  <ModuloContatti destinatarioEmail="fotovoltaico@faccio-tutto.it" />
</div>
      </section>
      {/* Footer */}
      <footer className="text-center mt-8 p-6 bg-gray-900 text-gray-300">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default FotovoltaicoPage;