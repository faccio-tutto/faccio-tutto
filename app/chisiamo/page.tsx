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
                                        <h3 className={`text-sm font-semibold mt-2 text-grey-800`}>{service.title}</h3>
                                    </CustomCardContent>
                                </CustomCard>
                            </Link>
                        ))}
                    </div>
                </div>
    
                {/* Colonna centrale (Hero Section e testo) */}
                <div className="w-full md:w-2/2 flex flex-col items-center mt-8 md:mt-0">
                    <section className="relative text-center w-full">
                        <div className="bg-black bg-opacity-50 p-4 md:p-6 flex flex-col items-center">
                            <h2 className="custom-title">Chi siamo</h2>
                            <section className="bg-black bg-opacity-80 text-gray-600 rounded-lg shadow-lg p-0 mt-0">

  <div className="mt-8 text-center">
    <p className="text-base text-justify text-gray-400 mb-4">
    Siamo un'azienda che crede nel valore delle persone, al di là delle competenze lavorative ognuno di noi ha delle capacità, delle abilità, delle attitudini che esprime magari solo a casa propria o le mette a disposizione di pochi conoscenti, adesso, invece, questo "talento" può essere espresso su larga scala e riconosciuto sempre da più persone grazie ai feedback ricevuti. 
          Ogni individuo possiede un bagaglio unico di capacità, passioni e attitudini che spesso rimangono inespresse nel contesto lavorativo tradizionale. 
          Noi crediamo nel valore delle persone e riconosciamo che il potenziale umano non si limita alle competenze tecniche richieste dal ruolo, infatti adottiamo una visione olistica, che abbraccia la totalità dell'individuo, con le sue peculiarità e i suoi talenti. 
          La valorizzazione del potenziale inespresso non è solo un atto di responsabilità sociale, ma anche una strategia aziendale vincente. 
          Quando le persone hanno l'opportunità di esprimere i propri talenti, si sentono più motivate, coinvolte e realizzate, questo si traduce in un aumento della produttività, della creatività e dell'innovazione. 
          Grazie alla nostra piattaforma i talenti individuali possono essere esposti a un pubblico molto più ampio rispetto al passato ciò permette di ottenere feedback e riconoscimenti da persone diverse, che possono apprezzare e valorizzare le abilità specifiche di ciascuno, i feedback positivi e il riconoscimento pubblico rafforzano l'autostima e la motivazione, incoraggiando le persone a sviluppare ulteriormente i propri talenti. 
          Inoltre, i feedback costruttivi possono fornire spunti preziosi per migliorare e affinare le proprie abilità. La condivisione dei talenti e dei feedback favorisce la creazione di comunità di persone con interessi simili, che possono scambiarsi idee, collaborare e sostenersi a vicenda. 
          Vogliamo valorizzare il potenziale inespresso e creare un nuovo modo di lavorare inclusivo e stimolante, dove le persone si sentono libere di esprimere la propria creatività e di mettere in gioco le proprie abilità; valorizzare il potenziale inespresso delle persone è un investimento strategico che porta benefici sia ai singoli che alla nostra azienda nel suo complesso.
    </p>
  </div>
</section>
                        </div>
                    </section>
                </div>

                {/* Colonna di destra (Post recenti) */}
                <div className="w-full md:w-4/4 bg-red-500 p-4 rounded-xl shadow-lg space-y-2 mt-8 md:mt-0">
                    <h3 className="text-lg font-bold text-white text-center"></h3>
                    <div className="grid grid-cols-1 gap-4">
                    {[
  { src: "/images/hobby.jpg", caption: "Coltiva i tuoi hobbies" },
  { src: "/images/aspirapolvere riparazione.jpg", caption: "Metti a disposizione le tue competenze" },
  { src: "/images/stretta mano.jpg", caption: "Ricevi dei feedback" },
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
                <div className="w-full relative h-[300px] md:h-[660px]">
                    <Image
                        src="/images/chi siamo.png"
                        alt="sfondo chi siamo"
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