"use client";
import React, { useState } from 'react';


function ModuloContatti({ destinatarioEmail }) {
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [via, setVia] = useState('');
  const [città, setCittà] = useState('');
  const [documento, setDocumento] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // Aggiungi uno stato per gestire gli errori
  // Nuovi stati per i campi aggiuntivi
  const [nomeAzienda, setNomeAzienda] = useState('');
  const [partitaIva, setPartitaIva] = useState('');
  const [legaleRappresentante, setLegaleRappresentante] = useState('');
  const [sitoWeb, setSitoWeb] = useState('');
  const [visuraCamerale, setVisuraCamerale] = useState('');
  const [documentoIdentita, setDocumentoIdentita] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validazioni
    if (!privacy) {
      setError('Devi accettare i termini e le condizioni sulla privacy.');
      return;
    }
    if (!email) { // Modificato: Nome e Cognome non sono più obbligatori
      setError('L\'email è obbligatoria.');
      return;
    }
     if (!nomeAzienda || !partitaIva || !legaleRappresentante) {
      setError('Nome Azienda, Partita IVA, e Legale Rappresentante sono obbligatori.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email non valida.');
      return;
    }
    setError(null); // Clear any previous errors.

    // Costruisci il body della richiesta
    const body = {
      email,
      telefono,
      via,
      città,
      documento,
      messaggio,
      destinatarioEmail, // lo passi dal componente ModuloContatti
      // Include i nuovi campi nel body
      nomeAzienda,
      partitaIva,
      legaleRappresentante,
      sitoWeb,
      visuraCamerale,
      documentoIdentita,
    };

    try {
      const res = await fetch(`${window.location.origin}/api/invia-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      const err = await res.json();
      console.error("Errore:", err.error);
      alert("Errore nell'invio del modulo: " + err.error);
    }
} catch (error) {
  console.error("Errore di rete:", error);
  alert("Errore di rete. Riprova.");
}
}; // Closing brace for handleSubmit

return (
  <div id="modulo-contatti" className="flex justify-center items-start px-4 py-12 w-full">
    {success ? (
      <div className="text-green-500 font-bold text-xl">Messaggio inviato con successo!</div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div className="space-y-4 p-4 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-800">Modulo di Contatto</h2>
          <p className="text-sm text-gray-500 text-center"></p>
          {error && <div className="text-red-500">{error}</div>}

          {/* Campi aggiuntivi */}
          <div>
            <label htmlFor="nomeAzienda" className="block text-sm text-left font-medium text-gray-600">Nome Azienda</label>
            <input type="text" id="nomeAzienda" value={nomeAzienda} onChange={(e) => setNomeAzienda(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" required />
          </div>
          <div>
            <label htmlFor="partitaIva" className="block text-sm text-left font-medium text-gray-600">Partita IVA</label>
            <input type="text" id="partitaIva" value={partitaIva} onChange={(e) => setPartitaIva(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" required />
          </div>
          <div>
            <label htmlFor="legaleRappresentante" className="block text-sm text-left font-medium text-gray-600">Legale Rappresentante</label>
            <input type="text" id="legaleRappresentante" value={legaleRappresentante} onChange={(e) => setLegaleRappresentante(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-left font-medium text-gray-600">Indirizzo e-mail</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" required />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm text-left font-medium text-gray-600">Telefono</label>
            <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" />
          </div>

          <div>
            <label htmlFor="sitoWeb" className="block text-sm text-left font-medium text-gray-600">Sito web (opzionale)</label>
            <input type="text" id="sitoWeb" value={sitoWeb} onChange={(e) => setSitoWeb(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" />
          </div>
          <div>
            <label className="block text-sm text-left font-medium text-gray-600">Visura camerale</label>
            <div className="flex flex-col items-start">
              <input
                type="file"
                id="visuraCamerale"
                accept=".pdf"
                onChange={(e) => setVisuraCamerale(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label
                htmlFor="visuraCamerale"
                className="inline-block bg-green-600 text-white font-semibold px-3 py-1 rounded cursor-pointer hover:bg-green-700 text-xs"
              >
                Carica Visura Camerale
              </label>
              {visuraCamerale && <p className="text-sm text-gray-500 mt-1">File selezionato: {visuraCamerale.name}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm text-left font-medium text-gray-600">Documento d'identità legale rappresentante</label>
            <div className="flex flex-col items-start">
              <input
                type="file"
                id="documentoIdentita"
                accept="image/*,.pdf"
                onChange={(e) => setDocumentoIdentita(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label
                htmlFor="documentoIdentita"
                className="inline-block bg-green-600 text-white font-semibold px-3 py-1 rounded cursor-pointer hover:bg-green-700 text-xs"
              >
                Carica Documento
              </label>
              {documentoIdentita && <p className="text-sm text-gray-500 mt-1">File selezionato: {documentoIdentita.name}</p>}
            </div>
          </div>

          {/* Fine campi aggiuntivi */}

          <div>
            <label htmlFor="via" className="block text-sm text-left font-medium text-gray-600">Via</label>
            <input type="text" id="via" value={via} onChange={(e) => setVia(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" />
          </div>
          <div>
            <label htmlFor="città" className="block text-sm text-left font-medium text-gray-600">Città</label>
            <input type="text" id="città" value={città} onChange={(e) => setCittà(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" />
          </div>
          <div>
              <label htmlFor="messaggio" className="block text-sm text-left font-medium text-gray-600 -mb-4">Messaggio</label>
              <br/>
              <span className="text-gray-500 text-sm text-left block mb-1">
                (descrivi brevemente di cosa si occupa la tua azienda e per quale tipologia di lavori vorresti essere contattato)
              </span>
              <div className="text-black flex flex-col items-start"></div>
              <textarea id="messaggio" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} rows={4} className="mt-1 p-3 border rounded-md w-full text-black"></textarea>
            </div>
            <div className="flex items-center">

            <input
              type="checkbox"
              className="mr-3"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
            />
            <label className="text-sm text-gray-500 whitespace-nowrap">
              Accetto i{' '}
              <a href="/termini e condizioni.pdf" className="text-blue-500">termini e condizioni</a>{' '}
              e acconsento al trattamento
              <br />
              dei miei dati personali secondo la{' '}
              <a href="/normativa privacy.pdf" className="text-blue-500">normativa sulla privacy.</a>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
          >
            Invia richiesta
          </button>
        </div>
      </form>
    )}
  </div>
);
};

export default ModuloContatti;
export { ModuloContatti };