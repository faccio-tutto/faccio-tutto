"use client";
import Image from "next/image"; // Assicurati che Image sia importato
import ModuloContatti from "./ModuloContatti";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const AffiliazionePrivati = () => {
    return (
        <div className="min-h-screen bg-black text-white p-0">
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

            <div className="min-h-screen bg-black flex justify-center items-center p-6">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Affiliazione Privati</h2>
                    
                    {/* Inserimento del modulo contatti */}
                    <section className="text-white py-6 text-center">
                    <div className="text-lg text-gray-500 text-bold text-center">
                        Se sei un privato e desideri affiliarti, compila il modulo qui sotto. 
                        <br/>Ti contatteremo al più presto per fornirti tutte le informazioni necessarie.
                    </div>
                    <div className="mt-8 bg-black items-center"></div>
                    <div id="modulo-contatti" className="flex justify-center">
                    <ModuloContatti destinatarioEmail="affiliazione@faccio-tutto.it" />
                    </div>
                    </section>
                    {/* Link per scaricare il modello di ricevuta */}
                    <div className="mt-6 text-center -mb-0">
                        <a href="/MODELLO RICEVUTA PRESTAZIONE OCCASIONALE TRA PRIVATI.pdf" download className="text-blue-500 hover:text-blue-700 text-lg">
                            Scarica il modello di ricevuta per prestazioni occasionali
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AffiliazionePrivati;