"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import "./azienda.css"; // ✅ Importa il CSS

// Tipizzazione dei dati del form
interface FormData {
    nomeAzienda: string;
    partitaIVA: string;
    legaleRappresentante: string;
    email: string;
    telefono: string;
    indirizzo: string;
    sitoWeb: string;
    messaggio: string;
    accettazione: boolean;
    documento: File | null;
    visuraCamerale: File | null;
}

export default function AffiliazioneAzienda() {
    const [formData, setFormData] = useState<FormData>({
        nomeAzienda: "",
        partitaIVA: "",
        legaleRappresentante: "",
        email: "",
        telefono: "",
        indirizzo: "",
        sitoWeb: "",
        messaggio: "",
        accettazione: false,
        documento: null,
        visuraCamerale: null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState<string>("");

    // ✅ Correzione: Tipizzazione dell'evento
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, checked, files } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "file" ? files?.[0] || null : value,
        }));
    };

    // ✅ Correzione: Tipizzazione dell'evento submit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Dati inviati:", formData);
        setSuccessMessage("Richiesta inviata con successo!");
    };

    return (
        <div className="min-h-screen bg-black text-white p-0">
            <nav className="bg-black text-white py-1 px-6 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-1">
                    <a href="/">
                        <Image
                            src="/logo faccio tutto 3.png"
                            alt="Logo Faccio Tutto"
                            width={200}
                            height={200}
                            className="rounded"
                        />
                    </a>
                    <h1 className="text-2xl font-bold">faccio-tutto.it</h1>
                </div>
                <ul className="flex gap-6">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Mission", href: "/mission" },
                        { name: "Vision", href: "/vision" },
                        { name: "Chi siamo", href: "/chisiamo" },
                        { name: "Affiliazione", href: "/affiliazione" },
                        { name: "Contatti", href: "/contatti" },
                    ].map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="hover:underline">
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="min-h-screen bg-black flex justify-center items-center p-1">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Affiliazione Azienda</h2>
                    <form onSubmit={handleSubmit} className="affiliazione-form">
                        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

                        {["nomeAzienda", "partitaIVA", "legaleRappresentante", "email", "telefono", "indirizzo", "sitoWeb"].map(
                            (field) => (
                                <div key={field} className="mb-0">
                                    <label htmlFor={field} className="block text-lg font-medium text-gray-700 capitalize">
                                        {field.replace(/([A-Z])/g, " $1").trim()}
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={formData[field as keyof FormData] as string}
                                        onChange={handleChange}
                                        className="w-full p-4 border border-gray-300 rounded-lg text-lg text-black"
                                        required={field !== "sitoWeb"}
                                    />
                                </div>
                            )
                        )}

                        {/* Upload Documento */}
                        <div className="mb-0">
                            <label htmlFor="documento" className="block text-lg text-gray-700">
                                Carica documento d'identità del legale rappresentante
                            </label>
                            <input
                                type="file"
                                id="documento"
                                name="documento"
                                accept="image/*,.pdf"
                                onChange={handleChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="documento"
                                className="file-upload-label bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer"
                            >
                                Seleziona un file
                            </label>
                        </div>

                        {/* Upload Visura Camerale */}
                        <div className="mb-0">
                            <label htmlFor="visuraCamerale" className="block text-lg text-gray-700">
                                Carica Visura Camerale
                            </label>
                            <input
                                type="file"
                                id="visuraCamerale"
                                name="visuraCamerale"
                                accept=".pdf"
                                onChange={handleChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="visuraCamerale"
                                className="file-upload-label bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer"
                            >
                                Seleziona un file
                            </label>
                        </div>

                        {/* Messaggio */}
                        <div className="mb-0">
                            <label htmlFor="messaggio" className="block text-lg font-medium text-gray-700">
                                Messaggio
                            </label>
                            <span className="block text-gray-600 text-sm">
                                (descrivi brevemente di cosa si occupa la tua azienda e per quale tipologia di lavori vorresti essere contattato)
                            </span>
                            <textarea
                                id="messaggio"
                                name="messaggio"
                                value={formData.messaggio}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg text-lg text-black"
                                rows={4} // ✅ Corretto da "4" a {4}
                            />
                        </div>

                         {/* Checkbox accettazione con testo attaccato */}
                        <div className="flex items-start"> {/* Modificato items-start */}
    <input 
        type="checkbox" 
        id="accettazione" 
        name="accettazione" 
        checked={formData.accettazione} 
        onChange={handleChange} 
        className="w-5 h-5 -mr-4 mt-0" // Aggiunto mt-1 per allineamento
        required 
    />
    <label htmlFor="accettazione" className="text-sm text-gray-700">
        Accetto i <a href="/termini e condizioni.pdf" className="text-blue-500">termini e condizioni</a> e acconsento al trattamento dei miei dati personali secondo la <a href="/normativa privacy.pdf" className="text-blue-500">normativa sulla privacy.</a>
    </label>
</div>
                        {errors.accettazione && <p className="text-red-500 text-sm mt-1">{errors.accettazione}</p>}

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 rounded-lg text-lg transition mt-6">
                            Invia la richiesta
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}