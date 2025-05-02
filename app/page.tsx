import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { FaWrench, FaPhone, FaEnvelope, FaDraftingCompass, FaSolarPanel, FaPlug, FaDoorOpen } from "react-icons/fa";
import Image from "next/image";
import styles from "./page.module.css"; // Importa CSS Modules
import React from 'react';

export default function HomeRepairService() {
  return (
    <div className="min-h-screen bg-gray-100">
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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
        <h2 className="custom-title">Progettazione, Riparazioni, Installazioni</h2>
<p className="custom-paragraph">Servizi professionali per la tua casa con un solo contatto!</p>
          <a href="mailto:info@faccio-tutto.it">
            <Button className="bg-blue-500 text-white w-56 h-12 text-base rounded-lg">
              Contattaci tramite e-mail
            </Button>
          </a>
        </div>
      </section>

      {/* Servizi */}
<div className="grid md:grid-cols-3 gap-6 bg-white bg-opacity-80 p-6 mt-6">
  {[{
    id: "progettazione",
    icon: <FaDraftingCompass className="text-3xl mb-12 text-purple-500" />, 
    title: "Progettazione Architettonica",
    desc: "Ristrutturazioni e nuove costruzioni.",
    link: "/progettazione"
  }, {
    id: "fotovoltaico",
    icon: <FaSolarPanel className="text-3xl mb-12 text-yellow-500" />, 
    title: "Impianti Fotovoltaici",
    desc: "Progettazione, installazione e manutenzione.",
    link: "/fotovoltaico"
  }, {
    id: "infissi",
    icon: <FaDoorOpen className="text-5xl mb-8 text-orange-900" />, 
    title: "Vendita e Installazione Infissi",
    desc: "Infissi in PVC e alluminio.",
    link: "/infissi"
  }, {
    id: "riparazione-elettrodomestici",
    icon: <FaPlug className="text-3xl mb-12 text-orange-500" />, 
    title: "Riparazione Elettrodomestici",
    desc: "Piccoli elettrodomestici per la casa.",
    link: "/riparazione-elettrodomestici"
  }, {
    id: "riparazioni-veloci",
    icon: <FaWrench className="text-3xl mb-12 text-blue-500" />, 
    title: "Riparazioni Veloci",
    desc: "Interventi rapidi su riparazioni domestiche.",
    link: "/riparazioni-veloci"
  }, {
    id: "contatti",
    icon: <FaPhone className="text-3xl mb-12 text-green-500" />, 
    title: "Prenota Subito",
    desc: "Contattaci per fissare un appuntamento.",
    link: "/prenota"
  }].map(service => (
    <a href={service.link} key={service.id} className="block transform transition duration-300 hover:scale-105">
      <Card>
  <CardContent>
    <div className="p-4 text-center shadow-lg rounded-lg w-[500px] h-44 flex flex-col justify-center items-center">
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
