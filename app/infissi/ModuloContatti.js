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

  const [dimensioni, setDimensioni] = useState(
  Array.from({ length: 10 }, () => ({ width: "", height: "" }))
);

  const [materiale, setMateriale] = useState("Seleziona un materiale");
  const [colore, setColore] = useState("Seleziona un colore");
  const [accessori, setAccessori] = useState("Seleziona un accessorio");

  const [invioStato, setInvioStato] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!privacy) return setInvioStato("errore");
    if (!nome || !cognome || !email) return setInvioStato("errore");

    setInvioStato("inviando");

    const formDataToSend = {
      nome,
      cognome,
      email,
      telefono,
      via,
      città,
      messaggio,
      dimensioni: dimensioni
        .map((d) =>
          d.width || d.height ? `${d.width}x${d.height}` : ""
        )
        .filter(Boolean),
      materiale,
      colore,
      accessori,
      destinatarioEmail,
      tipoUtente: "privato",
    };

    try {
      const res = await fetch("/api/invia-email-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      setInvioStato(res.ok ? "successo" : "errore");
    } catch {
      setInvioStato("errore");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 outline-none focus:border-white transition";

  const labelClass =
    "text-xs uppercase tracking-[0.3em] text-white/40 mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-14 text-white">

      {/* TITLE */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-light tracking-wide">
          Richiesta preventivo
        </h3>
        <p className="text-white/40 mt-3 text-sm">
          Compila i dati per ricevere una proposta su misura
        </p>
      </div>

      {/* DIMENSIONI (clean grid Tesla style) */}
      <div className="space-y-6">
        <p className={labelClass}>Dimensioni serramenti</p>

        {dimensioni.map((d, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-white/5 pb-4"
          >
            <span className="text-white/40 text-sm">
              Serramento {i + 1}
            </span>

            <input
              placeholder="Larghezza"
              value={d.width}
              onChange={(e) => {
                const copy = [...dimensioni];
                copy[i].width = e.target.value;
                setDimensioni(copy);
              }}
              className={inputClass}
            />

            <input
              placeholder="Altezza"
              value={d.height}
              onChange={(e) => {
                const copy = [...dimensioni];
                copy[i].height = e.target.value;
                setDimensioni(copy);
              }}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* SELECT SECTION CLEAN */}
      <div className="grid md:grid-cols-3 gap-10">

        <div>
          <span className={labelClass}>Materiale</span>
          <select
            value={materiale}
            onChange={(e) => setMateriale(e.target.value)}
            className="w-full bg-black border-b border-white/10 py-3 text-white outline-none focus:border-white"
          >
            <option value="">Seleziona</option>
            <option value="alluminio">Alluminio</option>
            <option value="pvc">PVC</option>
          </select>
        </div>

        <div>
          <span className={labelClass}>Colore</span>
          <select
            value={colore}
            onChange={(e) => setColore(e.target.value)}
            className="w-full bg-black border-b border-white/10 py-3 text-white"
          >
            <option value="">Seleziona</option>
            <option value="ral">RAL</option>
            <option value="legno">Legno</option>
          </select>
        </div>

        <div>
          <span className={labelClass}>Accessori</span>
          <select
            value={accessori}
            onChange={(e) => setAccessori(e.target.value)}
            className="w-full bg-black border-b border-white/10 py-3 text-white"
          >
            <option value="">Seleziona</option>
            <option value="tapparella">Tapparella</option>
            <option value="motorizzata">Motorizzata</option>
            <option value="persiana">Persiana</option>
          </select>
        </div>

      </div>

      {/* DATI CLIENTE CLEAN GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Cognome"
          value={cognome}
          onChange={(e) => setCognome(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Via"
          value={via}
          onChange={(e) => setVia(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Città"
          value={città}
          onChange={(e) => setCittà(e.target.value)}
          className={inputClass}
        />

      </div>

      {/* MESSAGGIO */}
      <textarea
        placeholder="Messaggio (opzionale)"
        value={messaggio}
        onChange={(e) => setMessaggio(e.target.value)}
        className="w-full bg-transparent border border-white/10 p-5 h-32 text-white placeholder:text-white/30 outline-none focus:border-white transition"
      />

      {/* PRIVACY */}
      <label className="flex items-start gap-3 text-xs text-white/40">
        <input
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
        />
        Accetto termini e trattamento dati personali
      </label>

      {/* BUTTON TESLA STYLE */}
      <button
        type="submit"
        className="w-full py-4 border border-white text-white uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition"
      >
        Invia richiesta
      </button>

      {/* STATUS */}
      {invioStato === "inviando" && (
        <p className="text-white/40 text-center">Invio in corso...</p>
      )}
      {invioStato === "successo" && (
        <p className="text-green-400 text-center">Richiesta inviata</p>
      )}
      {invioStato === "errore" && (
        <p className="text-red-400 text-center">Errore di invio</p>
      )}

    </form>
  );
}

export default ModuloContatti;