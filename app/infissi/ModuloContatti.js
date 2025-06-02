"use client";
import React, { useState } from 'react';

function ModuloContatti({ destinatarioEmail }) {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [via, setVia] = useState('');
  const [città, setCittà] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [privacy, setPrivacy] = useState(false);
  // Modificato: array di oggetti { width, height }
  const [dimensioni, setDimensioni] = useState(Array(10).fill({ width: '', height: '' }));
  const [materiale, setMateriale] = useState('Seleziona un materiale'); // Materiale desiderato
  const [colore, setColore] = useState('Seleziona un colore'); // Colore desiderato
  const [accessori, setAccessori] = useState('Seleziona un accessorio'); // Accessori desiderati
  const [invioStato, setInvioStato] = useState(null); // Stato dell'invio: null, 'inviando', 'successo', 'errore'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!privacy) {
      setInvioStato('errore');
      alert('Devi accettare i termini e le condizioni sulla privacy.');
      return;
    }
    if (!nome || !cognome || !email) {
      setInvioStato('errore');
      alert('Nome, cognome ed email sono obbligatori.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvioStio('errore');
      alert('Email non valida.');
      return;
    }

    // Modificato: controllo per almeno una dimensione inserita
    const almenoUnaDimensioneInserita = dimensioni.some(d => d.width.trim() !== '' || d.height.trim() !== '');
    if (!almenoUnaDimensioneInserita) {
      setInvioStato('errore');
      alert('Inserisci almeno una dimensione per i serramenti.');
      return;
    }

    setInvioStato('inviando');

    const formDataToSend = {
      nome,
      cognome,
      email,
      telefono,
      via,
      città,
      messaggio,
      // Modificato: Mappa le dimensioni nel formato "larghezza x altezza" e filtra i vuoti
      dimensioni: dimensioni
        .map(d => {
          const width = d.width.trim();
          const height = d.height.trim();
          return (width || height) ? `${width}x${height}` : ''; // Includi solo se width o height sono presenti
        })
        .filter(s => s !== ''), // Rimuovi le stringhe completamente vuote
      materiale,
      colore,
      accessori,
      destinatarioEmail: destinatarioEmail,
      tipoUtente: 'privato',
    };

    try {
      const response = await fetch("/api/invia-email-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setInvioStato('successo');
        alert('La tua richiesta è stata inviata con successo!');
        // Resetta il form
        setNome('');
        setCognome('');
        setEmail('');
        setTelefono('');
        setVia('');
        setCittà('');
        setMessaggio('');
        setPrivacy(false);
        setDimensioni(Array(10).fill({ width: '', height: '' })); // Resetta le dimensioni
        setMateriale('Seleziona un materiale');
        setColore('Seleziona un colore');
        setAccessori('Seleziona un accessorio');
      } else {
        setInvioStato('errore');
        alert('Si è verificato un errore durante l\'invio della richiesta. Riprova più tardi.');
        console.error('Errore nell\'invio:', response);
      }
    } catch (error) {
      setInvioStato('errore');
      alert('Si è verificato un errore durante l\'invio della richiesta. Riprova più tardi.');
      console.error('Errore durante la fetch:', error);
    } finally {
      // Puoi rimuovere questo se non vuoi resettare lo stato di invio
      // setTimeout(() => setInvioStato(null), 5000);
    }
  };

  // Modificato: riceve index, type (width/height), value
  const handleDimensioniChange = (index, type, value) => {
    const newDimensioni = [...dimensioni];
    newDimensioni[index] = {
      ...newDimensioni[index],
      [type]: value,
    };
    setDimensioni(newDimensioni);
  };

  // Funzione non più necessaria, può essere rimossa
  // const getDimValue = (dimString, type) => {
  //   const parts = dimString.split('x');
  //   if (type === 'width') {
  //     return parts[0] || '';
  //   } else if (type === 'height') {
  //     return parts[1] || '';
  //   }
  //   return '';
  // };

  return (
    <section id="modulo-contatti" className="mx-auto max-w-7xl px-0">
      <div className="flex flex-col items-center justify-center">
        <div className="md:w-full p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#1A1A1A' }}>
          <h3 style={{ fontSize: "1.2rem" }} className="text-2xl font-semibold mb-6 text-center text-white">Compila tutti i campi</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="dimensioni" className="block text-sm font-medium mb-2 text-gray-300">
                Dimensioni serramenti
              </label>
              <div className="grid grid-cols-1 gap-4 mb-0">
                {dimensioni.map((dimensione, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-2">
                    <label className="text-sm font-medium text-gray-400 w-full sm:w-auto">
                      Serramento {index + 1}:
                    </label>
                    <input
                      type="text"
                      placeholder="Larghezza (cm)"
                      value={dimensione.width} // Accedi direttamente
                      onChange={(e) => handleDimensioniChange(index, 'width', e.target.value)} // Passa 'width'
                      className="w-full sm:w-[calc(50%-0.5rem)] p-2 border rounded bg-gray-700 text-white placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Altezza (cm)"
                      value={dimensione.height} // Accedi direttamente
                      onChange={(e) => handleDimensioniChange(index, 'height', e.target.value)} // Passa 'height'
                      className="w-full sm:w-[calc(50%-0.5rem)] p-2 border rounded bg-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="colore" className="block text-sm font-medium mb-2 text-gray-300">
                Colore
              </label>
              <select
                id="colore"
                value={colore}
                onChange={(e) => setColore(e.target.value)}
                className="p-3 border rounded bg-gray-700 w-full text-white"
              >
                <option value="">Seleziona un colore</option>
                <option value="legno">Legno</option>
                <option value="ral">Ral</option>
              </select>
            </div>
            <div>
              <label htmlFor="materiale" className="block text-sm font-medium mb-2 text-gray-300">
                Materiale
              </label>
              <select
                id="materiale"
                value={materiale}
                onChange={(e) => setMateriale(e.target.value)}
                className="p-3 border rounded bg-gray-700 w-full text-white"
              >
                <option value="">Seleziona un materiale</option>
                <option value="alluminio">Alluminio</option>
                <option value="pvc">PVC</option>
              </select>
            </div>
            <div>
              <label htmlFor="accessori" className="block text-sm font-medium mb-2 text-gray-300">
                Accessori
              </label>
              <select
                id="accessori"
                value={accessori}
                onChange={(e) => setAccessori(e.target.value)}
                className="p-3 border rounded bg-gray-700 w-full text-white"
              >
                <option value="">Seleziona un accessorio</option>
                <option value="persiana">Persiana in alluminio</option>
                <option value="tapparella">Tapparella in alluminio</option>
                <option value="tapparella motorizzata">Tapparella motorizzata in alluminio</option>
              </select>
            </div>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-2 text-gray-300">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="p-2 border rounded bg-gray-700 w-full text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="cognome" className="block text-sm font-medium mb-2 text-gray-300">
                Cognome
              </label>
              <input
                type="text"
                id="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                className="p-2 border rounded bg-gray-700 w-full text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Indirizzo e-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded bg-gray-700 w-full text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium mb-2 text-gray-300">
                Telefono
              </label>
              <input
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="p-2 border rounded bg-gray-700 w-full text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="via" className="block text-sm font-medium mb-2 text-gray-300">
                Via
              </label>
              <input
                type="text"
                id="via"
                value={via}
                onChange={(e) => setVia(e.target.value)}
                className="p-2 border rounded bg-gray-700 w-full text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="città" className="block text-sm font-medium mb-2 text-gray-300">
                Città
              </label>
              <input
                type="text"
                id="città"
                value={città}
                onChange={(e) => setCittà(e.target.value)}
                className="p-2 border rounded bg-gray-700 w-full text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="messaggio" className="block text-sm font-medium mb-2 text-gray-300">
                Messaggio (opzionale)
              </label>
              <textarea
                id="messaggio"
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                rows={4}
                className="p-2 border rounded bg-gray-700 w-full text-white placeholder:text-gray-400"
              ></textarea>
            </div>
            {/* Modifiche per la privacy e il pulsante, già implementate */}
            <div className="items-start"> {/* Aggiunto 'flex' qui per allineare checkbox e label */}
              <input
                type="checkbox"
                className="mr-2 mt-1"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
              />
              <label className="text-sm text-gray-400 flex-1 leading-tight">
                Accetto i{' '}
                <a href="/termini-e-condizioni.pdf" className="text-blue-400 hover:underline">
                  termini e condizioni
                </a>{' '}
                e acconsento al trattamento dei miei dati personali secondo la{' '}
                <a href="/normativa-privacy.pdf" className="text-blue-400 hover:underline">
                  normativa sulla privacy.
                </a>
              </label>
            </div>
            {/* Contenitore per centrare il pulsante */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs mt-4"
              >
                Richiedi Preventivo
              </button>
            </div>
            {invioStato === 'inviando' && <p className="text-yellow-500 text-center mt-2">Invio in corso...</p>}
            {invioStato === 'successo' && <p className="text-green-500 text-center mt-2">Richiesta inviata con successo!</p>}
            {invioStato === 'errore' && <p className="text-red-500 text-center mt-2">Errore durante l'invio. Riprova.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ModuloContatti;