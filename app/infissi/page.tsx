"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { FaToggleOn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ModuloContatti from './ModuloContatti';
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const InfissiPage = () => {
  const [dimensioni, setDimensioni] = useState(Array(10).fill(''));
  const [colore, setColore] = useState('Seleziona un colore');
  const [materiale, setMateriale] = useState('Seleziona un materiale');
  const [accessori, setAccessori] = useState('Seleziona un accessorio');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [via, setVia] = useState('');
  const [città, setCittà] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!privacy) {
      alert("Devi accettare la privacy policy per continuare.");
      return;
    }
    console.log({ dimensioni, colore, materiale, accessori, nome, cognome, email, telefono, via, città, privacy });
  };

  const handleDimensioniChange = (index: number, value: string) => {
    const newDimensioni = [...dimensioni];
    newDimensioni[index] = value;
    setDimensioni(newDimensioni);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <section className="relative flex items-center justify-center py-16 md:py-24 overflow-hidden">
  {/* Contenitore con immagine ridimensionabile */}
  <div className="absolute inset-0 flex justify-center z-0">
    <img
      src="/images/prodotti.webp"
      alt="Sfondo infissi"
      className="w-full max-w-[1200px] object-contain sm:object-cover"
    />
  </div>

  {/* Overlay per contrasto */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>

  {/* Contenuto */}
  <div className="relative z-20 px-4 sm:px-6 max-w-[1200px] w-full text-white mx-auto text-center">
  <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Infissi di alta qualità</h2>
    <p className="text-base sm:text-lg font-medium mb-6 text-white">
      Soluzioni su misura per la tua casa
    </p>
    <div className="space-y-4 text-[1.125rem] sm:text-[1.25rem] leading-relaxed text-white text-justify">
      <p>
      Eleva il comfort e il valore della tua casa con i nostri infissi di alta qualità. Ogni soluzione è progettata su misura per integrarsi perfettamente con il tuo stile abitativo, garantendo un'estetica raffinata e prestazioni superiori nel tempo.

La nostra attenzione ai dettagli si traduce nella scelta di materiali di primissima qualità, selezionati per la loro durabilità, efficienza energetica e resistenza agli agenti atmosferici. Dagli eleganti profili ai meccanismi di apertura fluidi e affidabili, ogni accessorio è pensato per offrirti funzionalità ottimali e una lunga durata.

Affidati alla nostra posa in opera specializzata, eseguita da artigiani esperti che curano ogni dettaglio per assicurare una perfetta sigillatura e un'installazione impeccabile. La nostra manodopera qualificata garantisce non solo un risultato estetico eccellente, ma anche la massima performance in termini di isolamento termico e acustico, contribuendo a un significativo risparmio energetico e a un maggiore benessere abitativo.

Scegliere i nostri infissi significa investire in un comfort duraturo, in una maggiore sicurezza per la tua casa e in un design che valorizza ogni ambiente. Trasforma la tua abitazione in uno spazio accogliente, efficiente e bello da vivere, grazie alla qualità senza compromessi dei nostri prodotti e alla professionalità del nostro team.
      </p>
    </div>
  </div>
</section>

      {/* Cosa Offriamo Section */}
      <section className="py-12 px-6 text-center">
        <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Cosa Offriamo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#A18D65' }}>
            <div className="relative w-full h-48 md:h-64 overflow-hidden">
              <Image
                src="/images/infissi-alluminio.jpg"
                alt="Infissi in alluminio"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-left w-full">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Infissi in alluminio a taglio termico</h3>
              <p style={{ color: '#000000' }} className="text-sm font-semibold mb-2 text-white">Varietà di infissi in alluminio con isolamento termico e design elegante.</p>
              <div className="text-sm space-y-2">
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>TIPO DI SISTEMA:</h4>
                <p style={{ color: '#000000' }}>Giunto aperto camera europea</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>PROFILATI ESTRUSI:</h4>
                <p style={{ color: '#000000' }}>Lega d’alluminio 6060 Al Mg 0.5, Si 0.4, Fe 0.2 secondo le norme UNI EN 573</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>STATO DI FORNITURA:</h4>
                <p style={{ color: '#000000' }}>T5 secondo la norma UNI EN 515</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>TOLLERANZE DIMENSIONALI E SPESSORI:</h4>
                <p style={{ color: '#000000' }}>UNI EN 12020-2</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>TIPO DI TENUTA ARIA-ACQUA:</h4>
                <p style={{ color: '#000000' }}>Soluzione a sormonto con guarnizione centrale e guarnizione ad isolamento acustico sulla battuta interna</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>ASSEMBLAGGIO DI PROFILI A TAGLIO TERMICO:</h4>
                <p style={{ color: '#000000' }}>Accoppiamento realizzato mediante l’inserimento di listelli in poliammide rinforzata con fibre di vetro di lunghezza 28 mm, bloccati mediante rullatura in continuo</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>DIMENSIONI DEL SISTEMA:</h4>
                <p style={{ color: '#000000' }}>Telaio fisso profondità 64 mm</p>
                <p style={{ color: '#000000' }}>Telaio mobile profondità 72 mm</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>IMPIEGO:</h4>
                <p style={{ color: '#000000' }}>Finestre e porte-balcone a una, due, tre o quattro ante; porte e portoncini d’ingresso; vetrate e vetrine; vasistas; serramenti a monoblocco</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>CERTIFICAZIONI:</h4>
                <p style={{ color: '#000000' }}>Trasmittanza termica Uf = 1,9 W/(m2 K)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#A18D65' }}>
            <div className="relative w-full h-48 md:h-64 overflow-hidden">
              <Image
                src="/images/infissi-pvc.jpg"
                alt="Infissi in PVC"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-left w-full">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Infissi in PVC</h3>
              <p style={{ color: '#000000' }} className="text-sm font-semibold mb-2 text-white">Soluzioni economiche e performanti per un isolamento ottimale.</p>
              <div className="text-sm space-y-2">
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>NUMERO DI CAMERE:</h4>
                <p style={{ color: '#000000' }}>7</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>UF:</h4>
                <p style={{ color: '#000000' }}>1,0 W/m2K</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>ABBATTIMENTO ACUSTICO:</h4>
                <p style={{ color: '#000000' }}>Fino a 64 dB</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>PERMEABILITA' DELL'ARIA:</h4>
                <p style={{ color: '#000000' }}>Fino a C4</p>
                <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>RESISTENZA ALLA PIOGGIA BATTENTE:</h4>
                <p style={{ color: '#000000' }}>Fino a 9A</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi + ModuloContatti Affiancati */}
      <section className="bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 gap-y-12 px-2 sm:px-6">
          {/* Servizi Section */}
          <div className="md:w-1/2">
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }} className="text-2xl font-bold mb-6 text-white text-center md:text-left">I Nostri Servizi</h2>
            <ul style={{ fontSize: "1.4rem" }} className="text-base list-disc list-inside space-y-3 text-gray-300">
              <li>Sopralluogo e rilievo misure</li>
              <li>Progettazione personalizzata</li>
              <li>Consulenza energetica</li>
              <li>Preventivi dettagliati</li>
              <li>Gestione pratiche burocratiche</li>
              <li>Finanziamenti personalizzati</li>
              <li>Vendita e consulenza personalizzata</li>
              <li>Installazione professionale con garanzia</li>
              <li>Assistenza post-vendita</li>
              <li>Smaltimento infissi usati</li>
              <li>Manutenzione programmata</li>
              <li>Riparazioni e sostituzioni</li>
              <li>Installazione di sistemi di domotica</li>
            </ul>
          </div>


          {/* Colonna Modulo Contatti */}
          <div className="md:w-1/2">
            <h2 style={{ fontSize: "1.4rem" }} className="text-3xl font-bold text-center mb-6 text-white">Richiedi un Preventivo Gratuito</h2>
            <ModuloContatti destinatarioEmail="infissi@faccio-tutto.it" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center">
        <p className="text-gray-400">&copy; 2025 faccio-tutto.it | Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}

export default InfissiPage;
