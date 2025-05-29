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
  const [success, setSuccess] = useState(false);
  const [invioStato, setInvioStato] = useState(''); // Stato per gestire lo stato di invio

  const handleSubmit = async (e) => {
  e.preventDefault();
  setInvioStato('inviando');

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
    setInvioStato('errore');
    alert('Email non valida.');
    return;
  }

  // ✅ Usa FormData invece di JSON
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('cognome', cognome);
  formData.append('email', email);
  formData.append('telefono', telefono);
  formData.append('via', via);
  formData.append('città', città);
  formData.append('messaggio', messaggio);
  formData.append('destinatarioEmail', destinatarioEmail);
  formData.append('tipoUtente', 'privato'); // ⚠️ Necessario

  try {
    const res = await fetch(`${window.location.origin}/api/invia-email-formdata`, {
      method: 'POST',
      body: formData, // ✅ niente header manuale qui!
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
};

  return (
   <div id="modulo-contatti" className="w-full py-8 bg-black">
      {/* This is the main content container for the form (or success message).
          It takes responsive horizontal padding, a max-width, and CENTERS ITSELF. */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        {success ? (
          // Success message: centered using `w-full max-w-md mx-auto`
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto" role="alert">
            <p className="font-bold text-center text-xl">Messaggio inviato con successo!</p>
            <p className="text-center">Ti risponderemo il prima possibile.</p>
          </div>
        ) : (
          // THE FORM: It has `w-full`, `max-w-md`, and `mx-auto` to center itself
          // within its parent container (`max-w-screen-lg mx-auto`).
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            {/* If you removed the h2, you can keep it removed. Otherwise, restore it. */}
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Richiedi un preventivo</h2> */}
            <div>
              {/* Form fields */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" required />
              </div>
              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-gray-700">Cognome</label>
                <input type="text" id="cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Indirizzo e-mail</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" required />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Telefono</label>
                <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
              </div>
              <div>
                <label htmlFor="via" className="block text-sm font-medium text-gray-700">Via</label>
                <input type="text" id="via" value={via} onChange={(e) => setVia(e.target.value)} className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
              </div>
              <div>
                <label htmlFor="città" className="block text-sm font-medium text-gray-700">Città</label>
                <input type="text" id="città" value={città} onChange={(e) => setCittà(e.target.value)} className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
              </div>
              <div>
                <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700">Messaggio</label>
                <textarea id="messaggio" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} rows={4} className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"></textarea>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded mr-3"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label htmlFor="privacy" className="font-medium text-gray-700">
                    Accetto i{' '}
                    <a href="/termini e condizioni.pdf" className="text-blue-500 hover:underline">termini e condizioni</a>{' '}
                    e acconsento al trattamento
                    dei miei dati personali secondo la{' '}
                    <a href="/normativa privacy.pdf" className="text-blue-500 hover:underline">normativa sulla privacy.</a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
                disabled={invioStato === 'inviando'}
              >
                {invioStato === 'inviando' ? 'Invio...' : 'Richiedi Preventivo'}
              </button>
              {invioStato === 'errore' && (
                <p className="text-red-500 text-center mt-2">Si è verificato un errore. Riprova.</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModuloContatti;