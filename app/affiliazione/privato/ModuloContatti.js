"use client";
import React, { useState, useRef } from 'react';

function ModuloContatti({ destinatarioEmail }) {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [via, setVia] = useState('');
  const [citta, setCitta] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // Aggiungi uno stato per gestire gli errori
  const [documentoIdentita, setDocumentoIdentita] = useState(null); // Inizializzato a null
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validazioni
     if (!privacy) {
      setError('Devi accettare i termini e le condizioni sulla privacy.');
      return;
    }
    if (!nome || !cognome || !email) {
      setError('Nome, cognome ed email sono obbligatori.');
      alert('Nome, cognome ed email sono obbligatori.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email non valida.');
      alert('Email non valida.');
      return;
    }
     setError(null);

     if (fileInputRef.current) fileInputRef.current.value = null;

    // Costruisci il body della richiesta
  const formData = new FormData();
  formData.append('tipoUtente', 'privato');
  formData.append('nome', nome);
  formData.append('cognome', cognome);
  formData.append('email', email);
  formData.append('telefono', telefono);
  formData.append('via', via);
  formData.append('citta', citta);
  formData.append('messaggio', messaggio);
  formData.append('destinatarioEmail', destinatarioEmail); // lo passi dal componente

if (documentoIdentita) formData.append('documentoIdentita', documentoIdentita);



try {
  const res = await fetch('/api/invia-email-formidable', {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    setSuccess(true);
    setNome('');
setCognome('');
setEmail('');
setTelefono('');
setVia('');
setCitta('');
setMessaggio('');
setPrivacy(false);
setDocumentoIdentita(null);
  } else {
    let errorMsg = 'Errore nell\'invio del modulo.';
    try {
      const err = await res.json();
      errorMsg = err?.error || errorMsg;
    } catch {
      // Fallimento nel parsing JSON, uso messaggio generico
    }
    console.error("Errore:", errorMsg);
    alert(errorMsg);
  }
} catch (error) {
  console.error("Errore di rete:", error);
  alert("Errore di rete. Riprova.");
}
};
const handleDocumentoChange = (e) => {
  const file = e.target.files?.[0] || null;
  setDocumentoIdentita(file);
}

  return (
    <div id="modulo-contatti" className="flex justify-center items-start px-4 py-12 bg-white min-h-screen w-full">
      {success ? (
        <div className="text-green-500 justify-center font-bold text-xl">Messaggio inviato con successo!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div className="flex flex-col space-y-4 p-4 rounded-lg shadow-lg w-full max-w-md bg-white">
            <h2 className="text-2xl font-bold text-center text-gray-800">Modulo di Contatto</h2>
            <p className="text-sm text-gray-500 text-center"></p>
            {error && <div className="text-red-500">{error}</div>}
            <div>
              <label htmlFor="nome" className="block text-sm text-left font-medium text-gray-600">Nome</label>
              <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" required />
            </div>
            <div>
              <label htmlFor="cognome" className="block text-sm text-left font-medium text-gray-600">Cognome</label>
              <input type="text" id="cognome" name="cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-left font-medium text-gray-600">Indirizzo e-mail</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" required />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm text-left font-medium text-gray-600">Telefono</label>
              <input type="tel" id="telefono" name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" />
            </div>
            <div>
              <label htmlFor="via" className="block text-sm text-left font-medium text-gray-600">Via</label>
              <input type="text" id="via" name="via" value={via} onChange={(e) => setVia(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" />
            </div>
           <div>
              <label htmlFor="citta" className="block text-sm text-left font-medium text-gray-600">Città</label>
<input type="text" id="citta" name="citta" value={citta} onChange={(e) => setCitta(e.target.value)} className="mt-1 p-3 border rounded-md w-full text-black" />
            </div>
            <div>
              <label className="block text-sm text-left font-medium text-gray-600 mb-1 sm:mt-0">Documento d'identità</label>
              <div className="flex flex-col items-start">
              <input
              ref={fileInputRef}
                type="file"
                id="documentoIdentita"
                name="documentoIdentita"
                accept="image/*,.pdf"
                onChange={handleDocumentoChange}
                className="hidden"
              />
              <label
                htmlFor="documentoIdentita"
                className="inline-block bg-green-600 text-white font-semibold px-3 py-1 text-xs rounded cursor-pointer hover:bg-green-700 mb-4"
              >
                Carica Documento
              </label>
             {documentoIdentita && (
  <a
    href={URL.createObjectURL(documentoIdentita)}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-blue-500 underline mt-1"
  >
    Visualizza documento
  </a>
)}
            </div>
            </div>

            <div>
              <label htmlFor="messaggio" className="block text-sm text-left font-medium text-gray-600 -mb-4">Messaggio</label>
              <br/>
              <span className="text-gray-500 text-sm text-left block -mb-1">
                (descrivi brevemente cosa sai fare e per quale tipologia di lavori vorresti essere contattato)
            </span>
            <div className="text-black flex flex-col items-start"></div>
            <textarea id="messaggio" name="messaggio" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} rows={4} className="mt-1 p-3 border rounded-md w-full text-black"></textarea>
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
                         >{error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                           Invia richiesta
                         </button>
                       </div>
                     </form>
                   )}
                 </div>
               );
             }
             
             export default ModuloContatti;
             export { ModuloContatti };
             