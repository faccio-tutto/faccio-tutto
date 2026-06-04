"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

function ModuloContatti({ destinatarioEmail }) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [via, setVia] = useState("");
  const [citta, setCitta] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!privacy) return setError("Accetta la privacy per continuare.");
    if (!nome || !cognome || !email)
      return setError("Nome, cognome ed email sono obbligatori.");

    const body = {
      nome,
      cognome,
      email,
      telefono,
      via,
      citta,
      messaggio,
      destinatarioEmail,
    };

    try {
      const res = await fetch("/api/invia-email-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) setSuccess(true);
      else {
        const err = await res.json();
        setError(err.error || "Errore durante l'invio.");
      }
    } catch {
      setError("Errore di rete.");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-black text-white flex justify-center px-4 py-20">
      <div className="w-full max-w-3xl">

        {/* HEADER CINEMATIC */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.25em] uppercase">
            Contattaci
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1 }}
            className="h-px bg-red-600 mx-auto mt-6"
          />
          <p className="text-gray-500 mt-6 text-sm">
            Progettazione, consulenza e soluzioni energetiche su misura
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-green-400 text-lg"
          >
            Richiesta inviata con successo.
          </motion.div>
        ) : (
          <motion.form
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-red-600 text-red-400 p-3 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* GRID INPUT */}
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedInput label="Nome" value={nome} setValue={setNome} />
              <AnimatedInput label="Cognome" value={cognome} setValue={setCognome} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedInput label="Email" value={email} setValue={setEmail} type="email" />
              <AnimatedInput label="Telefono" value={telefono} setValue={setTelefono} type="tel" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedInput label="Via" value={via} setValue={setVia} />
              <AnimatedInput label="Città" value={citta} setValue={setCitta} />
            </div>

            {/* MESSAGGIO */}
            <motion.div variants={item}>
              <label className="text-xs tracking-[0.25em] uppercase text-gray-400">
                Messaggio
              </label>
              <textarea
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                rows={5}
                className="w-full mt-2 bg-black border border-gray-800 p-4 text-white focus:border-red-600 outline-none transition"
              />
            </motion.div>

            {/* PRIVACY */}
            <motion.div
              variants={item}
              className="flex items-start gap-3 text-xs text-gray-500"
            >
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="mt-1 accent-red-600"
              />
              <p>
                Accetto i{" "}
                <a className="text-white underline" href="/termini-e-condizioni.pdf">
                  termini e condizioni
                </a>{" "}
                e la{" "}
                <a className="text-white underline" href="/privacy.pdf">
                  privacy policy
                </a>
              </p>
            </motion.div>

            {/* BUTTON CINEMATIC */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="submit"
              className="w-full border border-red-600 text-red-500 py-4 uppercase tracking-[0.3em] text-sm hover:bg-red-600 hover:text-white transition"
            >
              Invia richiesta
            </motion.button>
          </motion.form>
        )}
      </div>
    </div>
  );
}

/* INPUT CINEMATIC COMPONENT */
function AnimatedInput({ label, value, setValue, type = "text" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
    >
      <label className="text-xs tracking-[0.25em] uppercase text-gray-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mt-2 bg-black border border-gray-800 p-3 text-white focus:border-red-600 outline-none transition"
      />
    </motion.div>
  );
}

export default ModuloContatti;