"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUpload,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

function ModuloContatti({ destinatarioEmail }) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [via, setVia] = useState("");
  const [citta, setCitta] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [documentoIdentita, setDocumentoIdentita] = useState(null);

  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!privacy) {
      setError(
        "Devi accettare i termini e condizioni sulla privacy."
      );
      return;
    }

    if (!nome || !cognome || !email) {
      setError("Nome, cognome ed email sono obbligatori.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();

    formData.append("tipoUtente", "privato");
    formData.append("nome", nome);
    formData.append("cognome", cognome);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("via", via);
    formData.append("citta", citta);
    formData.append("messaggio", messaggio);
    formData.append("destinatarioEmail", destinatarioEmail);

    if (documentoIdentita) {
      formData.append(
        "documentoIdentita",
        documentoIdentita
      );
    }

    try {
      const res = await fetch("/api/invia-email-formidable", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);

        setNome("");
        setCognome("");
        setEmail("");
        setTelefono("");
        setVia("");
        setCitta("");
        setMessaggio("");
        setPrivacy(false);
        setDocumentoIdentita(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        const err = await res.json();
        setError(
          err?.error || "Errore durante l'invio."
        );
      }
    } catch (error) {
      setError("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setDocumentoIdentita(file);
  };

  return (
    <div className="w-full">

      <AnimatePresence mode="wait">

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-[2rem] border border-white/10 bg-white/[0.03]"
          >

            <FaCheckCircle className="text-5xl text-green-400 mb-6" />

            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white">
              Richiesta inviata.
            </h3>

            <p className="mt-4 text-neutral-400 max-w-md leading-relaxed">
              Ti contatteremo al più presto per
              fornirti tutte le informazioni necessarie.
            </p>

          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* HEADER */}
            <div className="space-y-4">

              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-semibold">
                Affiliazione Privati
              </span>

              <div className="text-4xl md:text-5xl font-light tracking-tight text-white">
                Inizia adesso.
              </div>

              <p className="text-neutral-400 leading-relaxed max-w-xl">
                Compila il modulo per entrare
                nel network professionale di
                faccio-tutto.it.
              </p>

            </div>

            {/* ERROR */}
            {error && (
              <div className="border border-red-500/20 bg-red-500/10 text-red-300 text-sm px-5 py-4 rounded-2xl">
                {error}
              </div>
            )}

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-5">

              <Input
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <Input
                label="Cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
              />

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />

              <Input
                label="Via"
                value={via}
                onChange={(e) => setVia(e.target.value)}
              />

              <Input
                label="Città"
                value={citta}
                onChange={(e) => setCitta(e.target.value)}
              />

            </div>

            {/* FILE */}
            <div className="space-y-4">

              <label className="text-sm text-neutral-300 block">
                Documento d'identità
              </label>

              <input
                ref={fileInputRef}
                type="file"
                id="documentoIdentita"
                accept="image/*,.pdf"
                onChange={handleDocumentoChange}
                className="hidden"
              />

              <label
                htmlFor="documentoIdentita"
                className="inline-flex items-center gap-3 border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.05] transition px-6 py-4 rounded-2xl cursor-pointer text-sm text-white"
              >

                <FaUpload />

                Carica documento

              </label>

              {documentoIdentita && (
                <div className="text-sm text-neutral-400">
                  {documentoIdentita.name}
                </div>
              )}

            </div>

            {/* TEXTAREA */}
            <div className="space-y-3">

              <label className="text-sm text-neutral-300">
                Messaggio
              </label>

              <p className="text-xs text-neutral-500 leading-relaxed">
                Descrivi brevemente le tue competenze
                e la tipologia di lavori per cui
                desideri essere contattato.
              </p>

              <textarea
                value={messaggio}
                onChange={(e) =>
                  setMessaggio(e.target.value)
                }
                rows={6}
                className="w-full rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 transition resize-none"
              />

            </div>

            {/* PRIVACY */}
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

            {/* BUTTON */}
            <div className="pt-4">

              <button
                type="submit"
                disabled={loading}
                className="group w-full bg-white hover:bg-neutral-200 disabled:opacity-50 text-black font-semibold py-5 rounded-full uppercase tracking-[0.2em] text-xs transition flex items-center justify-center gap-4"
              >

                {loading
                  ? "Invio in corso..."
                  : "Invia richiesta"}

                {!loading && (
                  <FaArrowRight className="group-hover:translate-x-1 transition" />
                )}

              </button>

            </div>

          </motion.form>
        )}

      </AnimatePresence>
    </div>
  );
}

/* COMPONENTE INPUT */

function Input({
  label,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className="space-y-3">

      <label className="text-sm text-neutral-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 transition"
      />

    </div>
  );
}

export default ModuloContatti;
export { ModuloContatti };