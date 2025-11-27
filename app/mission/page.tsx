"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWrench, FaPhone, FaEnvelope, FaDraftingCompass, FaSolarPanel, FaPlug, FaDoorOpen, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card"; // Assumo tu abbia questi componenti
import { motion } from 'framer-motion'; // Assicurati di aver installato framer-motion

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CustomCardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
    <div className={`card-content ${className}`} {...props}>
        {children}
    </div>
);

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const CustomCard: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div className={`rounded-lg shadow-md ${className}`} {...props}>
            {children}
        </div>
    );
};

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "ghost" | "default" | string;
    size?: "icon" | string;
    [key: string]: any;
};

const Button: React.FC<ButtonProps> = ({ children, className, variant, size, ...props }) => {
    let baseClasses = "inline-flex items-center justify-start rounded-md text-sm font-bold transition-colors";

    if (variant === "ghost") {
        baseClasses += " hover:bg-gray-100";
    } else if (variant === "default") {
        baseClasses += " bg-yellow-500 text-black hover:bg-yellow-600";
    } else {
        baseClasses += " bg-white text-gray-900 hover:bg-gray-100";
    }

    if (size === "icon") {
        baseClasses += " h-9 w-9 p-0";
    } else {
        baseClasses += " px-4 py-2"; // Ridotto il padding per contenere il testo
    }

    baseClasses = cn(baseClasses, className);

    return (
        <button className={baseClasses} {...props}>
            {children}
        </button>
    );
};

const MainContent = () => {

        const [hoveredImages, setHoveredImages] = React.useState<{ [key: number]: string | null }>({});
        const isImageHovered = Object.values(hoveredImages).some(image => image);
    
        return (
           <div className="flex-col md:flex-row p-4 md:p-8 gap-8 flex"> {/* Added 'flex' here to enable flexbox layout */}

  {/* Pulsanti laterali a sinistra */}
 <aside className="hidden md:block sticky top-4 h-fit w-full md:w-1/4 lg:w-1/8 xl:w-1/8 z-10 bg-gray-200 p-4 rounded-lg shadow-lg">
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
    
                {/* Center Column (Hero Section e testo) */}
                <div className="w-full lg:w-2/2 flex flex-col items-center mt-8 md:mt-0">
                    <section className="relative text-center w-full bg-gray-200 p-4 rounded-lg shadow-lg">
                        <div className="bg-black bg-opacity-50 p-4 md:p- flex flex-col items-center">
                            <h1 className="text-3xl text-white font-bold mb-6 text-center"></h1>
                            <section className="bg-black bg-opacity-80 rounded-lg shadow-lg p-0 mt-0">
                                <div className="max-w-3xl text-gray-500 text-justify mb-8 bg-black bg-opacity-70 p-0 rounded-lg">
                                    <p className="text-lg text-white">
                                        <br/>Crediamo che ogni persona abbia competenze utili che possono essere messe a disposizione della comunità,
                                             senza necessariamente essere un professionista certificato o una ditta, vorremmo creare un ambiente inclusivo dove ogni abilità sia valorizzata, indipendentemente dall'età, genere, background culturale o livello di istruzione.<br/>
                                             I nostri obiettivi principali sono quelli di:<br/>
                                       <br/>1. Dare opportunità di guadagno a chiunque abbia abilità pratiche.<br/>
                                        <br/>2. Offrire un'alternativa economica e accessibile per piccoli lavori.<br/>
                                        <br/>3. Creare una rete di fiducia basata su recensioni e competenze reali.<br/>
                                        <br/>Con la nostra piattaforma, vogliamo democratizzare il mondo del lavoro occasionale, rendendolo più flessibile, accessibile e vantaggioso per tutti.
                                        Garantiamo la massima trasparenza nelle recensioni e nella comunicazione tra utenti, per costruire una comunità affidabile e onesta.
                                        Ci impegniamo a migliorare costantemente la nostra piattaforma, integrando nuove tecnologie e funzionalità per soddisfare le esigenze in continua evoluzione dei nostri utenti.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>

                {/* Colonna di destra (Post recenti) */}
                <div className="w-full md:w-1/4 bg-red-500 p-4 rounded-xl shadow-lg space-y-2 mt-8 md:mt-0">
                    <h3 className="text-lg font-bold text-white text-center"></h3>
                    <div className="grid grid-cols-1 gap-4">
                    {[
  { src: "/images/handyman.jpg", caption: "Piccoli lavori domestici" },
  { src: "/images/riparazioni-elettrodomestici.jpg", caption: "Riparazioni di elettrodomestici" },
  { src: "/images/home-repair.jpg", caption: "Semplici interventi" },
].map((item, index) => (
  <div
    key={index}
    className="transform transition duration-300 hover:scale-105 cursor-pointer group relative overflow-hidden"
    onMouseEnter={() => setHoveredImages(prev => ({ ...prev, [index]: item.src }))}
    onMouseLeave={() => setHoveredImages(prev => ({ ...prev, [index]: null }))}
  >
    <Image
      src={item.src}
      alt={`Volantino ${index + 1}`}
      className="rounded-md w-full object-contain"
      width={500}
      height={500}
      layout="responsive"
    />
    <p className="text-white text-sm mt-2 text-center">{item.caption}</p>
  </div>
))}
                    </div>
                </div>
    
                {isImageHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-2xl rounded-lg z-50"
                    >
                        <Image
                            src={Object.values(hoveredImages).find(image => image) || ""}
                            alt="Volantino Ingrandito"
                            width={600}
                            height={600}
                            className="rounded-lg object-contain"
                        />
                    </motion.div>
                )}
            </div>
        );
    };
    
    const HomePage = () => {
        const navPaddingX = 'px-6'; // Margine orizzontale del menu
    
        return (
            <div className="min-h-screen flex flex-col">
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
    
                   {/* Hero Image */}
                               {/* Header */}
<header className="text-center py-20 bg-cover bg-center text-white relative" style={{
  // Immagine di sfondo dell'uomo che ripara elettrodomestici con passione
  backgroundImage: 'url("/images/sfondo mission.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: "#000000", /* Colore di fallback */
  minHeight: '840px' /* Altezza minima per visualizzare l'immagine */
}}>
  {/* Overlay per migliorare la leggibilità del testo */}
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <motion.h2
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 mt-70 text-8xl font-bold"
    style={{ fontSize: "2rem", color: "#ffffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }} // Blue scuro
  >
    LA NOSTRA MISSION
  </motion.h2>
  <motion.p
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative z-10 mt-10 text-lg text-justify mt-4 max-w-5xl mx-auto"
    style={{ fontSize: "1.7rem", color: "#E5E7EB", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }} // Grigio chiaro
  >
Ognuno di noi possiede talenti e capacità spesso inespressi, che utilizza solo per sé o per pochi amici e familiari.
La nostra missione è trasformare questo potenziale nascosto in un’opportunità reale: offrire a chiunque la possibilità di far conoscere le proprie attitudini a un pubblico sempre più ampio, valorizzandole e mettendole davvero in gioco.
Vogliamo creare le condizioni affinché una semplice passione possa diventare un vero lavoro, gratificante e ben retribuito.
Perché il talento non deve restare nell’ombra: merita di emergere, crescere e fare la differenza.
  </motion.p>
</header>


    
                {/* Contenuto principale con flex-grow */}
                <div className="flex-grow z-0 py-20" style={{ paddingTop: '20px' }}>
                    <MainContent />
                </div>
    
                {/* Footer fisso in fondo */}
                <footer className="text-center py-3 bg-gray-800">
                    <p>&copy; 2025 faccio-tutto.it - Tutti i diritti riservati.</p>
                </footer>
            </div>
        );
    };
    
    export default HomePage;