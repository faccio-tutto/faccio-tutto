import { Button } from "./components/ui/button";
import { FaWrench, FaPhone, FaEnvelope, FaDraftingCompass, FaSolarPanel, FaPlug, FaDoorOpen } from "react-icons/fa";
import Image from "next/image";
import React from 'react';
import { cn } from "@/lib/utils" // Importa la utility className
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

interface CardProps { //Definisci l'interfaccia
  children: React.ReactNode;
  className?: string; // Rendi className opzionale

}

const Card: React.FC<CardProps> = ({ children, className, }) => {
  return (
    <div className={cn("rounded-md border", className)}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={cn("p-4 md:p-6", className)}> {/* Aggiungi padding variabile */}
      {children}
    </div>
  )
}

export default function HomeRepairService() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-black text-white py-1 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-1">
          <a href="/">
            <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={200} height={200} className="rounded" />
          </a>
          <h1 className="text-2xl font-bold flex items-center gap-2">
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
      <div className="relative w-full h-[790px]">
        <Image
          src="/architect-multitasking.jpg"
          alt="Architetto multitasking"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <section className="relative text-center text-white">
        <Image
          src="/public/images/architect-multitasking.jpg"
          alt="Architetto multitasking"
          layout="responsive"
          width={7000}
          height={1024}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 md:p-6"> {/* Padding adattivo */}
          <h2 className="custom-title">Progettazione, Riparazioni, Installazioni</h2>
          <p className="custom-paragraph">Servizi professionali per la tua casa con un solo contatto!</p>
          <a href="mailto:info@faccio-tutto.it">
            <Button className="bg-blue-500 text-white w-full md:w-56 h-12 text-base rounded-lg"> {/* Larghezza pulsante adattiva */}
              Contattaci tramite e-mail
            </Button>
          </a>
        </div>
      </section>

      {/* Servizi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-white bg-opacity-80 p-4 md:p-6 mt-6"> {/* Grid adattiva e padding */}
        {[{
          id: "progettazione",
          icon: <FaDraftingCompass className="text-3xl mb-6 md:mb-12 text-purple-500" />,
          title: "Progettazione Architettonica",
          desc: "Ristrutturazioni e nuove costruzioni.",
          link: "/progettazione"
        }, {
          id: "fotovoltaico",
          icon: <FaSolarPanel className="text-3xl mb-6 md:mb-12 text-yellow-500" />,
          title: "Impianti Fotovoltaici",
          desc: "Progettazione, installazione e manutenzione.",
          link: "/fotovoltaico"
        }, {
          id: "infissi",
          icon: <FaDoorOpen className="text-5xl mb-4 md:mb-8 text-orange-900" />,
          title: "Vendita e Installazione Infissi",
          desc: "Infissi in PVC e alluminio.",
          link: "/infissi"
        }, {
          id: "riparazione-elettrodomestici",
          icon: <FaPlug className="text-3xl mb-6 md:mb-12 text-orange-500" />,
          title: "Riparazione Elettrodomestici",
          desc: "Piccoli elettrodomestici per la casa.",
          link: "/riparazione-elettrodomestici"
        }, {
          id: "riparazioni-veloci",
          icon: <FaWrench className="text-3xl mb-6 md:mb-12 text-blue-500" />,
          title: "Riparazioni Veloci",
          desc: "Interventi rapidi su riparazioni domestiche.",
          link: "/riparazioni-veloci"
        }, {
          id: "contatti",
          icon: <FaPhone className="text-3xl mb-6 md:mb-12 text-green-500" />,
          title: "Prenota Subito",
          desc: "Contattaci per fissare un appuntamento.",
          link: "/prenota"
        }].map(service => (
          <a href={service.link} key={service.id} className="block transform transition duration-300 hover:scale-105">
            <Card className="border-gray-200">
              <CardContent>
                <div className="p-4 text-center shadow-lg rounded-lg w-full h-auto flex flex-col justify-center items-center"> {/* Altezza automatica e larghezza piena */}
                  {service.icon}
                  <h2 className={`title-${service.id}`}>{service.title}</h2>
                  <p className="text-xs text-gray-700">{service.desc}</p>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Contatti */}
      <footer className="text-center mt-6 p-4 bg-black text-white">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
