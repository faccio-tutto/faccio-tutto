"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWrench, FaPhone, FaEnvelope, FaDraftingCompass, FaSolarPanel, FaPlug, FaDoorOpen, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { cn } from '@/lib/utils';
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
    const heroTitle = "Progettazione, Riparazioni, Installazioni";
    const coloredTitle = heroTitle.split(', ').flatMap((phrase, index) => {
        const words = phrase.split(' ');
        return words.map((word, wordIndex) => (
  <React.Fragment key={`${index}-${wordIndex}`}>
    <span className={
      index === 0 ? 'text-purple-500' :
      index === 1 ? 'text-orange-500' :
      index === 2 ? 'text-yellow-500' :
      'text-white'
    }>
      {word}
    </span>
    {wordIndex < words.length - 1 && ' '}
  </React.Fragment>
));
    });

        const [hoveredImages, setHoveredImages] = React.useState<{ [key: number]: string | null }>({});
        const isImageHovered = Object.values(hoveredImages).some(image => image);
    
        return (
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-start relative z-10 py-8">
                {/* Servizi - NUOVI PULSANTI */}
                <div className="w-full md:w-4/4 space-y-4 mb-8 md:mb-0 bg-gray-200 p-4 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 gap-4 bg-white bg-opacity-80 p-4 rounded-lg">
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
                            <Link href={service.link} key={service.id} className="block transform transition duration-300 hover:scale-105">
                                <CustomCard className="border-gray-200 bg-transparent">
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
                </div>
    
                {/* Colonna centrale (Hero Section e testo) */}
                <div className="w-full md:w-2/2 flex flex-col items-center mt-8 md:mt-0">
                    <section className="relative text-center w-full bg-gray-200 p-4 rounded-lg shadow-lg">
                        <div className="bg-black bg-opacity-50 p-4 md:p-6 flex flex-col items-center">
                            <div className="flex flex-col items-center space-y-1"> {/* space-y-1 per uno spazio piccolo e uniforme */}
                                <span className="text-3xl font-bold text-purple-500">PROGETTAZIONE</span>
                                <span className="text-3xl font-bold text-yellow-500">INSTALLAZIONI</span>
                                <span className="text-3xl font-bold text-orange-500 mb-6">RIPARAZIONI</span>
                            </div>
                            <div className="text-gray-300 text-xl md:text-xl font-bold mb-4">Tanti servizi con un solo contatto!</div>
                            <section className="bg-black bg-opacity-80 text-gray-600 rounded-lg shadow-lg p-6 mt-0">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Progettazione */}
    <div className="flex flex-col items-center gap-4"> {/* Modificato in flex-col */}
      <Image src="/images/progettazione.png" alt="Progettazione" width={200} height={200} className="rounded shadow-md object-cover" />
      <div className="text-gray-400 text-lg text-center font-medium">
        Hai bisogno di un progetto per la tua casa o per la tua nuova attività? Affidati ai nostri esperti in progettazione architettonica e direzione lavori.
      </div>
    </div>

    {/* Risparmio energetico */}
    <div className="flex flex-col items-center gap-4"> {/* Modificato in flex-col */}
      <Image src="/images/energia-verde.png" alt="Risparmio energetico" width={200} height={200} className="rounded shadow-md object-cover" />
      <div className="text-gray-400 text-lg text-center font-medium">
        Vuoi risparmiare energia e prenderti cura dell’ambiente? Scopri le nostre soluzioni con impianti fotovoltaici e infissi ad alta efficienza.
      </div>
    </div>

    {/* Riparazione elettrodomestici */}
    <div className="flex flex-col items-center gap-4"> {/* Modificato in flex-col */}
      <Image src="/images/riparazione-elettrodomestici.png" alt="Riparazione piccoli elettrodomestici" width={200} height={200} className="rounded shadow-md object-cover" />
      <div className="text-gray-400 text-lg text-center font-medium">
        Sei affezionato ai tuoi oggetti e preferisci ripararli piuttosto che buttarli? Ci occupiamo della riparazione di piccoli elettrodomestici con competenza e attenzione.
      </div>
    </div>

    {/* Piccole riparazioni domestiche */}
    <div className="flex flex-col items-center gap-4"> {/* Modificato in flex-col */}
      <Image src="/images/piccole-riparazioni.png" alt="Riparazioni domestiche" width={200} height={200} className="rounded shadow-md object-cover" />
      <div className="text-gray-400 text-lg text-center font-medium">
        Cerchi qualcuno per piccole riparazioni in casa, ma nessuno è disponibile? Con <strong>faccio-tutto.it</strong> trovi anche chi si occupa degli interventi più semplici ma importanti.
      </div>
    </div>
  </div>

  <div className="mt-8 text-center">
    <div className="text-xl font-bold text-gray-200 mb-2">Un solo riferimento per ogni esigenza</div>
    <div className="text-xl text-gray-300 mb-4">
      Progettazione, installazioni, riparazioni e risparmio energetico: <strong>faccio-tutto.it</strong> è il tuo punto di riferimento per servizi affidabili e su misura.
    </div>
  </div>
  
</section>
                            {/* New Cards Section */}
                            <div className="text-3xl text-blue-600">Come funziona faccio-tutto.it?</div>
                            <div className="grid grid-cols-1 gap-4 mt-8">
                                <CustomCard className="border-gray-200 bg-transparent">
                                    <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                                        <Image src="/images/richiesta.png" alt="Fai la tua richiesta" width={200} height={200} className="rounded-full shadow-md" />
                                        <p className="text-xs text-gray-600 mt-8">Fai la tua richiesta</p>
                                    </CustomCardContent>
                                </CustomCard>
                                <CustomCard className="border-gray-200 bg-transparent">
                                    <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                                        <Image src="/images/selezione.png" alt="Selezioniamo i profili migliori" width={200} height={200} className="rounded-full shadow-md" />
                                        <p className="text-xs text-gray-600 mt-8">Noi selezioniamo i profili migliori per te</p>
                                    </CustomCardContent>
                                </CustomCard>
                                 <CustomCard className="border-gray-200 bg-transparent">
                                    <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                                        <Image src="/images/preventivi.png" alt="Ricevi il preventivo" width={200} height={200} className="rounded-full shadow-md" />
                              
                                        <p className="text-xs text-gray-600 mt-8">Ricevi il preventivo</p>
                                    </CustomCardContent>
                                </CustomCard>
                                <CustomCard className="border-gray-200 bg-transparent">
                                    <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                                        <Image src="/images/esecuzione lavori.png" alt="Inizia i lavori" width={200} height={200} className="rounded-full shadow-md" />
                                        
                                        <p className="text-xs text-gray-600 mt-8">Se accetti il preventivo, ti mettiamo in contatto con chi eseguirà i lavori</p>
                                    </CustomCardContent>
                                </CustomCard>
                                <CustomCard className="border-gray-200 bg-transparent">
                                    <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                                        <Image src="/images/fine lavori.png" alt="Lascia un feedback" width={200} height={200} className="rounded-full shadow-md" />

                                        <p className="text-xs text-gray-600 mt-8">A lavori completi lascia un feedback e condividi la tua esperienza.</p>
                                    </CustomCardContent>
                                </CustomCard>
                            </div>
                            {/* End of New Cards Section */}
                            <a href="mailto:info@faccio-tutto.it">
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white w-full md:w-40 h-12 text-base rounded-lg flex items-center justify-center gap-6 mt-20">
                                    Contattaci 
                                    <FaEnvelope />
                                </Button>
                            </a>
                        </div>
                    </section>
                </div>
    
                {/* Colonna di destra (Post recenti) */}
                <div className="w-full md:w-4/4 bg-red-500 p-4 rounded-xl shadow-lg space-y-2 mt-8 md:mt-0">
                    <h3 className="text-lg font-bold text-white text-center">Post recenti</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            "/images/Volantino fotovoltaico.png",
                            "/images/reddito energetico.png",
                            "/images/40 fondi PNRR.png",
                            "/images/post 8 maggio architettura.png",
                            "/images/post 10 maggio.png",
                            "/images/post 14 maggio.png",
                            "/images/cer.png",
                            "/images/post 21 maggio.png",
                            "/images/post 27 maggio.png",
                            "/images/post 29 maggio.png",
                            "/images/post 3 giugno.png",
                            "/images/post 5 giugno.png",
                            "/images/post 9 giugno.png",
                        ].map((src, index) => (
                            <div
                                key={index}
                                className="transform transition duration-300 hover:scale-105 cursor-pointer group relative overflow-hidden"
                                onMouseEnter={() => setHoveredImages(prev => ({ ...prev, [index]: src }))}
                                onMouseLeave={() => setHoveredImages(prev => ({ ...prev, [index]: null }))}
                            >
                                <Image src={src} alt={`Volantino ${index + 1}`} className="rounded-md w-full object-contain" width={500} height={500} layout="responsive" />
                                {/* Non abbiamo più bisogno del div di ingrandimento qui */}
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
                <div className="w-full relative h-[300px] md:h-[660px]">
                    <Image
                        src="/architect-multitasking.jpg"
                        alt="Architetto multitasking"
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                    />
                </div>
        
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