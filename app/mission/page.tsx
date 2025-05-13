"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function MissionPage() {
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
     

      {/* Mission Section */}
      <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">La Nostra Mission</h1>
        <div className="max-w-5xl text-justify mb-8 bg-black bg-opacity-70 p-6 rounded-lg">
        <p className="mission-text">
  Crediamo che ogni persona abbia competenze utili che possono essere messe a disposizione della comunità, 
  senza necessariamente essere un professionista certificato o una ditta.

  La nostra missione è collegare chi ha bisogno di un servizio con chi sa farlo, permettendo a chiunque di offrire 
  il proprio talento e le proprie abilità in modo semplice, sicuro e trasparente.
</p>
          <ul className="list-disc list-inside text-xl">
            <li>Dare opportunità di guadagno a chiunque abbia abilità pratiche.</li>
            <li>Offrire un'alternativa economica e accessibile per piccoli lavori.</li>
            <li>Creare una rete di fiducia basata su recensioni e competenze reali.</li>
          </ul>
          <p className="mission-text">
            Con la nostra piattaforma, vogliamo democratizzare il mondo del lavoro occasionale, rendendolo più flessibile, accessibile e vantaggioso per tutti.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
  <div className="flex flex-col items-center">
    <Image src="/images/handyman.jpg" width={300} height={200} alt="Lavoratore occasionale" className="rounded-lg" />
    <p style={{ fontSize: '1.1rem', color: 'white', fontWeight: '600' }} className="mt-4 text-center">Piccoli lavori domestici</p>
  </div>
  <div className="flex flex-col items-center">
    <Image src="/images/riparazioni-elettrodomestici.jpg" width={300} height={200} alt="Riparazioni elettrodomestici" className="rounded-lg" />
    <p style={{ fontSize: '1.1rem', color: 'white', fontWeight: '600' }} className="mt-4 text-center">Riparazioni di elettrodomestici</p>
  </div>
  <div className="flex flex-col items-center">
    <Image src="/images/home-repair.jpg" width={300} height={200} alt="Riparazioni domestiche" className="rounded-lg" />
    <p style={{ fontSize: '1.1rem', color: 'white', fontWeight: '600' }} className="mt-4 text-center">Semplici riparazioni</p>
</div>
        </div>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
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