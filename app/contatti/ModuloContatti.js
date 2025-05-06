"use client";
import React, { useState } from "react";

function ModuloContatti({ destinatarioEmail }) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [via, setVia] = useState("");
  const [città, setCittà] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [success, setSuccess] = useState(false);

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
      setInvioStato('errore');
      alert('Email non valida.');
      return;
    }

    // Costruisci il body della richiesta
  const body = {
    nome,
    cognome,
    email,
    telefono,
    via,
    città,
    messaggio,
    destinatarioEmail // lo passi dal componente ModuloContatti
  };

  try {
    const res = await fetch('/api/invia-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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
    <div id="modulo-contatti" className="mx-auto max-w-7xl px-4">
      {success ? (
        <div className="text-green-500 font-bold text-xl">Messaggio inviato con successo!</div>
      ) : (
        <form onSubmit={handleSubmit} className="-mt-4">
          <div className="grid gap-3">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-600">Nome</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 p-3 border rounded-md w-full" required />
            </div>
            <div>
              <label htmlFor="cognome" className="block text-sm font-medium text-gray-600">Cognome</label>
              <input type="text" id="cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} className="mt-1 p-3 border rounded-md w-full" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Indirizzo e-mail</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-3 border rounded-md w-full" required />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-600">Telefono</label>
              <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="mt-1 p-3 border rounded-md w-full" />
            </div>
            <div>
              <label htmlFor="via" className="block text-sm font-medium text-gray-600">Via</label>
              <input type="text" id="via" value={via} onChange={(e) => setVia(e.target.value)} className="mt-1 p-3 border rounded-md w-full" />
            </div>
            <div>
              <label htmlFor="città" className="block text-sm font-medium text-gray-600">Città</label>
              <input type="text" id="città" value={città} onChange={(e) => setCittà(e.target.value)} className="mt-1 p-3 border rounded-md w-full" />
            </div>
            <div>
              <label htmlFor="messaggio" className="block text-sm font-medium text-gray-600">Messaggio</label>
              <textarea id="messaggio" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} rows={4} className="mt-1 p-3 border rounded-md w-full"></textarea>
              </div>
          <div className="flex items-center">
  <input type="checkbox" className="mr-2" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
  <label className="text-sm text-gray-400 whitespace-nowrap">
  Accetto i <a href="/termini e condizioni.pdf" className="text-blue-500">termini e condizioni</a> e acconsento al trattamento 
  <br/>dei miei dati personali secondo la <a href="/normativa privacy.pdf" className="text-blue-500">normativa sulla privacy.</a>
  </label>
</div>
            <button
              type="submit"
              style={{ padding: "12px 16px" }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl"
            >
              Invia la richiesta
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModuloContatti;