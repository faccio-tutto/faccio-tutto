"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function ChisiamoPage() {
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

      {/* Chisiamo Section */}
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Chi siamo</h1>
        <div className="max-w-5xl text-justify mb-8 bg-black bg-opacity-70 p-6 rounded-lg">
        <p className="chisiamo-text">
          Siamo un'azienda che crede nel valore delle persone, al di là delle competenze lavorative ognuno di noi ha delle capacità, delle abilità, delle attitudini che esprime magari solo a casa propria o le mette a disposizione di pochi conoscenti, adesso, invece, questo "talento" può essere espresso su larga scala e riconosciuto sempre da più persone grazie ai feedback ricevuti. 
          Ogni individuo possiede un bagaglio unico di capacità, passioni e attitudini che spesso rimangono inespresse nel contesto lavorativo tradizionale. 
          Noi crediamo nel valore delle persone e riconosciamo che il potenziale umano non si limita alle competenze tecniche richieste dal ruolo, infatti adottiamo una visione olistica, che abbraccia la totalità dell'individuo, con le sue peculiarità e i suoi talenti. 
          La valorizzazione del potenziale inespresso non è solo un atto di responsabilità sociale, ma anche una strategia aziendale vincente. 
          Quando le persone hanno l'opportunità di esprimere i propri talenti, si sentono più motivate, coinvolte e realizzate, questo si traduce in un aumento della produttività, della creatività e dell'innovazione. 
          Grazie alla nostra piattaforma i talenti individuali possono essere esposti a un pubblico molto più ampio rispetto al passato ciò permette di ottenere feedback e riconoscimenti da persone diverse, che possono apprezzare e valorizzare le abilità specifiche di ciascuno, i feedback positivi e il riconoscimento pubblico rafforzano l'autostima e la motivazione, incoraggiando le persone a sviluppare ulteriormente i propri talenti. 
          Inoltre, i feedback costruttivi possono fornire spunti preziosi per migliorare e affinare le proprie abilità. La condivisione dei talenti e dei feedback favorisce la creazione di comunità di persone con interessi simili, che possono scambiarsi idee, collaborare e sostenersi a vicenda. 
          Vogliamo valorizzare il potenziale inespresso e creare un nuovo modo di lavorare inclusivo e stimolante, dove le persone si sentono libere di esprimere la propria creatività e di mettere in gioco le proprie abilità; valorizzare il potenziale inespresso delle persone è un investimento strategico che porta benefici sia ai singoli che alla nostra azienda nel suo complesso.
        </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="text-center">
            <Image src="/images/hobby.jpg" width={300} height={200} alt="hobby button" className="rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Coltiva i tuoi hobbies</h2>
          </div>
          <div className="text-center">
            <Image src="/images/aspirapolvere riparazione.jpg" width={300} height={200} alt="aspirapolvere riparazione button" className="rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Metti a disposizione le tue competenze</h2>
          </div>
          <div className="text-center">
            <Image src="/images/stretta mano.jpg" width={300} height={200} alt="stretta mano button" className="rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Ricevi dei feedback</h2>
          </div>
        </div>
        {/* Pulsante spostato più in basso con margine superiore */}
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-16">
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