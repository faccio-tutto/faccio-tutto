"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBuilding, FaDraftingCompass, FaDoorOpen, FaPlug, FaWrench, FaPhone, FaSolarPanel } from "react-icons/fa";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import ModuloContatti from './ModuloContatti'; // Assicurati che il percorso sia corretto
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Assicurati di avere questi componenti per le card
import { Button } from "@/components/ui/button"; // Assicurati di avere questo componente per i pulsanti
import React, { useState } from 'react';

// Funzione helper per le classi, come nel codice del calcolatore
const cn = (...args: (string | undefined | null | boolean)[]) => args.filter(Boolean).join(' ');

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
const CustomCardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
    <div className={cn("card-content", className)} {...props}>
        {children}
    </div>
);

// Definizione di CustomCard (copiato dalla HomePage, per consistenza)
type CardProps = React.HTMLAttributes<HTMLDivElement>;
const CustomCard: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("rounded-lg shadow-md", className)} {...props}>
            {children}
        </div>
    );
};

const dailyIrradiance_kWh_per_sqm_per_day: { [provinceName: string]: { [month: string]: number } } = {
    'Agrigento': { Gennaio: 2.44, Febbraio: 3.47, Marzo: 4.69, Aprile: 6.17, Maggio: 7.47, Giugno: 8.19, Luglio: 8.22, Agosto: 7.50, Settembre: 5.81, Ottobre: 4.06, Novembre: 2.81, Dicembre: 2.28 },
    'Alessandria': { Gennaio: 1.31, Febbraio: 2.08, Marzo: 3.22, Aprile: 4.39, Maggio: 5.14, Giugno: 5.69, Luglio: 6.28, Agosto: 5.00, Settembre: 3.72, Ottobre: 2.36, Novembre: 1.50, Dicembre: 1.17 },
    'Ancona': { Gennaio: 1.19, Febbraio: 2.11, Marzo: 3.36, Aprile: 5.08, Maggio: 6.42, Giugno: 6.69, Luglio: 7.22, Agosto: 6.11, Settembre: 4.44, Ottobre: 2.92, Novembre: 1.53, Dicembre: 1.14 },
    'Aosta': { Gennaio: 1.47, Febbraio: 2.22, Marzo: 3.36, Aprile: 4.36, Maggio: 5.06, Giugno: 5.53, Luglio: 5.83, Agosto: 4.86, Settembre: 3.67, Ottobre: 2.42, Novembre: 1.69, Dicembre: 1.33 },
    'Arezzo': { Gennaio: 1.42, Febbraio: 2.11, Marzo: 3.11, Aprile: 4.19, Maggio: 5.33, Giugno: 6.17, Luglio: 6.42, Agosto: 5.33, Settembre: 4.14, Ottobre: 2.61, Novembre: 1.61, Dicembre: 1.14 },
    'Ascoli Piceno': { Gennaio: 1.50, Febbraio: 2.28, Marzo: 3.50, Aprile: 4.78, Maggio: 5.78, Giugno: 6.58, Luglio: 7.11, Agosto: 6.19, Settembre: 4.53, Ottobre: 2.89, Novembre: 1.78, Dicembre: 1.33 },
    'Asti': { Gennaio: 1.44, Febbraio: 2.19, Marzo: 3.33, Aprile: 4.53, Maggio: 5.17, Giugno: 5.72, Luglio: 6.25, Agosto: 4.94, Settembre: 3.64, Ottobre: 2.53, Novembre: 1.56, Dicembre: 1.33 },
    'Avellino': { Gennaio: 1.50, Febbraio: 2.33, Marzo: 3.53, Aprile: 5.03, Maggio: 6.19, Giugno: 6.86, Luglio: 7.47, Agosto: 6.64, Settembre: 4.92, Ottobre: 3.33, Novembre: 1.94, Dicembre: 1.36 },
    'Bari': { Gennaio: 1.83, Febbraio: 2.81, Marzo: 4.03, Aprile: 5.72, Maggio: 7.03, Giugno: 7.78, Luglio: 7.94, Agosto: 7.00, Settembre: 5.28, Ottobre: 3.67, Novembre: 2.22, Dicembre: 1.58 },
    'Barletta-Andria-Trani': { Gennaio: 1.83, Febbraio: 2.81, Marzo: 4.03, Aprile: 5.72, Maggio: 7.03, Giugno: 7.78, Luglio: 7.94, Agosto: 7.00, Settembre: 5.28, Ottobre: 3.67, Novembre: 2.22, Dicembre: 1.58 }, // Usa dati Bari
    'Belluno': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.67, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 }, // Usa dati Padova/Treviso
    'Benevento': { Gennaio: 1.50, Febbraio: 2.33, Marzo: 3.53, Aprile: 5.03, Maggio: 6.19, Giugno: 6.86, Luglio: 7.47, Agosto: 6.64, Settembre: 4.92, Ottobre: 3.33, Novembre: 1.94, Dicembre: 1.36 }, // Usa dati Avellino/Caserta
    'Bergamo': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 }, // Usa dati Milano
    'Biella': { Gennaio: 1.25, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 }, // Usa dati Torino
    'Bologna': { Gennaio: 1.25, Febbraio: 2.19, Marzo: 3.36, Aprile: 4.81, Maggio: 5.83, Giugno: 6.56, Luglio: 7.11, Agosto: 5.83, Settembre: 4.28, Ottobre: 2.75, Novembre: 1.47, Dicembre: 1.14 },
    'Bolzano': { Gennaio: 1.25, Febbraio: 2.28, Marzo: 3.53, Aprile: 4.58, Maggio: 5.64, Giugno: 5.92, Luglio: 6.25, Agosto: 5.14, Settembre: 3.94, Ottobre: 2.58, Novembre: 1.42, Dicembre: 1.08 },
    'Brescia': { Gennaio: 1.28, Febbraio: 2.17, Marzo: 3.44, Aprile: 4.47, Maggio: 5.67, Giugno: 6.25, Luglio: 6.78, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.47, Dicembre: 1.19 },
    'Brindisi': { Gennaio: 1.94, Febbraio: 2.58, Marzo: 3.92, Aprile: 5.44, Maggio: 6.53, Giugno: 7.50, Luglio: 7.61, Agosto: 6.64, Settembre: 5.11, Ottobre: 3.61, Novembre: 2.19, Dicembre: 1.64 },
    'Cagliari': { Gennaio: 2.03, Febbraio: 2.72, Marzo: 4.00, Aprile: 5.14, Maggio: 6.25, Giugno: 6.94, Luglio: 7.58, Agosto: 6.64, Settembre: 4.89, Ottobre: 3.39, Novembre: 2.25, Dicembre: 1.78 },
    'Caltanissetta': { Gennaio: 2.50, Febbraio: 3.32, Marzo: 4.44, Aprile: 5.78, Maggio: 7.08, Giugno: 7.83, Luglio: 7.83, Agosto: 7.06, Settembre: 5.42, Ottobre: 3.83, Novembre: 2.78, Dicembre: 2.22 },
    'Campobasso': { Gennaio: 1.72, Febbraio: 2.64, Marzo: 3.75, Aprile: 5.19, Maggio: 6.53, Giugno: 7.03, Luglio: 7.36, Agosto: 6.42, Settembre: 4.83, Ottobre: 3.33, Novembre: 2.03, Dicembre: 1.56 },
    'Carbonia-Iglesias': { Gennaio: 2.03, Febbraio: 2.72, Marzo: 4.00, Aprile: 5.14, Maggio: 6.25, Giugno: 6.94, Luglio: 7.58, Agosto: 6.64, Settembre: 4.89, Ottobre: 3.39, Novembre: 2.25, Dicembre: 1.78 }, // Usa dati Cagliari
    'Caserta': { Gennaio: 1.89, Febbraio: 2.69, Marzo: 4.03, Aprile: 5.39, Maggio: 6.61, Giugno: 7.53, Luglio: 7.72, Agosto: 6.72, Settembre: 5.08, Ottobre: 3.58, Novembre: 2.17, Dicembre: 1.64 },
    'Catania': { Gennaio: 2.50, Febbraio: 3.31, Marzo: 4.44, Aprile: 5.75, Maggio: 7.08, Giugno: 7.83, Luglio: 7.83, Agosto: 7.06, Settembre: 5.42, Ottobre: 3.81, Novembre: 2.78, Dicembre: 2.22 },
    'Catanzaro': { Gennaio: 2.03, Febbraio: 3.11, Marzo: 3.56, Aprile: 5.25, Maggio: 6.24, Giugno: 7.47, Luglio: 7.61, Agosto: 7.00, Settembre: 4.67, Ottobre: 3.47, Novembre: 2.19, Dicembre: 1.81 },
    'Chieti': { Gennaio: 1.64, Febbraio: 2.44, Marzo: 3.64, Aprile: 5.19, Maggio: 6.47, Giugno: 6.89, Luglio: 7.33, Agosto: 6.25, Settembre: 4.75, Ottobre: 3.28, Novembre: 1.89, Dicembre: 1.42 },
    'Como': { Gennaio: 1.28, Febbraio: 1.89, Marzo: 3.08, Aprile: 4.33, Maggio: 5.03, Giugno: 5.69, Luglio: 6.14, Agosto: 5.00, Settembre: 3.64, Ottobre: 2.50, Novembre: 1.36, Dicembre: 1.11 },
    'Cosenza': { Gennaio: 2.14, Febbraio: 3.28, Marzo: 4.81, Aprile: 6.06, Maggio: 7.14, Giugno: 8.22, Luglio: 8.03, Agosto: 7.22, Settembre: 5.56, Ottobre: 3.58, Novembre: 2.61, Dicembre: 2.14 },
    'Crotone': { Gennaio: 2.06, Febbraio: 2.97, Marzo: 4.03, Aprile: 5.36, Maggio: 6.53, Giugno: 7.25, Luglio: 7.39, Agosto: 6.75, Settembre: 4.97, Ottobre: 3.61, Novembre: 2.39, Dicembre: 1.78 },
    'Cremona': { Gennaio: 1.08, Febbraio: 1.89, Marzo: 3.19, Aprile: 4.67, Maggio: 5.69, Giugno: 6.61, Luglio: 6.94, Agosto: 5.61, Settembre: 3.97, Ottobre: 2.33, Novembre: 1.25, Dicembre: 0.92 },
    'Cuneo': { Gennaio: 1.53, Febbraio: 2.25, Marzo: 3.19, Aprile: 4.06, Maggio: 4.56, Giugno: 5.17, Luglio: 5.64, Agosto: 4.44, Settembre: 3.44, Ottobre: 2.42, Novembre: 1.64, Dicembre: 1.39 },
    'Enna': { Gennaio: 2.47, Febbraio: 3.31, Marzo: 4.47, Aprile: 5.86, Maggio: 7.14, Giugno: 7.94, Luglio: 7.94, Agosto: 7.19, Settembre: 5.50, Ottobre: 3.86, Novembre: 2.81, Dicembre: 2.19 },
    'Fermo': { Gennaio: 1.19, Febbraio: 2.11, Marzo: 3.36, Aprile: 5.08, Maggio: 6.42, Giugno: 6.69, Luglio: 7.22, Agosto: 6.11, Settembre: 4.44, Ottobre: 2.92, Novembre: 1.53, Dicembre: 1.14 }, // Usa dati Ancona
    'Ferrara': { Gennaio: 1.17, Febbraio: 2.06, Marzo: 3.22, Aprile: 4.67, Maggio: 5.75, Giugno: 6.47, Luglio: 7.00, Agosto: 5.72, Settembre: 4.19, Ottobre: 2.67, Novembre: 1.42, Dicembre: 1.08 },
    'Firenze': { Gennaio: 1.36, Febbraio: 2.06, Marzo: 3.28, Aprile: 4.58, Maggio: 5.64, Giugno: 6.42, Luglio: 6.67, Agosto: 5.53, Settembre: 4.19, Ottobre: 2.78, Novembre: 1.58, Dicembre: 1.14 },
    'Foggia': { Gennaio: 1.78, Febbraio: 2.75, Marzo: 3.97, Aprile: 5.64, Maggio: 6.97, Giugno: 7.72, Luglio: 7.89, Agosto: 6.94, Settembre: 5.22, Ottobre: 3.61, Novembre: 2.17, Dicembre: 1.53 },
    'Forlì-Cesena': { Gennaio: 1.22, Febbraio: 2.14, Marzo: 3.31, Aprile: 4.75, Maggio: 5.78, Giugno: 6.50, Luglio: 7.06, Agosto: 5.78, Settembre: 4.22, Ottobre: 2.72, Novembre: 1.44, Dicembre: 1.11 },
    'Frosinone': { Gennaio: 1.47, Febbraio: 2.22, Marzo: 3.42, Aprile: 4.86, Maggio: 5.92, Giugno: 6.64, Luglio: 7.19, Agosto: 6.22, Settembre: 4.67, Ottobre: 3.08, Novembre: 1.78, Dicembre: 1.28 },
    'Genova': { Gennaio: 1.47, Febbraio: 2.22, Marzo: 3.36, Aprile: 4.64, Maggio: 5.47, Giugno: 6.11, Luglio: 6.53, Agosto: 5.36, Settembre: 3.97, Ottobre: 2.75, Novembre: 1.72, Dicembre: 1.36 },
    'Gorizia': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.58, Maggio: 5.58, Giugno: 6.22, Luglio: 6.78, Agosto: 5.50, Settembre: 4.03, Ottobre: 2.61, Novembre: 1.39, Dicembre: 1.06 },
    'Grosseto': { Gennaio: 1.58, Febbraio: 2.39, Marzo: 3.61, Aprile: 5.06, Maggio: 6.19, Giugno: 6.94, Luglio: 7.39, Agosto: 6.36, Settembre: 4.75, Ottobre: 3.19, Novembre: 1.94, Dicembre: 1.47 },
    'Imperia': { Gennaio: 1.53, Febbraio: 2.33, Marzo: 3.50, Aprile: 4.78, Maggio: 5.61, Giugno: 6.25, Luglio: 6.67, Agosto: 5.47, Settembre: 4.03, Ottobre: 2.81, Novembre: 1.78, Dicembre: 1.42 },
    'Isernia': { Gennaio: 1.67, Febbraio: 2.50, Marzo: 3.72, Aprile: 5.17, Maggio: 6.42, Giugno: 6.89, Luglio: 7.33, Agosto: 6.25, Settembre: 4.75, Ottobre: 3.25, Novembre: 1.92, Dicembre: 1.44 },
    'La Spezia': { Gennaio: 1.42, Febbraio: 2.14, Marzo: 3.28, Aprile: 4.58, Maggio: 5.42, Giugno: 6.06, Luglio: 6.50, Agosto: 5.31, Settembre: 3.92, Ottobre: 2.69, Novembre: 1.67, Dicembre: 1.28 },
    'L\'Aquila': { Gennaio: 1.67, Febbraio: 2.33, Marzo: 3.33, Aprile: 4.11, Maggio: 5.36, Giugno: 5.86, Luglio: 6.56, Agosto: 5.58, Settembre: 4.36, Ottobre: 2.94, Novembre: 1.78, Dicembre: 1.42 },
    'Latina': { Gennaio: 1.61, Febbraio: 2.47, Marzo: 3.72, Aprile: 5.25, Maggio: 6.42, Giugno: 7.14, Luglio: 7.69, Agosto: 6.67, Settembre: 4.97, Ottobre: 3.36, Novembre: 1.97, Dicembre: 1.47 },
    'Lecce': { Gennaio: 1.94, Febbraio: 2.92, Marzo: 4.19, Aprile: 5.92, Maggio: 7.25, Giugno: 8.00, Luglio: 8.17, Agosto: 7.22, Settembre: 5.47, Ottobre: 3.78, Novembre: 2.31, Dicembre: 1.67 },
    'Lecco': { Gennaio: 1.25, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 }, // Usa dati Como/Bergamo
    'Livorno': { Gennaio: 1.47, Febbraio: 2.25, Marzo: 3.42, Aprile: 4.75, Maggio: 5.72, Giugno: 6.42, Luglio: 6.83, Agosto: 5.69, Settembre: 4.25, Ottobre: 2.86, Novembre: 1.69, Dicembre: 1.25 },
    'Lodi': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 }, // Usa dati Milano
    'Lucca': { Gennaio: 1.36, Febbraio: 2.06, Marzo: 3.25, Aprile: 4.53, Maggio: 5.56, Giugno: 6.31, Luglio: 6.56, Agosto: 5.47, Settembre: 4.14, Ottobre: 2.72, Novembre: 1.56, Dicembre: 1.11 },
    'Macerata': { Gennaio: 1.31, Febbraio: 2.19, Marzo: 3.47, Aprile: 4.97, Maggio: 6.25, Giugno: 6.58, Luglio: 7.11, Agosto: 6.00, Settembre: 4.36, Ottobre: 2.89, Novembre: 1.58, Dicembre: 1.19 },
    'Mantova': { Gennaio: 1.11, Febbraio: 1.94, Marzo: 3.19, Aprile: 4.58, Maggio: 5.58, Giugno: 6.28, Luglio: 6.83, Agosto: 5.50, Settembre: 3.97, Ottobre: 2.47, Novembre: 1.33, Dicembre: 1.00 },
    'Massa-Carrara': { Gennaio: 1.39, Febbraio: 2.14, Marzo: 3.33, Aprile: 4.67, Maggio: 5.61, Giugno: 6.36, Luglio: 6.72, Agosto: 5.58, Settembre: 4.19, Ottobre: 2.78, Novembre: 1.64, Dicembre: 1.22 },
    'Matera': { Gennaio: 1.89, Febbraio: 2.86, Marzo: 4.08, Aprile: 5.75, Maggio: 7.08, Giugno: 7.78, Luglio: 7.94, Agosto: 7.00, Settembre: 5.28, Ottobre: 3.67, Novembre: 2.25, Dicembre: 1.58 },
    'Medio Campidano': { Gennaio: 2.03, Febbraio: 2.72, Marzo: 4.00, Aprile: 5.14, Maggio: 6.25, Giugno: 6.94, Luglio: 7.58, Agosto: 6.64, Settembre: 4.89, Ottobre: 3.39, Novembre: 2.25, Dicembre: 1.78 }, // Usa dati Cagliari
    'Messina': { Gennaio: 2.39, Febbraio: 3.25, Marzo: 4.39, Aprile: 5.72, Maggio: 7.03, Giugno: 7.78, Luglio: 7.78, Agosto: 7.00, Settembre: 5.36, Ottobre: 3.78, Novembre: 2.72, Dicembre: 2.17 },
    'Milano': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 },
    'Modena': { Gennaio: 1.22, Febbraio: 2.14, Marzo: 3.33, Aprile: 4.78, Maggio: 5.81, Giugno: 6.53, Luglio: 7.08, Agosto: 5.81, Settembre: 4.25, Ottobre: 2.75, Novembre: 1.47, Dicembre: 1.14 },
    'Monza e della Brianza': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 }, // Usa dati Milano
    'Napoli': { Gennaio: 1.83, Febbraio: 2.64, Marzo: 3.97, Aprile: 5.36, Maggio: 6.58, Giugno: 7.47, Luglio: 7.67, Agosto: 6.69, Settembre: 5.03, Ottobre: 3.53, Novembre: 2.14, Dicembre: 1.61 },
    'Novara': { Gennaio: 1.17, Febbraio: 1.94, Marzo: 3.14, Aprile: 4.36, Maggio: 5.11, Giugno: 5.69, Luglio: 6.22, Agosto: 4.97, Settembre: 3.67, Ottobre: 2.39, Novembre: 1.47, Dicembre: 1.08 },
    'Nuoro': { Gennaio: 1.92, Febbraio: 2.64, Marzo: 3.92, Aprile: 5.06, Maggio: 6.17, Giugno: 6.89, Luglio: 7.53, Agosto: 6.58, Settembre: 4.83, Ottobre: 3.33, Novembre: 2.19, Dicembre: 1.72 },
    'Ogliastra': { Gennaio: 1.92, Febbraio: 2.64, Marzo: 3.92, Aprile: 5.06, Maggio: 6.17, Giugno: 6.89, Luglio: 7.53, Agosto: 6.58, Settembre: 4.83, Ottobre: 3.33, Novembre: 2.19, Dicembre: 1.72 }, // Usa dati Nuoro
    'Olbia-Tempio': { Gennaio: 2.00, Febbraio: 2.69, Marzo: 3.97, Aprile: 5.11, Maggio: 6.22, Giugno: 6.92, Luglio: 7.56, Agosto: 6.61, Settembre: 4.86, Ottobre: 3.36, Novembre: 2.22, Dicembre: 1.75 }, // Usa dati Sassari
    'Oristano': { Gennaio: 2.00, Febbraio: 2.69, Marzo: 3.97, Aprile: 5.11, Maggio: 6.22, Giugno: 6.92, Luglio: 7.56, Agosto: 6.61, Settembre: 4.86, Ottobre: 3.36, Novembre: 2.22, Dicembre: 1.75 },
    'Padova': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.67, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 },
    'Palermo': { Gennaio: 2.42, Febbraio: 3.31, Marzo: 4.44, Aprile: 5.75, Maggio: 7.08, Giugno: 7.83, Luglio: 7.83, Agosto: 7.06, Settembre: 5.42, Ottobre: 3.83, Novembre: 2.78, Dicembre: 2.22 },
    'Parma': { Gennaio: 1.19, Febbraio: 2.06, Marzo: 3.28, Aprile: 4.69, Maggio: 5.69, Giugno: 6.42, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.61, Novembre: 1.39, Dicembre: 1.08 },
    'Pavia': { Gennaio: 1.11, Febbraio: 1.83, Marzo: 3.03, Aprile: 4.33, Maggio: 5.22, Giugno: 5.83, Luglio: 6.39, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.39, Novembre: 1.25, Dicembre: 0.97 },
    'Perugia': { Gennaio: 1.47, Febbraio: 2.25, Marzo: 3.42, Aprile: 4.81, Maggio: 5.86, Giugno: 6.58, Luglio: 7.03, Agosto: 6.00, Settembre: 4.47, Ottobre: 2.97, Novembre: 1.69, Dicembre: 1.28 },
    'Pesaro Urbino': { Gennaio: 1.28, Febbraio: 2.19, Marzo: 3.42, Aprile: 4.92, Maggio: 6.17, Giugno: 6.47, Luglio: 7.00, Agosto: 5.89, Settembre: 4.28, Ottobre: 2.81, Novembre: 1.56, Dicembre: 1.17 },
    'Pescara': { Gennaio: 1.69, Febbraio: 2.50, Marzo: 3.75, Aprile: 5.25, Maggio: 6.53, Giugno: 6.94, Luglio: 7.39, Agosto: 6.31, Settembre: 4.81, Ottobre: 3.31, Novembre: 1.94, Dicembre: 1.47 },
    'Piacenza': { Gennaio: 1.17, Febbraio: 2.00, Marzo: 3.22, Aprile: 4.61, Maggio: 5.58, Giugno: 6.28, Luglio: 6.83, Agosto: 5.50, Settembre: 3.97, Ottobre: 2.50, Novembre: 1.36, Dicembre: 1.06 },
    'Pisa': { Gennaio: 1.42, Febbraio: 2.14, Marzo: 3.36, Aprile: 4.67, Maggio: 5.67, Giugno: 6.39, Luglio: 6.78, Agosto: 5.64, Settembre: 4.19, Ottobre: 2.81, Novembre: 1.64, Dicembre: 1.22 },
    'Pistoia': { Gennaio: 1.33, Febbraio: 2.03, Marzo: 3.22, Aprile: 4.47, Maggio: 5.50, Giugno: 6.25, Luglio: 6.50, Agosto: 5.39, Settembre: 4.08, Ottobre: 2.67, Novembre: 1.53, Dicembre: 1.08 },
    'Pordenone': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.58, Maggio: 5.58, Giugno: 6.22, Luglio: 6.78, Agosto: 5.50, Settembre: 4.03, Ottobre: 2.61, Novembre: 1.39, Dicembre: 1.06 }, // Usa dati Gorizia/Udine
    'Potenza': { Gennaio: 1.78, Febbraio: 2.75, Marzo: 3.97, Aprile: 5.64, Maggio: 6.97, Giugno: 7.72, Luglio: 7.89, Agosto: 6.94, Settembre: 5.22, Ottobre: 3.61, Novembre: 2.17, Dicembre: 1.53 },
    'Prato': { Gennaio: 1.33, Febbraio: 2.03, Marzo: 3.22, Aprile: 4.47, Maggio: 5.50, Giugno: 6.25, Luglio: 6.50, Agosto: 5.39, Settembre: 4.08, Ottobre: 2.67, Novembre: 1.53, Dicembre: 1.08 }, // Usa dati Firenze/Pistoia
    'Ragusa': { Gennaio: 2.50, Febbraio: 3.32, Marzo: 4.47, Aprile: 5.81, Maggio: 7.11, Giugno: 7.86, Luglio: 7.86, Agosto: 7.08, Settembre: 5.44, Ottobre: 3.86, Novembre: 2.81, Dicembre: 2.22 },
    'Ravenna': { Gennaio: 1.17, Febbraio: 2.06, Marzo: 3.22, Aprile: 4.67, Maggio: 5.75, Giugno: 6.47, Luglio: 7.00, Agosto: 5.72, Settembre: 4.19, Ottobre: 2.67, Novembre: 1.42, Dicembre: 1.08 },
    'Reggio Calabria': { Gennaio: 2.25, Febbraio: 3.19, Marzo: 4.31, Aprile: 5.67, Maggio: 6.94, Giugno: 7.69, Luglio: 7.86, Agosto: 6.97, Settembre: 5.31, Ottobre: 3.75, Novembre: 2.67, Dicembre: 2.08 },
    'Reggio Emilia': { Gennaio: 1.19, Febbraio: 2.08, Marzo: 3.28, Aprile: 4.72, Maggio: 5.75, Giugno: 6.47, Luglio: 7.00, Agosto: 5.72, Settembre: 4.19, Ottobre: 2.72, Novembre: 1.44, Dicembre: 1.11 },
    'Rieti': { Gennaio: 1.53, Febbraio: 2.31, Marzo: 3.50, Aprile: 4.92, Maggio: 6.00, Giugno: 6.72, Luglio: 7.28, Agosto: 6.28, Settembre: 4.75, Ottobre: 3.14, Novembre: 1.83, Dicembre: 1.36 },
    'Rimini': { Gennaio: 1.25, Febbraio: 2.17, Marzo: 3.39, Aprile: 4.83, Maggio: 5.86, Giugno: 6.58, Luglio: 7.14, Agosto: 5.86, Settembre: 4.31, Ottobre: 2.78, Novembre: 1.50, Dicembre: 1.14 },
    'Roma': { Gennaio: 1.64, Febbraio: 2.50, Marzo: 3.75, Aprile: 5.28, Maggio: 6.47, Giugno: 7.22, Luglio: 7.78, Agosto: 6.78, Settembre: 5.08, Ottobre: 3.42, Novembre: 2.03, Dicembre: 1.50 },
    'Rovigo': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.67, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 },
    'Salerno': { Gennaio: 1.89, Febbraio: 2.78, Marzo: 4.11, Aprile: 5.47, Maggio: 6.69, Giugno: 7.58, Luglio: 7.78, Agosto: 6.78, Settembre: 5.11, Ottobre: 3.61, Novembre: 2.22, Dicembre: 1.67 },
    'Sassari': { Gennaio: 2.00, Febbraio: 2.69, Marzo: 3.97, Aprile: 5.11, Maggio: 6.22, Giugno: 6.92, Luglio: 7.56, Agosto: 6.61, Settembre: 4.86, Ottobre: 3.36, Novembre: 2.22, Dicembre: 1.75 },
    'Savona': { Gennaio: 1.53, Febbraio: 2.33, Marzo: 3.50, Aprile: 4.78, Maggio: 5.61, Giugno: 6.25, Luglio: 6.67, Agosto: 5.47, Settembre: 4.03, Ottobre: 2.81, Novembre: 1.78, Dicembre: 1.42 },
    'Siena': { Gennaio: 1.47, Febbraio: 2.22, Marzo: 3.42, Aprile: 4.75, Maggio: 5.78, Giugno: 6.53, Luglio: 6.83, Agosto: 5.69, Settembre: 4.25, Ottobre: 2.81, Novembre: 1.64, Dicembre: 1.22 },
    'Siracusa': { Gennaio: 2.56, Febbraio: 3.42, Marzo: 4.56, Aprile: 5.92, Maggio: 7.22, Giugno: 7.97, Luglio: 7.97, Agosto: 7.19, Settembre: 5.56, Ottobre: 3.92, Novembre: 2.86, Dicembre: 2.28 },
    'Sondrio': { Gennaio: 1.19, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 }, // Usa dati Como/Bergamo
    'Taranto': { Gennaio: 1.94, Febbraio: 2.92, Marzo: 4.19, Aprile: 5.92, Maggio: 7.25, Giugno: 8.00, Luglio: 8.17, Agosto: 7.22, Settembre: 5.47, Ottobre: 3.78, Novembre: 2.31, Dicembre: 1.67 },
    'Teramo': { Gennaio: 1.58, Febbraio: 2.42, Marzo: 3.67, Aprile: 5.11, Maggio: 6.39, Giugno: 6.83, Luglio: 7.28, Agosto: 6.19, Settembre: 4.69, Ottobre: 3.22, Novembre: 1.86, Dicembre: 1.39 },
    'Terni': { Gennaio: 1.53, Febbraio: 2.31, Marzo: 3.50, Aprile: 4.92, Maggio: 6.00, Giugno: 6.72, Luglio: 7.28, Agosto: 6.28, Settembre: 4.75, Ottobre: 3.14, Novembre: 1.83, Dicembre: 1.36 },
    'Torino': { Gennaio: 1.25, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 },
    'Trapani': { Gennaio: 2.47, Febbraio: 3.39, Marzo: 4.50, Aprile: 5.86, Maggio: 7.14, Giugno: 7.92, Luglio: 7.92, Agosto: 7.14, Settembre: 5.47, Ottobre: 3.89, Novembre: 2.83, Dicembre: 2.25 },
    'Trento': { Gennaio: 1.25, Febbraio: 2.28, Marzo: 3.53, Aprile: 4.58, Maggio: 5.64, Giugno: 5.92, Luglio: 6.25, Agosto: 5.14, Settembre: 3.94, Ottobre: 2.58, Novembre: 1.42, Dicembre: 1.08 },
    'Treviso': { Gennaio: 1.17, Febbraio: 2.06, Marzo: 3.28, Aprile: 4.69, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 },
    'Trieste': { Gennaio: 1.19, Febbraio: 2.08, Marzo: 3.31, Aprile: 4.72, Maggio: 5.75, Giugno: 6.42, Luglio: 6.97, Agosto: 5.64, Settembre: 4.14, Ottobre: 2.67, Novembre: 1.42, Dicembre: 1.08 },
    'Udine': { Gennaio: 1.17, Febbraio: 2.06, Marzo: 3.28, Aprile: 4.69, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 },
    'Varese': { Gennaio: 1.25, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 },
    'Venezia': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.67, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 },
    'Verbano-Cusio-Ossola': { Gennaio: 1.22, Febbraio: 1.97, Marzo: 3.17, Aprile: 4.39, Maggio: 5.14, Giugno: 5.75, Luglio: 6.25, Agosto: 5.03, Settembre: 3.69, Ottobre: 2.47, Novembre: 1.36, Dicembre: 1.11 },
    'Vercelli': { Gennaio: 1.17, Febbraio: 1.94, Marzo: 3.14, Aprile: 4.36, Maggio: 5.11, Giugno: 5.69, Luglio: 6.22, Agosto: 4.97, Settembre: 3.67, Ottobre: 2.39, Novembre: 1.47, Dicembre: 1.08 },
    'Verona': { Gennaio: 1.19, Febbraio: 2.08, Marzo: 3.31, Aprile: 4.72, Maggio: 5.75, Giugno: 6.42, Luglio: 6.97, Agosto: 5.64, Settembre: 4.14, Ottobre: 2.67, Novembre: 1.42, Dicembre: 1.08 },
    'Vibo Valentia': { Gennaio: 2.08, Febbraio: 3.19, Marzo: 4.39, Aprile: 5.78, Maggio: 7.08, Giugno: 7.78, Luglio: 7.94, Agosto: 7.00, Settembre: 5.36, Ottobre: 3.75, Novembre: 2.67, Dicembre: 2.08 },
    'Vicenza': { Gennaio: 1.17, Febbraio: 2.06, Marzo: 3.28, Aprile: 4.69, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 },
    'Viterbo': { Gennaio: 1.58, Febbraio: 2.42, Marzo: 3.67, Aprile: 5.17, Maggio: 6.33, Giugno: 7.06, Luglio: 7.61, Agosto: 6.61, Settembre: 4.92, Ottobre: 3.28, Novembre: 1.92, Dicembre: 1.44 },
    // Aggiungi qui tutte le altre province, duplicando i dati di una provincia vicina se non trovi dati specifici.
    // Ho replicato alcuni dati per coprire i codici provincia.
};

const provinceData = [
    { value: "84", label: "Agrigento" }, { value: "6", label: "Alessandria" }, { value: "42", label: "Ancona" }, { value: "7", label: "Aosta" },
    { value: "51", label: "Arezzo" }, { value: "44", label: "Ascoli Piceno" }, { value: "5", label: "Asti" }, { value: "64", label: "Avellino" },
    { value: "72", label: "Bari" }, { value: "110", label: "Barletta-Andria-Trani" }, { value: "25", label: "Belluno" }, { value: "62", label: "Benevento" },
    { value: "16", label: "Bergamo" }, { value: "96", label: "Biella" }, { value: "37", label: "Bologna" }, { value: "21", label: "Bolzano" },
    { value: "17", label: "Brescia" }, { value: "74", label: "Brindisi" }, { value: "92", label: "Cagliari" }, { value: "85", label: "Caltanissetta" },
    { value: "70", label: "Campobasso" }, { value: "107", label: "Carbonia-Iglesias" }, { value: "61", label: "Caserta" }, { value: "87", label: "Catania" },
    { value: "79", label: "Catanzaro" }, { value: "69", label: "Chieti" }, { value: "13", label: "Como" }, { value: "78", label: "Cosenza" },
    { value: "19", label: "Cremona" }, { value: "101", label: "Crotone" }, { value: "4", label: "Cuneo" }, { value: "86", label: "Enna" },
    { value: "109", label: "Fermo" }, { value: "38", label: "Ferrara" }, { value: "48", label: "Firenze" }, { value: "71", label: "Foggia" },
    { value: "40", label: "Forlì-Cesena" }, { value: "60", label: "Frosinone" }, { value: "10", label: "Genova" }, { value: "31", label: "Gorizia" },
    { value: "53", label: "Grosseto" }, { value: "8", label: "Imperia" }, { value: "94", label: "Isernia" }, { value: "11", label: "La Spezia" },
    { value: "66", label: "L'Aquila" }, { value: "59", label: "Latina" }, { value: "75", label: "Lecce" }, { value: "97", label: "Lecco" },
    { value: "49", label: "Livorno" }, { value: "98", label: "Lodi" }, { value: "46", label: "Lucca" }, { value: "43", label: "Macerata" },
    { value: "20", label: "Mantova" }, { value: "45", label: "Massa-Carrara" }, { value: "77", label: "Matera" }, { value: "106", label: "Medio Campidano" },
    { value: "83", label: "Messina" }, { value: "15", label: "Milano" }, { value: "36", label: "Modena" }, { value: "108", label: "Monza e della Brianza" },
    { value: "63", label: "Napoli" }, { value: "3", label: "Novara" }, { value: "91", label: "Nuoro" }, { value: "105", label: "Ogliastra" },
    { value: "104", label: "Olbia-Tempio" }, { value: "95", label: "Oristano" }, { value: "28", label: "Padova" }, { value: "82", label: "Palermo" },
    { value: "34", label: "Parma" }, { value: "18", label: "Pavia" }, { value: "54", label: "Perugia" }, { value: "41", label: "Pesaro Urbino" },
    { value: "68", label: "Pescara" }, { value: "33", label: "Piacenza" }, { value: "50", label: "Pisa" }, { value: "47", label: "Pistoia" },
    { value: "93", label: "Pordenone" }, { value: "76", label: "Potenza" }, { value: "100", label: "Prato" }, { value: "88", label: "Ragusa" },
    { value: "39", label: "Ravenna" }, { value: "80", label: "Reggio Calabria" }, { value: "35", label: "Reggio Emilia" }, { value: "57", label: "Rieti" },
    { value: "99", label: "Rimini" }, { value: "58", label: "Roma" }, { value: "29", label: "Rovigo" }, { value: "65", label: "Salerno" },
    { value: "90", label: "Sassari" }, { value: "9", label: "Savona" }, { value: "52", label: "Siena" }, { value: "89", label: "Siracusa" },
    { value: "14", label: "Sondrio" }, { value: "73", label: "Taranto" }, { value: "67", label: "Teramo" }, { value: "55", label: "Terni" },
    { value: "1", label: "Torino" }, { value: "81", label: "Trapani" }, { value: "22", label: "Trento" }, { value: "26", label: "Treviso" },
    { value: "32", label: "Trieste" }, { value: "30", label: "Udine" }, { value: "12", label: "Varese" }, { value: "27", label: "Venezia" },
    { value: "103", label: "Verbano-Cusio-Ossola" }, { value: "2", label: "Vercelli" }, { value: "23", label: "Verona" }, { value: "102", label: "Vibo Valentia" },
    { value: "24", label: "Vicenza" }, { value: "56", label: "Viterbo" },
];

const provinceCodeToName: { [key: string]: string } = provinceData.reduce((acc, curr) => {
    acc[curr.value] = curr.label;
    return acc;
}, {} as { [key: string]: string });

// --- Funzioni di Calcolo ---
const calculateMonthlyProducibility_1kWp = (dailyIrradianceData: { [month: string]: number }): { [month: string]: number } => {
    const monthsOrder = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                         'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const producibility: { [month: string]: number } = {};
    const daysInMonth = {
        Gennaio: 31, Febbraio: 28.25, Marzo: 31, Aprile: 30, Maggio: 31, Giugno: 30,
        Luglio: 31, Agosto: 31, Settembre: 30, Ottobre: 31, Novembre: 30, Dicembre: 31,
    };
    const performanceRatio = 0.80; // Efficienza media dell'impianto (tipicamente tra 0.75 e 0.85)

    monthsOrder.forEach(month => {
        const irradiance = dailyIrradianceData[month];
        // Producibilità in kWh per 1 kWp di potenza installata, per il mese.
        // Assumiamo che l'irraggiamento sia già sul piano ottimale.
        producibility[month] = irradiance * daysInMonth[month as keyof typeof daysInMonth] * performanceRatio;
    });
    return producibility;
};

// Coefficienti di correzione semplificati per Azimuth (orientamento)
// Questi sono molto generici e dovrebbero essere derivati da simulazioni più precise (e.g., PVGIS)
// Si basano su una riduzione rispetto all'orientamento SUD (0°).
const getAzimuthCorrectionFactor = (azimuth: string): number => {
    switch (azimuth) {
        case "0": return 1.0;   // SUD
        case "15": return 0.99; // +/- 15°
        case "30": return 0.97; // +/- 30°
        case "45": return 0.93; // +/- 45°
        case "90": return 0.85; // EST/OVEST
        default: return 1.0;
    }
};

// Coefficienti di correzione semplificati per Tilt (inclinazione)
// Questi sono molto generici e dovrebbero essere derivati da simulazioni più precise (e.g., PVGIS)
// Si basano su una riduzione rispetto all'inclinazione ottimale (che varia con la latitudine, ma qui è fissa per semplicità).
const getTiltCorrectionFactor = (tilt: string): number => {
    switch (tilt) {
        case "0": return 0.85;  // Orizzontale (meno efficiente)
        case "10": return 0.95;
        case "15": return 0.98;
        case "20": return 0.99; // Spesso vicino all'ottimale per molte latitudini italiane
        case "30": return 1.0;  // Assunto come ottimale per riferimento
        case "90": return 0.60; // Verticale (molto meno efficiente)
        default: return 1.0;
    }
};

// Genera i dati di producibilità per tutte le province, basandosi sull'irraggiamento
const fullProducibilityDataByProvince: { [provinceCode: string]: { [month: string]: number } } = {};
for (const provinceCode in provinceCodeToName) {
    const provinceName = provinceCodeToName[provinceCode];
    // Se non troviamo dati specifici per la provincia, cerchiamo un nome simile o usiamo un fallback generico
    const irradianceData = dailyIrradiance_kWh_per_sqm_per_day[provinceName] || dailyIrradiance_kWh_per_sqm_per_day['Roma']; // Fallback su Roma

    if (irradianceData) {
        fullProducibilityDataByProvince[provinceCode] = calculateMonthlyProducibility_1kWp(irradianceData);
    } else {
        // In caso eccezionale, se il fallback non funziona, assegna zero per evitare errori
        console.warn(`Fallback for province ${provinceName} failed. Assigning zero producibility.`);
        fullProducibilityDataByProvince[provinceCode] = { Gennaio: 0, Febbraio: 0, Marzo: 0, Aprile: 0, Maggio: 0, Giugno: 0, Luglio: 0, Agosto: 0, Settembre: 0, Ottobre: 0, Novembre: 0, Dicembre: 0 };
    }
}


// --- Componente React ---
interface ProducibilityRow {
    periodo: string;
    kwh: string;
    backgroundColor?: string;
}

interface ResumeData {
    location: string;
    power: string;
}

const FotovoltaicoPage: React.FC = () => {
    const [province, setProvince] = useState<string>('');
    const [azimuth, setAzimuth] = useState<string>('0'); // Default SUD
    const [tilt, setTilt] = useState<string>('30');     // Default 30°
    const [potenza, setPotenza] = useState<string>('');
    const [producibilityData, setProducibilityData] = useState<ProducibilityRow[] | null>(null);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { [key: string]: string } = {};

        if (!province) errors.province = 'Seleziona una provincia.';
        const parsedPotenza = parseFloat(potenza);
        if (isNaN(parsedPotenza) || parsedPotenza <= 0) {
            errors.potenza = 'Inserisci una potenza valida (es. 3, 6.5).';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setProducibilityData(null);
            setResumeData(null);
            return;
        }

        setValidationErrors({});

        const baseProducibilityForSelectedProvince = fullProducibilityDataByProvince[province];

        if (!baseProducibilityForSelectedProvince || Object.values(baseProducibilityForSelectedProvince).every(val => val === 0)) {
            setValidationErrors(prev => ({ ...prev, province: 'Dati di producibilità non disponibili o incompleti per questa provincia. Prova a selezionare un\'altra provincia.' }));
            setProducibilityData(null);
            setResumeData(null);
            return;
        }

        const currentPower = parsedPotenza;
        const azimuthFactor = getAzimuthCorrectionFactor(azimuth);
        const tiltFactor = getTiltCorrectionFactor(tilt);

        let totalAnnual = 0;
        const monthsOrder = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                             'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

        const calculatedData: ProducibilityRow[] = monthsOrder.map(month => {
            const kwh_for_1kWp_optimal_orientation = baseProducibilityForSelectedProvince[month];

            // Applica i fattori di correzione per l'orientamento e l'inclinazione
            const finalMonthlyKwh = kwh_for_1kWp_optimal_orientation * currentPower * azimuthFactor * tiltFactor;

            totalAnnual += finalMonthlyKwh;
            return { periodo: month, kwh: finalMonthlyKwh.toFixed(2).replace('.', ',') };
        });

        // Aggiungi la riga del totale annuale
        calculatedData.push({ periodo: 'Totale Anno', kwh: totalAnnual.toFixed(2).replace('.', ','), backgroundColor: '#e0e0e0' });

        setProducibilityData(calculatedData);
        setResumeData({
            location: provinceCodeToName[province] || `Provincia (Codice: ${province})`,
            power: `${potenza} kW`,
        });
    };

  return (
    <div className="bg-black min-h-screen text-gray-500">
       {/* Navbar */}
     <nav className="bg-black text-white py-1 px-4 sm:px-6 flex flex-wrap justify-between items-center shadow-lg">
  <div className="flex items-center gap-1 min-w-[220px]">
    <a href="/">
      <Image src="/logo faccio tutto 3.png" alt="Logo Faccio Tutto" width={160} height={160} className="rounded" />
    </a>
    <h1 className="text-base sm:text-xl font-normal flex items-center gap-2">
      faccio-tutto.it
      <a href="https://www.instagram.com/infofacciotutto/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Link">
        <FaInstagramSquare className="text-lg sm:text-xl" />
      </a>
      <a href="https://www.linkedin.com/company/faccio-tutto/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Link">
        <FaLinkedin className="text-lg sm:text-xl" />
      </a>
    </h1>
  </div>

  {/* Scrollable menu on small screens */}
  <ul className="flex gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible w-full sm:w-auto mt-2 sm:mt-0 text-sm sm:text-base">
    {[
      { name: "Home", href: "/" },
      { name: "Mission", href: "/mission" },
      { name: "Vision", href: "/vision" },
      { name: "Chi siamo", href: "/chisiamo" },
      { name: "Affiliazione", href: "/affiliazione" },
      { name: "Contatti", href: "/contatti" },
    ].map((link) => (
      <li key={link.href} className="whitespace-nowrap">
        <a href={link.href} className="hover:underline">{link.name}</a>
      </li>
    ))}
  </ul>
</nav>

{/* Contenitore principale della pagina con layout a colonne */}  
      <div className="flex-col md:flex-row p-4 md:p-8 gap-8 flex"> {/* Added 'flex' here to enable flexbox layout */}

  {/* Pulsanti laterali a sinistra */}
 <aside className="hidden md:block sticky top-4 h-fit w-full md:w-1/4 lg:w-1/8 xl:w-1/6 z-10 bg-gray-200 p-4 rounded-lg shadow-lg">
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg space-y-4 flex flex-col items-center">
            {[{
              id: "progettazione",
              icon: <FaDraftingCompass className="text-3xl mb-0 text-purple-500" />,
              title: "Progettazione architettonica",
              link: "/progettazione"
            }, {
              id: "fotovoltaico",
              icon: <FaSolarPanel className="text-3xl mb-0 text-yellow-500" />,
              title: "Impianti fotovoltaici",
              link: "/fotovoltaico"
            }, {
              id: "infissi",
              icon: <FaDoorOpen className="text-3xl mb-0 text-orange-900" />,
              title: "Vendita e installazione infissi",
              link: "/infissi"
            }, {
              id: "riparazione-elettrodomestici",
              icon: <FaPlug className="text-3xl mb-0 text-orange-500" />,
              title: "Riparazione elettrodomestici",
              link: "/riparazione-elettrodomestici"
            }, {
              id: "riparazioni-veloci",
              icon: <FaWrench className="text-3xl mb-0 text-blue-500" />,
              title: "Riparazioni veloci",
              link: "/riparazioni-veloci"
            }, {
              id: "contatti",
              icon: <FaPhone className="text-3xl mb-0 text-green-500" />,
              title: "Prenota subito",
              link: "/prenota"
            }].map(service => (
                <Link href={service.link} key={service.id} className="block transform transition duration-300 hover:scale-105 w-full">
                    <CustomCard className="bg-white border border-gray-200 p-0"> {/* Aggiunto bg-white, border e p-0 qui */}
                        <CustomCardContent className="p-4 text-center flex flex-col justify-center items-center">
                            <div className="rounded-full p-3 shadow-md bg-white">
                                {service.icon}
                            </div>
                            <h3 className={`text-sm font-semibold mt-2 text-gray-800`}>{service.title}</h3>
                        </CustomCardContent>
                    </CustomCard>
                </Link>
            ))}
          </div>
        </aside>


        {/* Colonna principale: Contenuto della pagina, compreso il modulo */}
        <main className="flex-1 min-w-0"> {/* This div will occupy the remaining space */}

          {/* Hero Section */}
          <section className="relative text-white py-8 text-center md:py-20">
            <motion.h1
              className="text-3xl font-bold text-yellow-400 mt-8 sm:mt-12 md:mt-20"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Impianto Fotovoltaico
              <br/> investi nel tuo futuro rispettando l'ambiente
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-justify p-4 rounded-lg text-3xl px-4 md:px-20 text-yellow-400"
              style={{ fontSize: "1.2rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Scegliere un impianto fotovoltaico significa abbracciare un futuro di energia pulita, indipendenza economica e responsabilità ambientale. 
              Immagina di ridurre drasticamente le tue bollette elettriche fino al 90%, producendo energia direttamente dal sole. Un investimento 
              intelligente che si ripaga in pochi anni, grazie alla detrazione fiscale in 10 anni del 50% dell'importo. Se abiti in un comune con meno di 50.000 abitanti, 
              potrai inoltre installare un impianto fotovoltaico con un contributo a fondo perduto del 40% delle spese ammissibili, grazie al PNRR. Per accedere a 
              questo incentivo, è necessario far parte di una Comunità Energetica Rinnovabile (CER). Noi facciamo parte di "Semplicemente Comunità" 
              che è un’associazione no profit di Comunità Energetiche Rinnovabili che operano su tutto il territorio nazionale. Unisciti anche tu alla rivoluzione energetica e ricevi un incentivo 
              per l'energia prodotta dal tuo impianto fotovoltaico o per l'energia consumata all'interno della comunità. 
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
              <a href="#modulo-contatti">
                <Button className="bg-blue-500 text-white text-l font-semibold hover:bg-blue-600">Contattaci subito</Button>
              </a>
            </motion.div>

            {/* Sezione Vantaggi */}
            <div className="grid md:grid-cols-1 gap-6 items-center max-w-6xl mx-auto mt-6"></div>
            <div className="text-2xl text-yellow-400 font-bold flex justify-center gap-6 mt-14">Scopri tutti i vantaggi che ti offre un'impianto fotovoltaico</div>
            <div className="grid md:grid-cols-3 gap-6 mt-8 px-8 max-w-6xl mx-auto text-gray-500">
              {[{
                img: "/bolletta.jpeg", title: "Risparmio sulla bolletta", text: "Riduci i costi della bolletta fino al 90% grazie all'autoproduzione."
              }, {
                img: "/clean-energy.jpeg", title: "Energia Pulita", text: "Produci energia rinnovabile e riduci la dipendenza dai combustibili fossili."
              }, {
                img: "/eco-friendly.jpeg", title: "Salvaguardia dell'Ambiente", text: "Riduci le emissioni di CO₂ e contribuisci a un pianeta più verde."
              }].map((item, index) => (
                <Card key={index}>
                  <img src={item.img} alt={item.title} className="w-full h-48 object-cover shadow-lg bg-[#1E1E1E] text-[#D1D1D1]" />
                  <CardContent>
                    <div className="p-6">
                      <div className="text-xl font-semibold text-[#FFD700]">{item.title}</div>
                      <div className="text-gray-500 mt-2">{item.text}</div> {/* Corrected typo: texty-gray-500 to text-gray-500 */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sezione Video */}
          <section className="py-12 px-4 md:px-20 text-center">
  <div className="text-yellow-400 text-2xl font-semibold mb-8">Guarda il nostro video esplicativo</div>
  <video
    className="w-full max-w-xl mx-auto rounded-lg shadow-lg"
    controls
    preload="metadata"
  >
    <source src="/video/Analisi risparmio energetico e finanziario impianto fotovoltaico Sicilia.mp4" type="video/mp4" />
    Il tuo browser non supporta il video.
  </video>
</section>

          {/* Sezione Servizi */}
          <section className="py-10 px-8 max-w-6xl mx-auto">
            <div className="font-bold text-center text-yellow-400" style={{ fontSize: "1.7rem" }}>
              Perchè scegliere noi?
            </div>
            <div className="font-bold text-center text-gray-500" style={{ fontSize: "1.2rem" }}>
              Scopri quanto puoi risparmiare con un impianto fotovoltaico, ti offriamo un servizio completo e senza pensieri:
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: "Sopralluogo e progettazione personalizzata",
                  description: "Analizziamo le tue esigenze e progettiamo l'impianto perfetto per la tua abitazione o azienda, creando una soluzione su misura che rispecchia le tue specifiche necessità e preferenze.",
                },
                {
                  title: "Installazione professionale",
                  description: "Il nostro team di esperti si occupa dell'installazione, garantendo la massima efficienza e sicurezza grazie al sistema di monitoraggio remoto, per ottimizzare la produzione di energia e massimizzare il tuo risparmio.",
                },
                {
                  title: "Gestione pratiche amministrative",
                  description: "Ci occupiamo di tutte le pratiche amministrative (E-distribuzione, Terna, ENEA e GSE), risparmiandoti tempo e stress.",
                },
                {
                  title: "Smaltimento moduli a fine vita",
                  description: "Pensiamo anche al futuro, garantendo lo smaltimento ecologico dei moduli, nel pieno rispetto delle normative e dell'ambiente.",
                },
              ].map((service, index) => (
                <div key={index} className="shadow-lg bg-white rounded-lg">
                  <Card>
                    <CardContent>
                      <div className="p-6">
                        <CheckCircle className="text-green-500 mr-4 inline-block" />
                        <span className="text-xl font-semibold text-yellow-500">{service.title}</span>
                        <div className="text-gray-500 mt-2">{service.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* Offerte Section */}
          <section className="py-10 bg-black text-center">
            <div className="font-bold text-center text-yellow-500" style={{ fontSize: "1.7rem" }}>
              Le nostre configurazioni
            </div>
            <div className="font-bold text-center text-gray-500" style={{ fontSize: "1.2rem" }}>"CHIAVI IN MANO"</div>
            <div className="grid md:grid-cols-2 gap-6 mt-8 px-6 max-w-6xl mx-auto">
              {[
                {
                  imgSrc: "/pannelli+inverter.jpeg",
                  title: "Impianto standard",
                  description: "Pannelli fotovoltaici + inverter ibrido senza batteria di accumulo",
                  filePath: "/moduli+inverter.pdf",
                },
                {
                  imgSrc: "/pannelli+inverter+batteria.jpeg",
                  title: "Impianto plus",
                  description: "Pannelli fotovoltaici + inverter ibrido + batteria di accumulo",
                  filePath: "/moduli+inverter+batteria.pdf",
                },
              ].map((offer, index) => (
                <div key={index} className="shadow-lg bg-white rounded-lg overflow-hidden">
                  <Card>
                    <img src={offer.imgSrc} alt={offer.title} className="w-full h-48 object-cover" />
                    <CardContent>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">{offer.title}</h3>
                        <div className="text-gray-500 mt-0">{offer.description}</div>
                        <div className="mt-6">
                          <a href={offer.filePath} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-yellow-400 text-white font-semibold hover:bg-yellow-500">
                              Guarda la scheda tecnica
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

               {/* Sezione Calcolatore (Description) */}
                          <section id="calcolatore-fotovoltaico" className="py-12 rounded-lg mt-10"> 
                              <div className="mx-auto px-4 sm:px-6 lg:px-">
                                  <div className="text-base text-justify sm:text-lg leading-relaxed space-y-4"> {/* Adjusted font size for small screens */}
                                      <div className="text-xl text-center font-bold text-yellow-500 mb-4">
                                          SIMULATORE ONLINE PER IL CALCOLO DELLA PRODUCIBILITÀ DI UN IMPIANTO FOTOVOLTAICO
                                      </div>
                                      <div className="text-base text-justify sm:text-lg leading-relaxed space-y-4 text-white mb-4">
                                          Il corretto dimensionamento di un impianto fotovoltaico richiede necessariamente un'analisi di un tecnico specializzato. Il simulatore fotovoltaico online è solo una versione semplificata dei software professionali
                                          ed è concepito per essere usato in pochi minuti anche da utenti non esperti
                                          in modo da poter valutare preliminarmente quanta energia sarà prodotta dall'impianto fotovoltaico, su base mensile ed annuale. Ad esempio, confrontando i dati prodotti dal simulatore con i propri dati di spesa energetica mensile, ricavabili dalla propria bolletta,
                                          è possibile stimare velocemente quale potenza di impianto fotovoltaico sarà adeguato al proprio fabbisogno elettrico.
                                      </div>
                                      <div className="text-center"> {/* Changed to text-center for the image */}
                                          <Image
                                              src="/images/spesaenergetica.jpg"
                                              alt="Spesa Energetica - Esempio"
                                              width={600} // Adjust width/height as needed for your design
                                              height={400}
                                              className="my-4 inline-block max-w-full h-auto" // Added max-w-full h-auto for responsiveness
                                          />
                                      </div>
                                      <div  className="text-base text-justify sm:text-lg leading-relaxed space-y-4 text-white mb-4">
                                          I dati di consumo divisi per fasce, consentono di valutare meglio l'opportunità di un investimento dell'impianto fotovoltaico e della relativa tipologia. È chiaro che un impianto fotovoltaico consente di abbattere principalmente i consumi nelle ore diurne (ovvero la fascia F1 riportata in bolletta):
                                          quanto maggiore sarà il consumo durante le ore diurne rispetto alle ore notturne (fasce F2 e F3 in bolletta) tanto più sarà conveniente
                                          l'installazione di un impianto fotovoltaico; chiaramente, poiché l'impianto produce maggiormente nei mesi da marzo ad ottobre,
                                          fermo restando quanto detto, l'investimento è ancora più redditizio se i consumi sono più alti nei mesi da marzo ad ottobre. Le attività commerciali avranno consumi molto più elevati nelle ore diurne e nei mesi estivi e praticamente nulle nelle ore notturne. Gli utenti domestici, invece, statisticamente concentrano la maggior parte dei propri consumi durante le ore serali e notturne.
                                          Per questi tipi di utenti, in linea di principio, la produzione dell'impianto fotovoltaico deve almeno coprire il fabbisogno diurno
                                          (fascia F1 in bolletta) e valutare (per la corrente consumata in ore non coperte dal fotovoltaico) la convenienza tecnico-economica del
                                           meccanismo del ritiro dedicato (RID) eventualmente abbinandolo a un efficiente sistema di batterie di accumulo. La simulazione che si può ottenere è quella di impianti fotovoltaici in condizioni di installazione standard; per impianti più complessi in condizioni difficili di installazione,
                                          per gli impianti su edifici con copertura in eternit, per gli impianti fotovoltaici in particolari condizioni di ombreggiamento, ecc...
                                          vi invitiamo a compilare il form sottostante. Ricordiamo che in Italia le condizioni ideali di esposizione, per cui si ha la producibilità massima a una determinata latitudine dell'impianto fotovoltaico,
                                          sono rappresentate da un angolo di azimuth pari a 0 gradi (cioè pannelli orientati perfettamente a sud) ed un angolo di tilt pari a circa 30 gradi (ovvero inclinazione
                                          rispetto al piano orizzontale dei moduli pari a 30 gradi). Naturalmente nel caso di impianti su tetto inclinato degli edifici gli angoli di azimuth e di tilt sono vincolati dall'inclinazione della copertura mentre
                                          nel caso di impianti a terra o su tetti piani gli angoli di azimuth e di tilt possono essere ottimizzati.
                                      </div>
                                  </div>
                              </div>
                          </section>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start justify-center max-w-5xl mx-auto mt-10"> {/* Nuovo contenitore per il layout affiancato */}
            {/* Calcolatore Form Section */}
            <div className="w-full md:w-1/2"> {/* Occuperà metà larghezza su schermi medi e superiori */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Sezione 1: Luogo */}
                        <fieldset>
                            <legend className="text-xl font-semibold text-green-700 mb-4">
                                1. Luogo di Installazione
                            </legend>
                            <div className="grid grid-cols-1">
                                <div>
                                    <label htmlFor="province" className="font-semibold text-gray-800 block mb-1">
                                        Provincia
                                    </label>
                                    <select
                                        id="province"
                                        name="province"
                                        value={province}
                                        onChange={(e) => setProvince(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="">Seleziona una provincia</option>
                                        {provinceData.map((p) => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                    {validationErrors.province && (<span className="text-red-600 text-sm mt-1 block">{validationErrors.province}</span>)}
                                </div>
                            </div>
                        </fieldset>

                        {/* Sezione 2: Orientamento Pannelli */}
                        <fieldset>
                            <legend className="text-xl font-semibold text-green-700 mb-4">2. Orientamento Pannelli</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="azimuth" className="font-semibold text-gray-800 block mb-1">Azimuth (gradi)</label>
                                    <select
                                        id="azimuth"
                                        name="azimuth"
                                        value={azimuth}
                                        onChange={(e) => setAzimuth(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="0">0° SUD</option>
                                        <option value="15">+/- 15°</option>
                                        <option value="30">+/- 30°</option>
                                        <option value="45">+/- 45°</option>
                                        <option value="90">+/- 90° EST/OVEST</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="tilt" className="font-semibold text-gray-800 block mb-1">Tilt (gradi)</label>
                                    <select
                                        id="tilt"
                                        name="tilt"
                                        value={tilt}
                                        onChange={(e) => setTilt(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="0">0° (orizzontale)</option>
                                        <option value="10">10°</option>
                                        <option value="15">15°</option>
                                        <option value="20">20°</option>
                                        <option value="30">30°</option>
                                        <option value="90">90° (verticale)</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* Sezione 3: Potenza */}
                        <fieldset>
                            <legend className="text-xl font-semibold text-green-700 mb-4">3. Dimensionamento Impianto</legend>
                            <div>
                                <label htmlFor="potenza" className="font-semibold text-gray-800 block mb-1">Potenza (kW)</label>
                                <input
                                    type="text"
                                    id="potenza"
                                    name="potenza"
                                    value={potenza}
                                    onChange={(e) => setPotenza(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Es. 3, 4.5, 6"
                                />
                                {validationErrors.potenza && (<p className="text-red-600 text-sm mt-1">{validationErrors.potenza}</p>)}
                            </div>
                        </fieldset>

                        <div className="text-center mt-6">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg w-full md:w-auto transition-colors">
                                Calcola Producibilità
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Sezione Risultati */}
            {producibilityData && resumeData && (
                <div id="results-section" className="w-full md:w-1/2 p-6 bg-gray-800 rounded-lg shadow-inner">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">Risultati della Simulazione</h3>
                    <div className="text-lg font-bold text-yellow-400 mb-2">Località: <span className="text-white">{resumeData.location}</span></div>
                    <div className="text-lg font-bold text-yellow-400 mb-4">Potenza Impianto: <span className="text-white">{resumeData.power}</span></div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-center text-gray-700 uppercase text-sm">
                                    <th scope="col" className="py-2 px-4 border-b">Periodo</th>
                                    <th scope="col" className="py-2 px-4 border-b">Producibilità (kWh)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {producibilityData.map((row, index) => (
                                    <tr key={index} style={{ backgroundColor: row.backgroundColor || (index % 2 === 0 ? '#f9f9f9' : '#ffffff') }} className="text-right text-gray-800">
                                        <td className="py-2 px-4 border-b border-gray-200 font-medium text-left">{row.periodo}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{row.kwh}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <p className="text-sm text-gray-300 mt-4">
                        *Nota: Questi dati sono stime basate su irraggiamento solare medio e fattori di correzione generici. La producibilità effettiva può variare in base a condizioni meteorologiche specifiche, ombreggiamenti, qualità dei materiali e altri fattori tecnici. Per una stima precisa, è consigliata una valutazione professionale.
                    </p>
                </div>
            )}
        </div>

                   {/* Contatti Section */}
                    <section id="modulo-contatti" className="bg-black text-white py-6 mt-10 text-center">
                        <div className="font-bold text-center text-yellow-500" style={{ fontSize: "1.7rem" }}>Non aspettare, contattaci!</div>
                        <div className="font-bold text-center text-gray-500 p-2" style={{ fontSize: "1.2rem" }}>Richiedi un preventivo gratuito e scopri come l'energia solare può trasformare la tua vita.</div>
                        <div className="mt-4 w-full max-w-4xl mx-auto">
                            <ModuloContatti destinatarioEmail="fotovoltaico@faccio-tutto.it" />
                        </div>
                    </section>
                </main>
            </div>
       
      {/* Footer */}
      <footer className="text-center mt-8 p-6 bg-gray-900 text-gray-300">
        <p>&copy; {new Date().getFullYear()} faccio-tutto.it - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default FotovoltaicoPage;