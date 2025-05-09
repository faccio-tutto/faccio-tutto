"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
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
                 <a href="https://www.linkedin.com/company/107244096/admin/dashboard/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Link">
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

      {/* Mission Section */}
      <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-center">La Nostra Vision</h1>
        <div className="max-w-5xl text-justify mb-8 bg-black bg-opacity-70 p-6 rounded-lg">
        <p className="mission-text">
        Crediamo in un mondo in cui chiunque sappia fare qualcosa possa offrire il proprio talento
          senza bisogno di essere un professionista certificato. Offriamo un'opportunità a chiunque
          voglia mettere a disposizione le proprie competenze, creando una rete di aiuto reciproco
          e occasioni di lavoro accessibili a tutti. L'idea centrale è quella di superare la barriera 
          delle certificazioni formali, valorizzando le capacità pratiche di ogni individuo perchè a volte 
          il saper fare ha più valore del titolo di studio.
          Vogliamo creare una comunità collaborativa in cui le persone si supportano a vicenda attraverso lo
          scambio di competenze.
          L'obiettivo è quello di generare delle occasioni di lavoro che siano inclusive e aperte a tutti, 
          indipendentemente dal loro background professionale.
          Su questa piattaforma si vuole creare un ambiente stimolante per mettersi alla prova, garantire la qualità 
          dei servizi offerti, ottenere dei feedback e costruire un portfolio di competenze. 
</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="text-center">
            <Image src="/images/operaio-tenda.jpg" width={300} height={200} alt="operaio-tenda" className="rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Talento alla portata di tutti</h2>
          </div>
          <div className="text-center">
            <Image src="/images/operaio-lampadario.jpg" width={300} height={200} alt="operaio-lampadario" className="rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Lavori semplici, senza complicazioni</h2>
          </div>
          <div className="text-center">
            <Image src="/images/operaio-chiodi.jpg" width={300} height={200} alt="operaio-chiodi" className="rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Un aiuto concreto per la casa</h2>
          </div>
        </div>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-10">
            Torna alla Home
          </button>
        </Link>
      </div>
      <footer className="text-center mt-6 p-4 bg-black text-white">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}