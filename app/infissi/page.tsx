"use client";
import React, { useState } from 'react';
import Image from "next/image";
import ModuloContatti from './ModuloContatti';
import { FaBuilding, FaDraftingCompass, FaDoorOpen, FaPlug, FaWrench, FaPhone, FaSolarPanel } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
const CustomCardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
    // Ho rimosso il padding diretto qui per gestirlo sulla CustomCard se necessario,
    // o per lasciarlo ereditare dal contenitore.
    <div className={`card-content ${className}`} {...props}>
        {children}
    </div>
);

// Definizione di CustomCard (copiato dalla HomePage, per consistenza)
type CardProps = React.HTMLAttributes<HTMLDivElement>;
const CustomCard: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        // Ho aggiunto bg-white e border border-gray-300 qui
        <div className={`rounded-lg shadow-md ${className}`} {...props}>
            {children}
        </div>
    );
};

const InfissiPage = () => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [via, setVia] = useState('');
  const [città, setCittà] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) {
      alert("Devi accettare la privacy policy per continuare.");
      return;
    }
    console.log({ nome, cognome, email, telefono, via, città, privacy });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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

      {/* Hero Section - SPOSTATA FUORI dal main per estendersi a tutta larghezza */}
      <section className="relative flex items-center justify-center py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 flex justify-center z-0">
          <Image
            src="/images/prodotti.webp"
            alt="Sfondo infissi"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
        <div className="relative z-20 px-4 sm:px-6 max-w-[1200px] w-full text-white mx-auto text-center">
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Infissi di alta qualità</h2>
          <div className="text-base sm:text-lg font-medium mb-6 text-gray-400">
            Soluzioni su misura per la tua casa
          </div>
          <div className="space-y-4 text-[1.125rem] sm:text-[1.25rem] leading-relaxed text-white text-justify">
            <p>
              Eleva il comfort e il valore della tua casa con i nostri infissi di alta qualità. Ogni soluzione è progettata su misura per integrarsi perfettamente con il tuo stile abitativo, garantendo un'estetica raffinata e prestazioni superiori nel tempo.

              La nostra attenzione ai dettagli si traduce nella scelta di materiali di primissima qualità, selezionati per la loro durabilità, efficienza energetica e resistenza agli agenti atmosferici. Dagli eleganti profili ai meccanismi di apertura fluidi e affidabili, ogni accessorio è pensato per offrirti funzionalità ottimali e una lunga durata.

              Affidati alla nostra posa in opera specializzata, eseguita da artigiani esperti che curano ogni dettaglio per assicurare una perfetta sigillatura e un'installazione impeccabile. La nostra manodopera qualificata garantisce non solo un risultato estetico eccellente, ma anche la massima performance in termini of isolamento termico e acustico, contribuendo a un significativo risparmio energetico e a un maggiore benessere abitativo.

              Scegliere i nostri infissi significa investire in un comfort duraturo, in una maggiore sicurezza per la tua casa e in un design che valorizza ogni ambiente. Trasforma la tua abitazione in uno spazio accogliente, efficiente e bello da vivere, grazie alla qualità senza compromessi dei nostri prodotti e alla professionalità del nostro team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area: Flex container per sidebar e il resto del contenuto */}
      <main className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 mt-10">
        {/* Colonna sinistra: pulsanti laterali (Sidebar) */}
        <aside className="hidden md:block sticky top-4 h-fit w-full md:w-1/4 lg:w-1/8 xl:w-1/6 z-10">
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg space-y-4 flex flex-col items-center">
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
                <Link href={service.link} key={service.id} className="block transform transition duration-300 hover:scale-105 w-full">
                    <CustomCard className="bg-white border border-gray-300 p-0"> {/* Aggiunto bg-white, border e p-0 qui */}
                        <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                            <div className="rounded-full p-3 shadow-md bg-white">
                                {service.icon}
                            </div>
                            <h3 className={`text-sm font-semibold mt-2 text-gray-800`}>{service.title}</h3>
                        </CustomCardContent>
                    </CustomCard>
                </Link>
            ))}
          </div>
        </aside>

        {/* Colonna principale del contenuto (il resto della pagina) */}
        <div className="flex-1">
          {/* Cosa Offriamo Section */}
          <section className="py-12 px-6 text-center">
            <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Cosa Offriamo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 max-w-6xl mx-auto">
              {/* Card Infissi Alluminio */}
              <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#A18D65' }}>
                <div className="relative w-full h-48 md:h-64 overflow-hidden">
                  <Image
                    src="/images/infissi-alluminio.jpg"
                    alt="Infissi in alluminio"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4 text-left w-full">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Infissi in alluminio a taglio termico</h3>
                  <p style={{ color: '#000000' }} className="text-sm font-semibold mb-2 text-white">Varietà di infissi in alluminio con isolamento termico e design elegante.</p>
                  <div className="text-sm space-y-2">
                    <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>TIPO DI SISTEMA:</h4>
                    <p style={{ color: '#000000' }}>Giunto aperto camera europea</p>
                    <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>PROFILATI ESTRUSSI:</h4>
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
              {/* Card Infissi PVC */}
              <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#A18D65' }}>
                <div className="relative w-full h-48 md:h-64 overflow-hidden">
                  <Image
                    src="/images/infissi-pvc.jpg"
                    alt="Infissi in PVC"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4 text-left w-full">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#8B4513" }}>Infissi in PVC</h3>
                  <p style={{ color: '#000000' }} className="text-sm font-semibold mb-2 text-white">Soluzioni economiche e performanti per un isolamento ottimale.</p>
                  <div className="text-sm space-y-2">
                    <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>NUMERO DI CAMERE:</h4>
                    <p style={{ color: '#000000' }}>7</p>
                    <h4 className="font-semibold mt-2" style={{ color: '#FFFFFF' }}>UF:</h4>
                    <p style={{color: '#000000'}}>1,0 W/m2K</p>
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
                <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#8B4513" }} className="text-2xl font-bold mb-6 text-center md:text-left">I Nostri Servizi</div>
                <ul style={{ fontSize: "1.3rem" }} className="text-base list-disc list-inside space-y-3 text-gray-300">
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
                <div style={{ fontSize: "1.4rem",  }} className="text-3xl font-bold text-center mb-6">Richiedi un Preventivo Gratuito</div>
                <ModuloContatti destinatarioEmail="infissi@faccio-tutto.it" />
              </div>
            </div>
          </section>
        </div>{/* Chiusura del div flex-1 del contenuto principale */}
      </main>{/* Chiusura del main che contiene sidebar e contenuto */}

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center">
        <p className="text-gray-400">&copy; 2025 faccio-tutto.it | Tutti i diritti riservati</p>
      </footer>
    </div>
  );
};

export default InfissiPage;