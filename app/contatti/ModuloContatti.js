"use client";
import React, { useState } from "react";

const ModuloContatti = ({ destinatarioEmail }) => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [via, setVia] = useState("");
  const [città, setCittà] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!privacy) {
      alert("È necessario accettare l'informativa sulla privacy per procedere.");
      return;
    }
    if (!nome.trim() || !cognome.trim() || !email.trim()) {
      alert("I campi Nome, Cognome e Indirizzo e-mail sono obbligatori.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Inserisci un indirizzo e-mail valido.");
      return;
    }

    setIsSubmitting(true);

    const body = {
      nome,
      cognome,
      email,
      telefono,
      via,
      città,
      messaggio,
      destinatarioEmail,
    };

    try {
      const res = await fetch("/api/invia-email-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      alert("Errore di rete. Si prega di riprovare.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-10 bg-black min-h-screen text-white font-sans antialiased">
      {success ? (
        <div className="text-center py-12 space-y-3">
          <h2 className="text-2xl font-light text-neutral-100">Richiesta Ricevuta</h2>
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Il nostro team ti contatterà al più presto.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Intestazione minimale */}
          <div className="space-y-2">
            <h2 className="text-xl font-light tracking-tight text-neutral-100">
              Richiedi informazioni sul sistema
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
              Inserisci i dati per una consulenza personalizzata
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nome */}
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold px-1">Nome</span>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-neutral-900/40 border border-neutral-800/80 focus:border-neutral-600 p-3 rounded-lg text-white text-sm focus:outline-none transition placeholder-neutral-700"
                  placeholder="Mario"
                  required
                />
              </label>

              {/* Cognome */}
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold px-1">Cognome</span>
                <input
                  type="text"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                  className="w-full bg-neutral-900/40 border border-neutral-800/80 focus:border-neutral-600 p-3 rounded-lg text-white text-sm focus:outline-none transition placeholder-neutral-700"
                  placeholder="Rossi"
                  required
                />
              </label>
            </div>

            {/* Email */}
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold px-1">Indirizzo e-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900/40 border border-neutral-800/80 focus:border-neutral-600 p-3 rounded-lg text-white text-sm focus:outline-none transition placeholder-neutral-700"
                placeholder="nome@esempio.com"
                required
              />
            </label>

            {/* Telefono */}
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold px-1">Telefono</span>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full bg-neutral-900/40 border border-neutral-800/80 focus:border-neutral-600 p-3 rounded-lg text-white text-sm focus:outline-none transition placeholder-neutral-700"
                placeholder="+39 333 1234567"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Via */}
              <label className="sm:col-span-2 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold px-1">Via / Piazza</span>
                <input
                  type="text"
                  value={via}
                  onChange={(e) => setVia(e.target.value)}
                  className="w-full bg-neutral-900/40 border border-neutral-800/80 focus:border-neutral-600 p-3 rounded-lg text-white text-sm focus:outline-none transition placeholder-neutral-700"
                  placeholder="Via Roma, 10"
                />
              </label>

              {/* Città */}
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold px-1">Città</span>
                <input
                  type="text"
                  value={città}
                  onChange={(e) => setCittà(e.target.value)}
                  className="w-full bg-neutral-900/40 border border-neutral-800/80 focus:border-neutral-600 p-3 rounded-lg text-white text-sm focus:outline-none transition placeholder-neutral-700"
                  placeholder="Milano"
                />
              </label>
            </div>

            {/* Messaggio */}
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold px-1">Note aggiuntive (Opzionale)</span>
              <textarea
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                rows={4}
                className="w-full bg-neutral-900/40 border border-neutral-800/80 focus:border-neutral-600 p-3 rounded-lg text-white text-sm focus:outline-none transition placeholder-neutral-700 resize-none"
                placeholder="Dettagli sull'immobile, vincoli o orari per il ricontatto..."
              />
            </label>

            {/* Privacy Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 text-neutral-400 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                  className="mt-0.5 form-checkbox h-4 w-4 bg-neutral-900 border-neutral-800 text-neutral-200 rounded focus:ring-0 focus:ring-offset-0 transition checked:bg-neutral-200 checked:border-neutral-200"
                />
                <span className="text-[11px] leading-normal font-medium tracking-wide text-neutral-500 group-hover:text-neutral-400 transition">
                  Accetto i{" "}
                  <a href="/termini e condizioni.pdf" target="_blank" className="text-neutral-300 underline underline-offset-2 hover:text-white transition">
                    termini e condizioni
                  </a>{" "}
                  e acconsento al trattamento dei dati secondo la{" "}
                  <a href="/normativa privacy.pdf" target="_blank" className="text-neutral-300 underline underline-offset-2 hover:text-white transition">
                    normativa sulla privacy
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Pulsante Tesla Style */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-neutral-100 text-black text-xs font-bold uppercase tracking-widest rounded-lg transition-all hover:bg-white active:scale-[0.99] disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Invio in corso..." : "Invia la richiesta"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModuloContatti;