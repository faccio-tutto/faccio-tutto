"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import "./affiliazione.css";

interface FormData {
    nome: string;
    cognome: string;
    email: string;
    telefono: string;
    indirizzo: string;
    messaggio: string;
    accettazione: boolean;
    documento: File | null;
}

interface Errors {
    nome?: string;
    cognome?: string;
    email?: string;
    telefono?: string;
    indirizzo?: string;
    documento?: string;
    accettazione?: string;
}

export default function AffiliazionePrivati() {
    const [formData, setFormData] = useState<FormData>({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        indirizzo: "",
        messaggio: "",
        accettazione: false,
        documento: null,
    });

    const [errors, setErrors] = useState<Errors>({});
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = () => {
        let newErrors: Errors = {};
        const phoneRegex = /^[0-9]{7,15}$/;
        if (!phoneRegex.test(formData.telefono)) {
            newErrors.telefono = "Numero di telefono non valido.";
        }
        if (!formData.nome) newErrors.nome = "Il nome è obbligatorio.";
        if (!formData.cognome) newErrors.cognome = "Il cognome è obbligatorio.";
        if (!formData.email.includes("@")) newErrors.email = "Email non valida.";
        if (!formData.indirizzo) newErrors.indirizzo = "L'indirizzo è obbligatorio.";
        if (!formData.documento) newErrors.documento = "Caricare un documento d'identità.";
        if (!formData.accettazione) newErrors.accettazione = "Devi accettare i termini e condizioni.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, value } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else if (type === "file") {
            setFormData({ ...formData, [name]: (e.target as HTMLInputElement).files?.[0] || null });
        } else if (e.target instanceof HTMLTextAreaElement) {
            setFormData({ ...formData, [name]: e.target.value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Dati inviati:", formData);
            setSuccessMessage("Richiesta inviata con successo!");
            setFormData({
                nome: "",
                cognome: "",
                email: "",
                telefono: "",
                indirizzo: "",
                messaggio: "",
                accettazione: false,
                documento: null,
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-0">
            {/* Navbar */}
            <nav className="bg-black text-white py-1 px-6 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-1">
                    <a href="/">
                        <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={200} height={200} className="rounded" />
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
                            <a href={link.href} className="hover:underline">{link.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="min-h-screen bg-black flex justify-center items-center p-6">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Affiliazione Privati</h2>
                    <form onSubmit={handleSubmit} className="affiliazione-form"> {/* ✅ Aggiunto classe CSS */}
                        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
                        
                        {['nome', 'cognome', 'email', 'telefono', 'indirizzo'].map((field) => (
                <div key={field} className="mb-4">
                    <label htmlFor={field} className="block text-lg font-medium text-gray-700 capitalize">{field}</label>
                    <input
                        type={field === 'email' ? 'email' : 'text'}
                        id={field}
                        name={field}
                        value={formData[field as keyof FormData] as string}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                        required
                    />
                    {errors[field as keyof Errors] && <p className="error-message">{errors[field as keyof Errors]}</p>}
                </div>
                        ))}

                        <div className="mb-4">
                            <label htmlFor="documento" className="block text-lg font-medium text-gray-700">Carica documento d'identità</label>
                            <input type="file" id="documento" name="documento" accept="image/*,.pdf" onChange={handleChange} className="hidden" />
                            <label htmlFor="documento" className="file-upload-label">Seleziona un file</label>
                            {errors.documento && <p className="error-message">{errors.documento}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="messaggio" className="block text-lg font-medium text-gray-700">Messaggio</label>
                            <span className="block text-gray-600 text-sm">
                                (descrivi brevemente cosa sai fare e per quale tipologia di lavori vorresti essere contattato)
                            </span>
                            <textarea
                id="messaggio"
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                rows={4}
            />
                        </div>

                        {/* Link per scaricare il modello di ricevuta a sinistra */}
                        <div className="-mt-6 text-left">
                            <a href="/MODELLO_RICEVUTA_PRESTAZIONE_OCCASIONALE.pdf" download className="text-blue-500 hover:text-blue-700 text-lg">
                                Scarica il modello di ricevuta per prestazioni occasionali
                            </a>
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