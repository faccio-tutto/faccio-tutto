"use client";

import React, { useState } from "react";

function ModuloContatti({ destinatarioEmail }) {
  const [step, setStep] = useState(1);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [nomeAzienda, setNomeAzienda] = useState("");
  const [partitaIva, setPartitaIva] = useState("");
  const [legaleRappresentante, setLegaleRappresentante] = useState("");

  const [via, setVia] = useState("");
const [citta, setCitta] = useState("");

  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sitoWeb, setSitoWeb] = useState("");

  const [messaggio, setMessaggio] = useState("");

  const [privacy, setPrivacy] = useState(false);

  const [visuraCamerale, setVisuraCamerale] = useState(null);
  const [documentoIdentita, setDocumentoIdentita] = useState(null);

  const next = () => {
    setError(null);

    if (step === 1) {
      if (!nomeAzienda || !partitaIva || !legaleRappresentante)
        return setError("Completa i dati aziendali");

      if (!/^\d{11}$/.test(partitaIva))
        return setError("Partita IVA non valida");
    }

    if (step === 2) {
      if (!email) return setError("Email obbligatoria");
    }

    setStep(step + 1);
  };

  const prev = () => {
    setError(null);
    setStep(step - 1);
  };

  const submit = async () => {
    if (!privacy) return setError("Accetta privacy");

    const formData = new FormData();

    formData.append("tipoUtente", "azienda");
    formData.append("nomeAzienda", nomeAzienda);
    formData.append("partitaIva", partitaIva);
    formData.append("legaleRappresentante", legaleRappresentante);
    formData.append("via", via);
    formData.append("citta", citta);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("sitoWeb", sitoWeb);
    formData.append("messaggio", messaggio);
    formData.append("destinatarioEmail", destinatarioEmail);

    if (visuraCamerale)
      formData.append("visuraCamerale", visuraCamerale);

    if (documentoIdentita)
      formData.append("documentoIdentita", documentoIdentita);

    const res = await fetch("/api/invia-email-formidable", {
      method: "POST",
      body: formData,
    });

   if (res.ok) {
  setSuccess(true);

  setTimeout(() => {
    setSuccess(false);

    // 🔁 TORNA ALLO STEP 1
    setStep(1);

    // RESET CAMPI
    setNomeAzienda("");
    setPartitaIva("");
    setLegaleRappresentante("");
    setVia("");
    setCitta("");
    setEmail("");
    setTelefono("");
    setSitoWeb("");
    setVia("");
    setCitta("");
    setMessaggio("");
    setPrivacy(false);

    setVisuraCamerale(null);
    setDocumentoIdentita(null);
  }, 3000);
}
    else setError("Errore invio");
  };

  if (success) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-wide">
            Richiesta inviata
          </h1>
          <p className="text-neutral-500 mt-3">
            Ti contatteremo a breve
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-4xl">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
            Affiliazione
          </p>

          <h1 className="text-4xl font-light mt-2">
            Configura la tua partnership
          </h1>
        </div>

        {/* PROGRESS */}
        <div className="mb-10">
          <div className="h-[2px] bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <p className="text-center text-xs text-neutral-500 mt-3">
            Step {step} / 4
          </p>
        </div>

        {/* MODAL CARD */}
        <div className="bg-[#111] border border-neutral-800 rounded-3xl p-10 shadow-2xl">

          {error && (
            <div className="text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-light">
                Dati aziendali
              </h2>

              <input
                placeholder="Nome Azienda"
                value={nomeAzienda}
                onChange={(e) => setNomeAzienda(e.target.value)}
                className="input"
              />

              <input
                placeholder="Partita IVA"
                value={partitaIva}
                onChange={(e) => setPartitaIva(e.target.value)}
                className="input"
              />

              <input
                placeholder="Legale Rappresentante"
                value={legaleRappresentante}
                onChange={(e) => setLegaleRappresentante(e.target.value)}
                className="input"
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-light">
                Contatti
              </h2>

               <input
                placeholder="Via"
                value={via}
                onChange={(e) => setVia(e.target.value)}
                className="input"
              />

                <input
                  placeholder="Città"
                  value={citta}
                  onChange={(e) => setCitta(e.target.value)}
                  className="input"
                />


              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />

              <input
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="input"
              />

              <input
                placeholder="Sito web"
                value={sitoWeb}
                onChange={(e) => setSitoWeb(e.target.value)}
                className="input"
              />
            </div>
          )}

          {/* STEP 3 */}

{step === 3 && (

  <div className="space-y-6">

    <h2 className="text-xl font-light">

      Documenti

    </h2>

    {/* VISURA */}

    <div>

      <p className="text-xs text-neutral-500 mb-2">

        Visura camerale

      </p>

      <label className="block border border-neutral-700 bg-[#1a1a1a] hover:bg-[#222] transition cursor-pointer rounded-2xl p-6 text-center">

        <input

          type="file"

          accept=".pdf"

          className="hidden"

          onChange={(e) =>

            setVisuraCamerale(

              e.target.files?.[0]

            )

          }

        />

        <div className="text-sm text-neutral-300">

          {visuraCamerale

            ? visuraCamerale.name

            : "Carica visura camerale"}

        </div>

        <div className="text-xs text-neutral-500 mt-2">

          PDF • clicca per selezionare

        </div>

      </label>

    </div>

    {/* DOCUMENTO */}

    <div>

      <p className="text-xs text-neutral-500 mb-2">

        Documento identità

      </p>

      <label className="block border border-neutral-700 bg-[#1a1a1a] hover:bg-[#222] transition cursor-pointer rounded-2xl p-6 text-center">

        <input

          type="file"

          accept="image/*,.pdf"

          className="hidden"

          onChange={(e) =>

            setDocumentoIdentita(

              e.target.files?.[0]

            )

          }

        />

        <div className="text-sm text-neutral-300">

          {documentoIdentita

            ? documentoIdentita.name

            : "Carica documento d'identità"}

        </div>

        <div className="text-xs text-neutral-500 mt-2">

          JPG / PDF • clicca per selezionare

        </div>

      </label>

    </div>

    {/* MESSAGGIO */}

    <textarea

      placeholder="Messaggio"

      value={messaggio}

      onChange={(e) =>

        setMessaggio(e.target.value)

      }

      className="input h-28"

    />

  </div>

)}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-light">
                Conferma
              </h2>

              <div className="text-sm text-neutral-400 space-y-1">
                <p>{nomeAzienda}</p>
                <p>{partitaIva}</p>
                <p>{legaleRappresentante}</p>
                <p>{via}</p>
                <p>{citta}</p>
                <p>{email}</p>
                <p>{telefono}</p>
              </div>

            <div className="flex items-start gap-0 pt-2">

              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) =>
                  setPrivacy(e.target.checked)
                }
                className="mt-1"
              />

              <div className="text-s text-neutral-500 leading-relaxed">

                Accetto i{" "}

                <a
                  href="/termini e condizioni.pdf"
                  className="text-white hover:opacity-70 transition"
                >
                  termini e condizioni
                </a>

                {" "}e acconsento al trattamento
                dei dati personali secondo la{" "}

                <a
                  href="/normativa privacy.pdf"
                  className="text-white hover:opacity-70 transition"
                >
                  normativa privacy
                </a>

              </div>

            </div>
            </div>
          )}

          {/* NAV */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <button
                onClick={prev}
                className="text-neutral-400 text-sm"
              >
                Indietro
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={next}
                className="px-6 py-2 bg-white text-black rounded-full text-sm"
              >
                Avanti
              </button>
            ) : (
              <button
                onClick={submit}
                className="px-6 py-2 bg-white text-black rounded-full text-sm"
              >
                Invia
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          color: white;
          outline: none;
          transition: 0.3s;
        }

        .input::placeholder {
          color: #666;
        }

        .input:focus {
          border-color: white;
          background: #151515;
        }
      `}</style>
    </div>
  );
}

export default ModuloContatti;