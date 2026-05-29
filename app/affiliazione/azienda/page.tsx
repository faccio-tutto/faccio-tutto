"use client";
import Image from "next/image"; // Assicurati che Image sia importato
import ModuloContatti from "./ModuloContatti";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Head from "next/head";

export default function AffiliazioneAzienda() {
  return (
    <>
      <Head>
        <title>AffiliazioneAzienda | faccio-tutto.it</title>
        <meta
          name="description"
          content="Scopri come affiliarti a faccio-tutto.it: vantaggi, supporto tecnico e opportunità per aziende e privati."
        />
        <link rel="canonical" href="https://www.faccio-tutto.it/affiliazione/azienda" />
      </Head>
      <div className="min-h-screen bg-black text-white p-0">
        
        <div className="min-h-screen bg-black flex justify-center items-center p-6">
          <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Affiliazione Azienda</h2>
            {/* Inserimento del modulo contatti */}
            <section className="text-white py-6 text-center">
              <div className="text-lg text-gray-500 text-bold text-center">
                Se sei un'azienda e desideri affiliarti, compila il modulo qui sotto. 
                <br/>Ti contatteremo al più presto per fornirti tutte le informazioni necessarie.
              </div>
              <div className="mt-8 bg-black items-center"></div>
              <div id="modulo-contatti" className="flex justify-center">
                <ModuloContatti destinatarioEmail="affiliazione@faccio-tutto.it" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}