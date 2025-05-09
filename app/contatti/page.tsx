"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ModuloContatti from './ModuloContatti';
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

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
            
      {/* Contatti Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]"
      >
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-400">Contattaci</h1>
        <p className="text-lg text-center mb-8 max-w-2xl">
          Siamo qui per rispondere a tutte le tue domande. Non esitare a contattarci per qualsiasi informazione o richiesta.
        </p>

        {/* Layout aggiornato */}
        <div className="flex flex-col md:flex-row items-start gap-12 w-full max-w-6xl">
          {/* Pulsanti contatti */}
          <div className="flex flex-col gap-6 w-full md:w-2/2">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center w-full"
              >
                <div className="w-48 h-40 bg-blue-250 rounded-xl flex justify-center items-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <Image src={item.src} width={200} height={120} alt={item.alt} className="object-contain" />
                </div>
                <h2 className="text-lg font-semibold mt-4 text-center w-full text-blue-400">{item.text}</h2>
              </motion.div>
            ))}
          </div>

          {/* Modulo contatti */}
          <div className="w-full md:w-4/4">
          <ModuloContatti destinatarioEmail="info@faccio-tutto.it" />
            <div className="mt-2 text-left">
            </div>
          </div>
        </div>

        {/* Pulsante per tornare alla home */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl mt-12"
          >
            Torna alla Home
          </motion.button>
        </Link>
      </motion.div>

      <footer className="text-center mt-8 p-6 bg-gray-900 text-gray-300">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}