import React, { useState } from 'react';

const ModuloContatti = () => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [via, setVia] = useState('');
  const [città, setCittà] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui puoi aggiungere la logica per inviare i dati del modulo
    console.log({ nome, email, telefono, indirizzo, messaggio, privacy });
  };

  return (
    <div id="modulo-contatti" className="mx-auto max-w-5xl"> {/* Aggiungi id="modulo-contatti" */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-600">Nome</label>
            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div>
            <label htmlFor="cognome" className="block text-sm font-medium text-gray-600">Cognome</label>
            <input type="text" id="cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Indirizzo e-mail</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-600">Telefono</label>
            <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div>
            <label htmlFor="via" className="block text-sm font-medium text-gray-600">Via</label>
            <input type="text" id="via" value={via} onChange={(e) => setVia(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div>
            <label htmlFor="città" className="block text-sm font-medium text-gray-600">Città</label>
            <input type="text" id="città" value={città} onChange={(e) => setCittà(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="messaggio" className="block text-sm font-medium text-gray-600">Messaggio</label>
            <textarea id="messaggio" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} rows="4" className="mt-1 p-2 border rounded-md w-full"></textarea>
          </div>
        </div>
        <div className="mt-75">
          <label className="inline-flex items-center">
            <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="form-checkbox" required />
            <span className="ml-2 text-sm text-white text-justify">Ho letto l'informativa privacy e acconsento alla memorizzazione dei miei dati nel vostro archivio secondo quanto stabilito dal regolamento europeo per la protezione dei dati personali n. 679/2016, GDPR.</span>
          </label>
        </div>
        <div className="mt-2">
          <button type="submit" className="bg-blue-400 text-black p-2 rounded-md hover:bg-yellow-500">Invia la Richiesta</button>
        </div>
      </form>
    </div>
  );
};

export default ModuloContatti;