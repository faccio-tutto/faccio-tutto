"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBuilding, FaDraftingCompass, FaDoorOpen, FaPlug, FaWrench, FaPhone, FaSolarPanel } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const App: React.FC = () => {
  type HoveredImages = { [key: number]: string | null };
  const [hoveredImages, setHoveredImages] = useState<HoveredImages>({});

  const projects = [
    {
      images: [
        "/images/obbiettivamente.jpg",
        "/images/obbiettivamente2.jpg",
        "/images/obbiettivamente3.jpg"
      ],
      title: "Ristrutturazione e interior design",
      description: "Progetto di ristrutturazione di uno studio fotografico",
    },
    {
      images: [
        "/images/drago1.jpg",
        "/images/drago4.jpg",
        "/images/drago5.jpg"
      ],
      title: "Ristrutturazione e interior design",
      description: "Progetto di ristrutturazione e arredo di un appartamento",
    },
    {
      images: [
        "/images/piazza1.jpg",
        "/images/piazza2.jpg",
        "/images/piazza3.jpg"
      ],
      title: "Progettazione",
      description: "Progettazione di un moderno complesso residenziale",
    },
    {
      images: [
        "/images/frenk1.jpg",
        "/images/frenk2.jpg",
        "/images/frenk3.jpg"
      ],
      title: "Ristrutturazione e interior design",
      description: "Progetto di ristrutturazione e arredo di un appartamento",
    },
    {
      images: [
        "/images/cri1.jpg",
        "/images/cri2.jpg",
        "/images/cri3.jpg"
      ],
      title: "Progettazione",
      description: "Progettazione di una villa moderna",
    },
    {
      images: [
        "/images/ale1.jpg",
        "/images/ale2.jpg",
        "/images/ale3.jpg"
      ],
      title: "Ristrutturazione e interior design",
      description: "Progetto di ristrutturazione di un attico a Palermo",
    },
  ];

  const isImageHovered = Object.values(hoveredImages).some(image => image);


  return (
    <div className="min-h-screen bg-black text-white">
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

      <header style={{ backgroundColor: "black", padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.0rem", fontWeight: "bold", color: "#6B46C1" }}>Progettazione Architettonica e Direzione Lavori</h1>
        <p style={{ fontSize: "1.5rem", color: "grey" }}>Innovazione e qualità per il tuo edificio ed il tuo spazio</p>
      </header>

      <main className="flex flex-col md:flex-row p-4 md:p-8 gap-8">

  {/* Pulsanti laterali a sinistra */}
  <aside className="w-full md:w-1/6 space-y-4">
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

  {/* Contenuto principale che già hai */}
  <section className="w-full md:w-3/4">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white", textAlign: "justify" }}>Progettazione Architettonica</h2>
          <FaDraftingCompass size={30} className="text-purple-500 mb-2" />
          <p style={{ fontSize: "1.2rem", color: "white", textAlign: "justify" }}>
            La progettazione architettonica si configura come il processo creativo e tecnico fondamentale che dà forma all'ambiente costruito. Essa trascende la mera realizzazione di edifici, configurandosi come un'arte applicata che armonizza funzionalità, estetica e sostenibilità. Nel cuore di ogni progetto, l'architetto agisce come un interprete delle esigenze del committente, traducendo desideri e necessità in spazi vivibili e coerenti con il contesto.
            <br/><br/>
            Attraverso un approccio olistico, la progettazione architettonica integra molteplici discipline, dall'urbanistica all'ingegneria, dalla scienza dei materiali al design degli interni. L'obiettivo primario è la creazione di ambienti che migliorino la qualità della vita, promuovendo il benessere degli individui e la tutela del patrimonio culturale e ambientale.
            <br/><br/>
            Il processo progettuale si articola in diverse fasi, dall'analisi del sito e dello studio di fattibilità alla redazione del progetto esecutivo e alla direzione dei lavori. In ogni fase, l'architetto si avvale di strumenti avanzati, come il Building Information Modeling (BIM), per ottimizzare la progettazione e la gestione del ciclo di vita dell'edificio.
            <br/><br/>
            In un'epoca di crescente consapevolezza ambientale, la progettazione architettonica si pone come un'alleata nella lotta al cambiamento climatico. Attraverso l'adozione di principi di bioarchitettura e l'utilizzo di materiali sostenibili, si realizzano edifici a basso impatto ambientale, capaci di integrarsi armoniosamente con l'ecosistema circostante.
            <br/><br/>
            In definitiva, la progettazione architettonica è un atto di responsabilità sociale, un impegno a costruire un futuro migliore attraverso la creazione di spazi che ispirino, proteggano e durino nel tempo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {["/images/building-phase-0.png", "/images/building-phase-1.png", "/images/building-phase-2.png"].map((src, index) => (
              <Image key={index} src={src} alt={`Phase ${index}`} width={280} height={280} className="rounded-lg shadow-lg" />
            ))}
          </div>
          <div className="mt-12">
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white", textAlign: "justify" }}>Direzione dei lavori</h2>
          <FaBuilding size={30} className="text-purple-500 mb-2" />
          <p style={{ fontSize: "1.2rem", color: "white", textAlign: "justify" }}>
            La direzione dei lavori rappresenta una fase cruciale nella realizzazione di un progetto architettonico, un'attività che va ben oltre la semplice supervisione del cantiere. Il direttore dei lavori è un professionista che assume la responsabilità di garantire che l'opera sia eseguita in conformità al progetto approvato, nel rispetto delle normative vigenti e delle migliori pratiche costruttive.
            <br/><br/>
            Il suo ruolo si estende al controllo della qualità dei materiali e delle lavorazioni, alla verifica del rispetto dei tempi di esecuzione e alla gestione dei costi, prevenendo o mitigando eventuali imprevisti che potrebbero incidere sul budget. Inoltre, il direttore dei lavori funge da interfaccia tra il committente, le imprese esecutrici e gli altri professionisti coinvolti nel progetto, assicurando una comunicazione efficace e una collaborazione sinergica.
            <br/><br/>
            Egli è responsabile della redazione dei documenti contabili, della certificazione degli stati di avanzamento dei lavori e della gestione delle eventuali varianti al progetto, garantendo la trasparenza e la tracciabilità di tutte le attività svolte in cantiere. La sua competenza e la sua esperienza sono fondamentali per assicurare che l'opera sia realizzata a regola d'arte, nel rispetto delle aspettative del committente e dei più elevati standard di qualità e sicurezza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {["/images/direzione3.jpeg", "/images/direzione2.jpeg", "/images/direzione1.jpeg"].map((src, index) => (
              <Image key={index} src={src} alt={`Phase ${index}`} width={280} height={280} className="rounded-lg shadow-lg" />
            ))}
          </div>
        </section>

        {/* Barra laterale con progetti recenti */}
        <aside className="w-full md:w-1/4 flex flex-col gap-4 mt-8 md:mt-0">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Progetti Recenti</h3>
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-purple-300 p-4 shadow-md rounded-lg relative group"
              onMouseEnter={() => setHoveredImages(prev => ({ ...prev, [index]: project.images[0] }))}
              onMouseLeave={() => setHoveredImages(prev => ({ ...prev, [index]: null }))}
            >
              <h3 className="text-lg text-gray-700 mt-2 font-semibold">{project.title}</h3>
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {project.images.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={img}
                    alt={`${project.title} ${imgIndex + 1}`}
                    width={100}
                    height={75}
                    className="rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform flex-shrink-0"
                    onMouseEnter={() => setHoveredImages(prev => ({ ...prev, [index]: img }))}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">{project.description}</p>
            </div>
          ))}
          {isImageHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-2xl rounded-lg z-50"
            >
              <Image src={Object.values(hoveredImages).find(image => image) || ""} alt="Preview" width={600} height={450} className="rounded-lg" />
            </motion.div>
          )}
        </aside>
      </main>

      {/* Immagini affiancate */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8 px-4">
        <Image
          src="/images/post 10 maggio.png"
          alt="Progettazione e direzione lavori"
          width={550}
          height={300}
          className="rounded-xl shadow-xl max-w-full h-auto"
          priority
        />
        <Image
          src="/images/post 8 maggio architettura.png"
          alt="Progettazione e direzione lavori"
          width={550}
          height={300}
          className="rounded-xl shadow-xl max-w-full h-auto"
          priority
        />
      </div>

      <div className="text-center my-12">
        <motion.a
          href="/contatti"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-transform transform hover:scale-105"
        >
          <TfiEmail className="text-2xl" />
          Contattaci
        </motion.a>
      </div>

      <footer className="bg-black text-white text-center py-3 mt-6">
        <p>&copy; 2025 faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default App;
