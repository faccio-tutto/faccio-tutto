"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ModuloContatti from './ModuloContatti';
import { FaWrench, FaPhone, FaEnvelope, FaDraftingCompass, FaSolarPanel, FaPlug, FaDoorOpen, FaInstagramSquare, FaLinkedin, FaHome } from "react-icons/fa";
import { cn } from '@/lib/utils';
 // Assicurati di aver installato framer-motion

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

export default function ContattiPage() {
  const contactItems = [
    {
      src: "/images/sede button 2.png",
      text: "via J. F. Kennedy 67, 92024 Canicattì (AG)",
      alt: "Indirizzo",
    },
    {
      src: "/images/mail button 2.png",
      text: "info@faccio-tutto.it",
      alt: "Email",
    },
    {
      src: "/images/phone button 2.png",
      text: "+39 333 4491881",
      alt: "Telefono",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
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
            
      {/* Contatti Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]"
>
  <h1 className="text-3xl font-bold mb-10 text-center text-blue-400">Contattaci</h1>
  <p className="text-lg text-center mb-8 max-w-2xl">
    Siamo qui per rispondere a tutte le tue domande. Non esitare a contattarci per qualsiasi informazione o richiesta.
  </p>

  {/* Layout aggiornato */}
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-start gap-8 relative z-10 py-8">
    {/* Servizi - NUOVI PULSANTI */}
    <div className="w-full md:w-4/4 space-y-4 mb-8 md:mb-0 bg-gray-200 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 gap-4 bg-white bg-opacity-80 p-4 rounded-lg">
        {[
          {
                id: "home",
                icon: <FaHome className="text-3xl mb-0 text-red-500" />,
                title: "Indirizzo sede",
                description: "Via J.F.Kennedy 67, Canicattì (AG)",
                link: "https://www.google.com/maps/place/Via+John+Fitzgerald+Kennedy,+67,+92024+Canicatt%C3%AC+AG/@37.3547205,13.8486844,17z/data=!3m1!4b1!4m6!3m5!1s0x13109243e58decef:0x341491fc3493e451!8m2!3d37.3547163!4d13.8512593!16s%2Fg%2F11csmbjss5?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D"
            },
            {
                id: "mail",
                icon: <FaEnvelope className="text-3xl mb-0 text-blue-500" />,
                title: "Indirizzo e-mail",
                description: "info@faccio-tutto.it",
                link: "info@faccio-tutto.it"
            },
            {
                id: "telefono",
                icon: <FaPhone className="text-3xl mb-0 text-green-500" />,
                title: "Numero di telefono",
                description: "+39 333 4491881",
                link: "+39 333 4491881"
            }
        ].map(service => (
            <a
    key={service.id}
    href={
        service.id === "mail"
            ? `mailto:${service.link}`
            : service.id === "telefono"
            ? `tel:${service.link.replace(/\s+/g, '')}`
            : service.link
    }
    target={service.id === "home" ? "_blank" : undefined}
    rel={service.id === "home" ? "noopener noreferrer" : undefined}
    className="block transform transition duration-300 hover:scale-105"
>
                <CustomCard className="border-gray-200 bg-transparent">
                    <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                        <div className="rounded-full p-3 shadow-md bg-white">
                            {service.icon}
                        </div>
                        <h3 className="text-sm font-semibold mt-2 text-gray-800">
                            {service.title}
                        </h3>
                        {service.description && (
                            <div style={{ fontSize: '14px' }} className="text-gray-600 mt-1">{service.description}</div>
                        )}
                    </CustomCardContent>
                </CustomCard>
            </a>
        ))}
    </div>
</div>

                  {/* Modulo contatti */}
         <div className="w-full md:w-2/3 mx-auto">
           <ModuloContatti destinatarioEmail="info@faccio-tutto.it" />
           <div className="mt-0 text-left"></div>
         </div>
  </div>
  </motion.div>
  {/* Footer */}

      <footer className="text-center mt-8 p-6 bg-gray-900 text-gray-300">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}