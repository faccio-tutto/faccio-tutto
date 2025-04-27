"use client";
import React, { useState } from 'react';
import Image from "next/image";

export default function InfissiPage() {
  const [dimensioni, setDimensioni] = useState(Array(10).fill(''));
  const [materiale, setMateriale] = useState('alluminio');
  const [accessorio, setAccessorio] = useState('persiana');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [via, setVia] = useState('');
  const [città, setCittà] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!privacy) {
      alert("Devi accettare la privacy policy per continuare.");
      return;
    }
    console.log({ dimensioni, materiale, accessorio, nome, cognome, email, telefono, via, città, privacy });
    // Aggiungi qui la logica per inviare i dati del form
  };

  const handleDimensioniChange = (index, value) => {
    const newDimensioni = [...dimensioni];
    newDimensioni[index] = value;
    setDimensioni(newDimensioni);
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/prodotti.png" // Sostituisci con l'immagine hero
          alt="Infissi di alta qualità"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute z-10 text-center">
          <h2 style={{ fontSize: "2.4rem", fontWeight: "bold", marginBottom: "2.0rem", color: "#8B4513" }}>Infissi di Alta Qualità</h2>
          <p style={{ fontSize: "1.9rem", fontWeight: "bold", marginBottom: "2.0rem", color: "#FFFFFF" }}>Soluzioni su misura per la tua casa</p>
        </div>
      </section>

      {/* Cosa Offriamo Section */}
      <section className="py-16 px-6 text-center">
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "2.5rem", color: "#8B4513" }}>Cosa Offriamo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Image
              src="/infissi-alluminio.jpg" // Sostituisci con l'immagine degli infissi in alluminio
              alt="Infissi in alluminio"
              width={600}
              height={400}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-4">Infissi in Alluminio a Taglio Termico</h3>
            <p className="text-lg font-semibold mb-0">Ampia varietà di infissi in alluminio con isolamento termico e design elegante.</p>
            <p className="text-lg text-justify text-white">
              <br />TIPO DI SISTEMA:
              <br />Giunto aperto camera europea
              <br />PROFILATI ESTRUSI:
              <br />Lega d’alluminio 6060 Al Mg 0.5, Si 0.4, Fe 0.2 secondo le norme UNI EN 573
              <br />STATO DI FORNITURA:
              <br />T5 secondo la norma UNI EN 515
              <br />TOLLERANZE DIMENSIONALI E SPESSORI:
              <br />UNI EN 12020-2
              <br />TIPO DI TENUTA ARIA-ACQUA:
              <br />Soluzione a sormonto con guarnizione centrale e guarnizione ad isolamento acustico sulla battuta interna
              <br />ASSEMBLAGGIO DI PROFILI A TAGLIO TERMICO:
              <br />Accoppiamento realizzato mediante l’inserimento di listelli in poliammide rinforzata con fibre di vetro di lunghezza 28 mm, bloccati mediante rullatura in continuo
              <br />DIMENSIONI DEL SISTEMA:
              <br />Telaio fisso profondità 64 mm
              <br />Telaio mobile profondità 72 mm
              <br />Sovrapposizione tra profilati soluzione a sormonto interna ed esterna 8 mm
              <br />IMPIEGO:
              <br />Finestre e porte-balcone a una, due, tre o quattro ante; porte e portoncini d’ingresso; vetrate e vetrine; vasistas; serramenti a monoblocco
              <br />CERTIFICAZIONI:
              <br />Trasmittanza termica Uf = 1,9 W/(m2 K)
            </p>
          </div>
          <div>
            <Image
              src="/infissi-pvc.jpg" // Sostituisci con l'immagine degli infissi in PVC
              alt="Infissi in PVC"
              width={600}
              height={400}
              className="rounded-lg -mb-60"
            />
            <h3 className="text-2xl font-semibold mb-2">Infissi in PVC</h3>
            <p className="text-lg font-semibold mb-2">Soluzioni economiche e performanti per un isolamento ottimale.</p>
            <div className="text-lg text-gray-300 space-y-2">
              <p className="text-justify">
                <br />NUMERO DI CAMERE:
                <br />7
                <br />UF:
                <br />1,0 W/m2K
                <br />ABBATTIMENTO ACUSTICO:
                <br />Fino a 64 dB
                <br />PERMEABILITA' DELL'ARIA:
                <br />Fino a C4
                <br />RESISTENZA ALLA PIOGGIA BATTENTE:
                <br />Fino a 9A
              </p>
            </div>
          </div>
          <style jsx>{`
  .text-justify {
    text-align: justify;
  }
`}</style>
        </div>
      </section>

      {/* Servizi Section */}
      <section className="bg-brown-800 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-center md:text-left mb-8">I Nostri Servizi</h2>
            <ul className="text-lg list-disc list-inside space-y-4">
              <li>Sopralluogo e rilievo misure</li>
              <li>Progettazione Personalizzata</li>
              <li>Consulenza Energetica</li>
              <li>Preventivi Dettagliati</li>
              <li>Gestione Pratiche Burocratiche</li>
              <li>Finanziamenti Personalizzati</li>
              <li>Vendita e consulenza personalizzata</li>
              <li>Installazione professionale con garanzia</li>
              <li>Assistenza post-vendita</li>
              <li>Smaltimento Infissi Usati</li>
              <li>Manutenzione Programmata</li>
              <li>Riparazioni e Sostituzioni</li>
              <li>Installazione di Sistemi di Domotica</li>
            </ul>
          </div>
          <div className="md:w-2/2 p-0 bg-brown rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-center">Compila tutti i campi</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="dimensioni" className="block text-sm font-medium mb-2">
                  Dimensioni serramenti (Larghezza x Altezza)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dimensioni.map((dimensione, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder="cm."
                      value={dimensione}
                      onChange={(e) => handleDimensioniChange(index, e.target.value)}
                      className="p-2 border rounded bg-gray-700"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="accessorio" className="block text-sm font-medium mb-2">Accessori</label>
                <select id="accessorio" value={accessorio} onChange={(e) => setAccessorio(e.target.value)} className="p-2 border rounded bg-gray-700 w-full">
                  <option value="persiana">Persiana</option>
                  <option value="tapparella">Tapparella</option>
                </select>
              </div>
              <div>
                <label htmlFor="materiale" className="block text-sm font-medium mb-2">Materiale</label>
                <select id="materiale" value={materiale} onChange={(e) => setMateriale(e.target.value)} className="p-2 border rounded bg-gray-700 w-full">
                  <option value="alluminio">Alluminio</option>
                  <option value="pvc">PVC</option>
                </select>
              </div>
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">Nome</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="p-2 border rounded bg-gray-700 w-full" required />
              </div>
              <div>
                <label htmlFor="cognome" className="block text-sm font-medium mb-2">Cognome</label>
                <input type="text" id="cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} className="p-2 border rounded bg-gray-700 w-full" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Indirizzo e-mail</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded bg-gray-700 w-full" required />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium mb-2">Telefono</label>
                <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="p-2 border rounded bg-gray-700 w-full" />
              </div>
              <div>
                <label htmlFor="via" className="block text-sm font-medium mb-2">Via</label>
                <input type="text" id="via" value={via} onChange={(e) => setVia(e.target.value)} className="p-2 border rounded bg-gray-700 w-full" />
              </div>
              <div>
                <label htmlFor="città" className="block text-sm font-medium mb-2">Città</label>
                <input type="text" id="città" value={città} onChange={(e) => setCittà(e.target.value)} className="p-2 border rounded bg-gray-700 w-full" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
                <label className="text-sm text-gray-400">
                  Acconsento al trattamento dei miei dati personali secondo la normativa sulla privacy.
                </label>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
                Richiedi Preventivo
              </button>
            </form>
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