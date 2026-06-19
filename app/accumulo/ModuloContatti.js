"use client";

import React, { useState } from "react";

function ModuloContatti({ destinatarioEmail }) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [via, setVia] = useState("");
  const [citta, setCitta] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    if (!privacy) {
      setStatus("error");
      return alert("Accetta la privacy policy.");
    }

    if (!nome || !cognome || !email) {
      setStatus("error");
      return alert("Nome, cognome ed email sono obbligatori.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return alert("Email non valida.");
    }

    try {
      const res = await fetch("/api/invia-email-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cognome,
          email,
          telefono,
          via,
          citta,
          messaggio,
          destinatarioEmail,
          tipoUtente: "privato",
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="w-full bg-black text-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide">
            Contattaci
          </h2>
          <p className="text-gray-400 mt-4 text-sm md:text-base">
            Risposta rapida • Consulenza tecnica • Preventivo gratuito
          </p>
        </div>

        {/* SUCCESS */}
        {status === "success" ? (
          <div className="border border-green-500/40 bg-green-500/10 p-6 text-center rounded-2xl">
            <p className="text-green-400 text-lg">
              Messaggio inviato con successo
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Ti ricontatteremo a breve.
            </p>
          </div>
        ) : (
          /* FORM */
          <form
            onSubmit={handleSubmit}
            className="space-y-6 backdrop-blur-sm"
          >
            {/* GRID INPUT */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-white placeholder-gray-500"
              />

              <input
                placeholder="Cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                className="bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-white placeholder-gray-500"
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-white placeholder-gray-500"
              />

              <input
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-white placeholder-gray-500"
              />

              <input
                placeholder="Via"
                value={via}
                onChange={(e) => setVia(e.target.value)}
                className="bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-white placeholder-gray-500"
              />

              <input
                placeholder="Città"
                value={citta}
                onChange={(e) => setCitta(e.target.value)}
                className="bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-white placeholder-gray-500"
              />
            </div>

            {/* MESSAGE */}
            <textarea
              placeholder="Messaggio"
              rows={4}
              value={messaggio}
              onChange={(e) => setMessaggio(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-white placeholder-gray-500"
            />

            {/* PRIVACY */}
            <div className="flex items-start gap-3 text-xs text-gray-400">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="mt-1"
              />
              <p>
                Accetto i termini e la privacy policy per essere ricontattato.
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 border border-white/30 hover:border-white transition text-sm tracking-widest uppercase"
            >
              {status === "sending" ? "Invio in corso..." : "Invia richiesta"}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-center text-sm">
                Errore nell’invio. Riprova.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

export default ModuloContatti;