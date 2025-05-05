"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { FaBuilding, FaDraftingCompass } from "react-icons/fa";
import AnimatedBuilding from "./AnimatedBuilding";
import { TfiEmail } from "react-icons/tfi";

const App: React.FC = () => {
  const [hoveredImages, setHoveredImages] = useState<{ [key: number]: string | null }>({});

  const projects = [
    { 
      images: [
        "/images/obbiettivamente.jpg",
        "/images/obbiettivamente2.jpg",
        "/images/obbiettivamente3.jpg"
      ],
      title: "Rendering",
      description: "Progettazione e arredo di uno studio fotografico",
    },
    {
      images: [
        "/images/drago1.jpg",
        "/images/drago2.jpg",
        "/images/drago3.jpg"
      ],
      title: "Ristrutturazione e arredo",
      description: "Progetto di ristrutturazione e arredamento di un appartamento",
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
      title: "Ristrutturazione e arredo",
      description: "Progetto di ristrutturazione di un appartamento",
    },
    {
      images: [
        "/images/cri1.jpg",
        "/images/cri2.jpg",
        "/images/cri3.jpg"
      ],
      title: "Progettazione e arredo",
      description: "Progettazione di una villa moderna",
    },
    {
      images: [
        "/images/ale1.jpg",
        "/images/ale2.jpg",
        "/images/ale3.jpg"
      ],
      title: "Ristrutturazione e arredo",
      description: "Ristrutturazione di un attico a Palermo",
    },
  ];

  return (
     <div className="min-h-screen bg-black text-white">
          {/* Navbar */}
                <nav className="bg-black text-white py-1 px-6 flex justify-between items-center shadow-lg">
                  <div className="flex items-center gap-1">
                    <a href="/">
                      <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={200} height={200} className="rounded" />
                    </a>
                    <h1 className="text-2xl font-bold">faccio-tutto.it</h1>
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
  <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#6B46C1" }}>Progettazione Architettonica e Direzione Lavori</h1>
  <p style={{ fontSize: "1.6rem", color: "grey" }}>Innovazione e qualità per il tuo edificio ed il tuo spazio</p>
</header>

      <main className="flex p-8 gap-8">
        {/* Contenuto principale */}
        <section className="w-3/4">
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "white", textAlign: "justify" }}>Progettazione Architettonica</h2>
          <FaDraftingCompass size={30} className="text-purple-500 mb-2" />
          <p style={{ fontSize: "1.2rem", color: "white", textAlign: "justify" }}>La progettazione architettonica si configura come il processo creativo e tecnico fondamentale che dà forma all'ambiente costruito. Essa trascende la mera realizzazione di edifici, configurandosi come un'arte applicata che armonizza funzionalità, estetica e sostenibilità. Nel cuore di ogni progetto, l'architetto agisce come un interprete delle esigenze del committente, traducendo desideri e necessità in spazi vivibili e coerenti con il contesto.

Attraverso un approccio olistico, la progettazione architettonica integra molteplici discipline, dall'urbanistica all'ingegneria, dalla scienza dei materiali al design degli interni. L'obiettivo primario è la creazione di ambienti che migliorino la qualità della vita, promuovendo il benessere degli individui e la tutela del patrimonio culturale e ambientale.

Il processo progettuale si articola in diverse fasi, dall'analisi del sito e dello studio di fattibilità alla redazione del progetto esecutivo e alla direzione dei lavori. In ogni fase, l'architetto si avvale di strumenti avanzati, come il Building Information Modeling (BIM), per ottimizzare la progettazione e la gestione del ciclo di vita dell'edificio.

In un'epoca di crescente consapevolezza ambientale, la progettazione architettonica si pone come un'alleata nella lotta al cambiamento climatico. Attraverso l'adozione di principi di bioarchitettura e l'utilizzo di materiali sostenibili, si realizzano edifici a basso impatto ambientale, capaci di integrarsi armoniosamente con l'ecosistema circostante.

In definitiva, la progettazione architettonica è un atto di responsabilità sociale, un impegno a costruire un futuro migliore attraverso la creazione di spazi che ispirino, proteggano e durino nel tempo.
          </p>

          <div className="flex gap-20 mt-8">
            {["/images/building-phase-0.png", "/images/building-phase-1.png", "/images/building-phase-2.png"].map((src, index) => (
              <Image key={index} src={src} alt={`Phase ${index}`} width={300} height={300} className="rounded-lg shadow-lg" />
            ))}
          </div>
          <div className="mt-12">
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "white", textAlign: "justify" }}>Direzione dei lavori</h2>
          <FaBuilding size={30} className="text-purple-500 mb-2" />
          <p style={{ fontSize: "1.2rem", color: "white", textAlign: "justify" }}>
          La direzione dei lavori rappresenta una fase cruciale nella realizzazione di un progetto architettonico, un'attività che va ben oltre la semplice supervisione del cantiere. Il direttore dei lavori è un professionista che assume la responsabilità di garantire che l'opera sia eseguita in conformità al progetto approvato, nel rispetto delle normative vigenti e delle migliori pratiche costruttive.

Il suo ruolo si estende al controllo della qualità dei materiali e delle lavorazioni, alla verifica del rispetto dei tempi di esecuzione e alla gestione dei costi, prevenendo o mitigando eventuali imprevisti che potrebbero incidere sul budget. Inoltre, il direttore dei lavori funge da interfaccia tra il committente, le imprese esecutrici e gli altri professionisti coinvolti nel progetto, assicurando una comunicazione efficace e una collaborazione sinergica.

Egli è responsabile della redazione dei documenti contabili, della certificazione degli stati di avanzamento dei lavori e della gestione delle eventuali varianti al progetto, garantendo la trasparenza e la tracciabilità di tutte le attività svolte in cantiere. La sua competenza e la sua esperienza sono fondamentali per assicurare che l'opera sia realizzata a regola d'arte, nel rispetto delle aspettative del committente e dei più elevati standard di qualità e sicurezza.
          </p>
          <div className="flex gap-20 mt-8">
            {["/images/direzione3.jpeg", "/images/direzione2.jpeg", "/images/direzione1.jpeg"].map((src, index) => (
              <Image key={index} src={src} alt={`Phase ${index}`} width={300} height={300} className="rounded-lg shadow-lg" />
            ))}
          </div>
        </section>

 {/* Barra laterale con progetti recenti */}
 <aside className="w-1/4 flex flex-col gap-12 relative">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-purple-300 p-4 shadow-md rounded-lg relative group"
          onMouseEnter={() => setHoveredImages(prev => ({ ...prev, [index]: project.images[0] }))}
          onMouseLeave={() => setHoveredImages(prev => ({ ...prev, [index]: null }))}
        >
          <h3 className="text-lg text-gray-700 mt-2 font-semibold">{project.title}</h3>
          <div className="flex gap-2 mt-4">
            {project.images.map((img, imgIndex) => (
              <Image
                key={imgIndex}
                src={img}
                alt={`${project.title} ${imgIndex + 1}`}
                width={100}
                height={75}
                className="rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredImages(prev => ({ ...prev, [index]: img }))}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">{project.description}</p>
        </div>
      ))}
      {Object.values(hoveredImages).some(image => image) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-2xl rounded-lg"
        >
          <Image src={Object.values(hoveredImages).find(image => image) || ""} alt="Preview" width={600} height={450} className="rounded-lg" />
        </motion.div>
      )}
    </aside>
      </main>

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
