"use client";
import { motion } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";
import { FaUserTie, FaBusinessTime, FaHandshake } from "react-icons/fa";

export default function AffiliazionePage() {
  return (
    <div className="min-h-screen bg-black text-white p-0">
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

      {/* Affiliazione Section */}
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center text-white-500">Diventa Parte della Nostra Rete di Affiliazione</h1>
        <p style={{ fontSize: '1.2rem', color: 'white', textAlign: 'justify' }} className="max-w-6xl mb-10">
  Siamo alla ricerca di privati e aziende che vogliano entrare a far parte del nostro network di affiliazione. Offriamo opportunità vantaggiose e supporto completo per aiutarti a crescere nel mondo dei servizi pratici e occasionali.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Affiliazione per Privati */}
          <div className="bg-gray-300 shadow-lg rounded-lg p-6 text-center">
            <FaUserTie className="text-4xl mb-4 text-yellow-500" />
            <h2 className="text-2xl font-semibold mb-4">Affiliazione per Privati</h2>
            <p style={{ fontSize: '1.0rem', color: 'black', textAlign: 'center' }} className="max-w-6xl mb-10">
              Se sei un privato con competenze pratiche da offrire, questa è la tua occasione! Puoi diventare affiliato, ottenere feedback dai clienti e guadagnare offrendo i tuoi servizi.
            </p>
            <Link href="/affiliazione/privato">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Scopri di più
              </button>
            </Link>
          </div>

          {/* Affiliazione per Aziende */}
          <div className="bg-gray-300 shadow-lg rounded-lg p-6 text-center">
            <FaBusinessTime className="text-4xl mb-4 text-red-500" />
            <h2 className="text-2xl font-semibold mb-4">Affiliazione per Aziende</h2>
            <p style={{ fontSize: '1.0rem', color: 'black', textAlign: 'center' }} className="max-w-6xl mb-10">
              Se rappresenti un'azienda, entra a far parte del nostro programma di affiliazione e sfrutta le opportunità per ampliare il tuo raggio d'azione e attrarre nuovi clienti.
            </p>
            <Link href="/affiliazione/azienda">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Scopri di più
              </button>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <h3 className="text-2xl font-semibold mb-4">Unisciti a noi oggi stesso!</h3>
          <p style={{ fontSize: '1.2rem', color: 'white', textAlign: 'justify' }} className="max-w-6xl mb-10">
            Sia che tu sia un privato in cerca di opportunità o un'azienda pronta a espandere il proprio business, la nostra piattaforma è il posto giusto per crescere e prosperare.
          </p>
          {/* Pulsante spostato più in basso con margine superiore */}
          <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <Link
    href="/contatti"
    className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-transform transform hover:scale-105"
  >
    <TfiEmail className="text-2xl" />
    Contattaci
  </Link>
</motion.div>
        </div>
      </div>
      <footer className="text-center mt-6 p-4 bg-black text-white">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}