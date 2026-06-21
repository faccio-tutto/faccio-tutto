"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ModuloContattiProps {
  destinatarioEmail?: string;
}

export default function ModuloContatti({
  destinatarioEmail = "info@faccio-tutto.it",
}: ModuloContattiProps) {
  const [loading, setLoading] = useState(false);
  const [messaggio, setMessaggio] = useState("");

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const form = e.currentTarget;

  setLoading(true);
  setMessaggio("");

  const formData = new FormData(form);

  const dati = {
    nome: formData.get("nome"),
    cognome: formData.get("cognome"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
    comune: formData.get("comune"),
    messaggio: formData.get("messaggio"),
    destinatarioEmail,
  };

  try {
    const response = await fetch("/api/invia-email-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dati),
    });

    if (response.ok) {
      setMessaggio(
        "Richiesta inviata correttamente. Ti contatteremo al più presto."
      );

      form.reset();
    } else {
      setMessaggio(
        "Si è verificato un errore durante l'invio."
      );
    }
  } catch (error) {
    console.error(error);

    setMessaggio(
      "Errore di connessione. Riprova più tardi."
    );
  }

  setLoading(false);
};

  return (
    <div className="max-w-4xl mx-auto">

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm mb-2">
              Nome
            </label>

            <input
              type="text"
              name="nome"
              required
              className="w-full border border-neutral-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Cognome
            </label>

            <input
              type="text"
              name="cognome"
              required
              className="w-full border border-neutral-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm mb-2">
              Telefono
            </label>

            <input
              type="tel"
              name="telefono"
              required
              className="w-full border border-neutral-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full border border-neutral-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

        </div>

        <div>
          <label className="block text-sm mb-2">
            Comune di installazione
          </label>

          <input
            type="text"
            name="comune"
            className="w-full border border-neutral-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Descrivi la tua richiesta
          </label>

          <textarea
            name="messaggio"
            rows={6}
            required
            className="w-full border border-neutral-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Descrivi il tuo progetto, la superficie dell'immobile, il sistema desiderato, ecc..."
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            className="mt-1"
          />

          <p className="text-sm text-neutral-600">
            Acconsento al trattamento dei dati personali
            ai sensi del Regolamento UE 679/2016 (GDPR).
          </p>
        </div>

       <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, backgroundColor: "#262626" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full bg-black text-white py-4 rounded-full text-xs uppercase tracking-widest border border-white/20 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Invio..." : "Richiedi preventivo gratuito"}
          </motion.button>

        {messaggio && (
          <div
            className={`text-center p-4 rounded-xl ${
              messaggio.includes("correttamente")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {messaggio}
          </div>
        )}
      </form>

    </div>
  );
}