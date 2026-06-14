"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Sun,
  MapPin,
  Compass,
  ArrowRight,
  Zap,
  BarChart3
} from "lucide-react";

// --- Database Irraggiamento Giornaliero ---
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
    'Barletta-Andria-Trani': { Gennaio: 1.83, Febbraio: 2.81, Marzo: 4.03, Aprile: 5.72, Maggio: 7.03, Giugno: 7.78, Luglio: 7.94, Agosto: 7.00, Settembre: 5.28, Ottobre: 3.67, Novembre: 2.22, Dicembre: 1.58 },
    'Belluno': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.67, Maggio: 5.69, Giugno: 6.36, Luglio: 6.94, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.39, Dicembre: 1.06 },
    'Benevento': { Gennaio: 1.50, Febbraio: 2.33, Marzo: 3.53, Aprile: 5.03, Maggio: 6.19, Giugno: 6.86, Luglio: 7.47, Agosto: 6.64, Settembre: 4.92, Ottobre: 3.33, Novembre: 1.94, Dicembre: 1.36 },
    'Bergamo': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 },
    'Biella': { Gennaio: 1.25, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 },
    'Bologna': { Gennaio: 1.25, Febbraio: 2.19, Marzo: 3.36, Aprile: 4.81, Maggio: 5.83, Giugno: 6.56, Luglio: 7.11, Agosto: 5.83, Settembre: 4.28, Ottobre: 2.75, Novembre: 1.47, Dicembre: 1.14 },
    'Bolzano': { Gennaio: 1.25, Febbraio: 2.28, Marzo: 3.53, Aprile: 4.58, Maggio: 5.64, Giugno: 5.92, Luglio: 6.25, Agosto: 5.14, Settembre: 3.94, Ottobre: 2.58, Novembre: 1.42, Dicembre: 1.08 },
    'Brescia': { Gennaio: 1.28, Febbraio: 2.17, Marzo: 3.44, Aprile: 4.47, Maggio: 5.67, Giugno: 6.25, Luglio: 6.78, Agosto: 5.61, Settembre: 4.08, Ottobre: 2.56, Novembre: 1.47, Dicembre: 1.19 },
    'Brindisi': { Gennaio: 1.94, Febbraio: 2.58, Marzo: 3.92, Aprile: 5.44, Maggio: 6.53, Giugno: 7.50, Luglio: 7.61, Agosto: 6.64, Settembre: 5.11, Ottobre: 3.61, Novembre: 2.19, Dicembre: 1.64 },
    'Cagliari': { Gennaio: 2.03, Febbraio: 2.72, Marzo: 4.00, Aprile: 5.14, Maggio: 6.25, Giugno: 6.94, Luglio: 7.58, Agosto: 6.64, Settembre: 4.89, Ottobre: 3.39, Novembre: 2.25, Dicembre: 1.78 },
    'Caltanissetta': { Gennaio: 2.50, Febbraio: 3.32, Marzo: 4.44, Aprile: 5.78, Maggio: 7.08, Giugno: 7.83, Luglio: 7.83, Agosto: 7.06, Settembre: 5.42, Ottobre: 3.83, Novembre: 2.78, Dicembre: 2.22 },
    'Campobasso': { Gennaio: 1.72, Febbraio: 2.64, Marzo: 3.75, Aprile: 5.19, Maggio: 6.53, Giugno: 7.03, Luglio: 7.36, Agosto: 6.42, Settembre: 4.83, Ottobre: 3.33, Novembre: 2.03, Dicembre: 1.56 },
    'Carbonia-Iglesias': { Gennaio: 2.03, Febbraio: 2.72, Marzo: 4.00, Aprile: 5.14, Maggio: 6.25, Giugno: 6.94, Luglio: 7.58, Agosto: 6.64, Settembre: 4.89, Ottobre: 3.39, Novembre: 2.25, Dicembre: 1.78 },
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
    'Fermo': { Gennaio: 1.19, Febbraio: 2.11, Marzo: 3.36, Aprile: 5.08, Maggio: 6.42, Giugno: 6.69, Luglio: 7.22, Agosto: 6.11, Settembre: 4.44, Ottobre: 2.92, Novembre: 1.53, Dicembre: 1.14 },
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
    'Lecco': { Gennaio: 1.25, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 },
    'Livorno': { Gennaio: 1.47, Febbraio: 2.25, Marzo: 3.42, Aprile: 4.75, Maggio: 5.72, Giugno: 6.42, Luglio: 6.83, Agosto: 5.69, Settembre: 4.25, Ottobre: 2.86, Novembre: 1.69, Dicembre: 1.25 },
    'Lodi': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 }, // Corretto 'September' in 'Settembre'
    'Lucca': { Gennaio: 1.36, Febbraio: 2.06, Marzo: 3.25, Aprile: 4.53, Maggio: 5.56, Giugno: 6.31, Luglio: 6.56, Agosto: 5.47, Settembre: 4.14, Ottobre: 2.72, Novembre: 1.56, Dicembre: 1.11 },
    'Macerata': { Gennaio: 1.31, Febbraio: 2.19, Marzo: 3.47, Aprile: 4.97, Maggio: 6.25, Giugno: 6.58, Luglio: 7.11, Agosto: 6.00, Settembre: 4.36, Ottobre: 2.89, Novembre: 1.58, Dicembre: 1.19 },
    'Mantova': { Gennaio: 1.11, Febbraio: 1.94, Marzo: 3.19, Aprile: 4.58, Maggio: 5.58, Giugno: 6.28, Luglio: 6.83, Agosto: 5.50, Settembre: 3.97, Ottobre: 2.47, Novembre: 1.33, Dicembre: 1.00 },
    'Massa-Carrara': { Gennaio: 1.39, Febbraio: 2.14, Marzo: 3.33, Aprile: 4.67, Maggio: 5.61, Giugno: 6.36, Luglio: 6.72, Agosto: 5.58, Settembre: 4.19, Ottobre: 2.78, Novembre: 1.64, Dicembre: 1.22 },
    'Matera': { Gennaio: 1.89, Febbraio: 2.86, Marzo: 4.08, Aprile: 5.75, Maggio: 7.08, Giugno: 7.78, Luglio: 7.94, Agosto: 7.00, Settembre: 5.28, Ottobre: 3.67, Novembre: 2.25, Dicembre: 1.58 },
    'Medio Campidano': { Gennaio: 2.03, Febbraio: 2.72, Marzo: 4.00, Aprile: 5.14, Maggio: 6.25, Giugno: 6.94, Luglio: 7.58, Agosto: 6.64, Settembre: 4.89, Ottobre: 3.39, Novembre: 2.25, Dicembre: 1.78 },
    'Messina': { Gennaio: 2.39, Febbraio: 3.25, Marzo: 4.39, Aprile: 5.72, Maggio: 7.03, Giugno: 7.78, Luglio: 7.78, Agosto: 7.00, Settembre: 5.36, Ottobre: 3.78, Novembre: 2.72, Dicembre: 2.17 },
    'Milano': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 },
    'Modena': { Gennaio: 1.22, Febbraio: 2.14, Marzo: 3.33, Aprile: 4.78, Maggio: 5.81, Giugno: 6.53, Luglio: 7.08, Agosto: 5.81, Settembre: 4.25, Ottobre: 2.75, Novembre: 1.47, Dicembre: 1.14 },
    'Monza e della Brianza': { Gennaio: 1.14, Febbraio: 1.86, Marzo: 3.08, Aprile: 4.39, Maggio: 5.28, Giugno: 5.89, Luglio: 6.44, Agosto: 5.14, Settembre: 3.78, Ottobre: 2.42, Novembre: 1.28, Dicembre: 1.00 },
    'Napoli': { Gennaio: 1.83, Febbraio: 2.64, Marzo: 3.97, Aprile: 5.36, Maggio: 6.58, Giugno: 7.47, Luglio: 7.67, Agosto: 6.69, Settembre: 5.03, Ottobre: 3.53, Novembre: 2.14, Dicembre: 1.61 },
    'Novara': { Gennaio: 1.17, Febbraio: 1.94, Marzo: 3.14, Aprile: 4.36, Maggio: 5.11, Giugno: 5.69, Luglio: 6.22, Agosto: 4.97, Settembre: 3.67, Ottobre: 2.39, Novembre: 1.47, Dicembre: 1.08 },
    'Nuoro': { Gennaio: 1.92, Febbraio: 2.64, Marzo: 3.92, Aprile: 5.06, Maggio: 6.17, Giugno: 6.89, Luglio: 7.53, Agosto: 6.58, Settembre: 4.83, Ottobre: 3.33, Novembre: 2.19, Dicembre: 1.72 },
    'Ogliastra': { Gennaio: 1.92, Febbraio: 2.64, Marzo: 3.92, Aprile: 5.06, Maggio: 6.17, Giugno: 6.89, Luglio: 7.53, Agosto: 6.58, Settembre: 4.83, Ottobre: 3.33, Novembre: 2.19, Dicembre: 1.72 },
    'Olbia-Tempio': { Gennaio: 2.00, Febbraio: 2.69, Marzo: 3.97, Aprile: 5.11, Maggio: 6.22, Giugno: 6.92, Luglio: 7.56, Agosto: 6.61, Settembre: 4.86, Ottobre: 3.36, Novembre: 2.22, Dicembre: 1.75 },
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
    'Pordenone': { Gennaio: 1.14, Febbraio: 2.03, Marzo: 3.25, Aprile: 4.58, Maggio: 5.58, Giugno: 6.22, Luglio: 6.78, Agosto: 5.50, Settembre: 4.03, Ottobre: 2.61, Novembre: 1.39, Dicembre: 1.06 },
    'Potenza': { Gennaio: 1.78, Febbraio: 2.75, Marzo: 3.97, Aprile: 5.64, Maggio: 6.97, Giugno: 7.72, Luglio: 7.89, Agosto: 6.94, Settembre: 5.22, Ottobre: 3.61, Novembre: 2.17, Dicembre: 1.53 },
    'Prato': { Gennaio: 1.33, Febbraio: 2.03, Marzo: 3.22, Aprile: 4.47, Maggio: 5.50, Giugno: 6.25, Luglio: 6.50, Agosto: 5.39, Settembre: 4.08, Ottobre: 2.67, Novembre: 1.53, Dicembre: 1.08 },
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
    'Sondrio': { Gennaio: 1.19, Febbraio: 1.97, Marzo: 3.19, Aprile: 4.42, Maggio: 5.17, Giugno: 5.78, Luglio: 6.28, Agosto: 5.08, Settembre: 3.72, Ottobre: 2.50, Novembre: 1.39, Dicembre: 1.14 },
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
].sort((a, b) => a.label.localeCompare(b.label));

const provinceCodeToName: { [key: string]: string } = provinceData.reduce((acc, curr) => {
    acc[curr.value] = curr.label;
    return acc;
}, {} as { [key: string]: string });

// --- Helper di Calcolo ---
const calculateMonthlyProducibility_1kWp = (dailyIrradianceData: { [month: string]: number }): { [month: string]: number } => {
    const monthsOrder = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const producibility: { [month: string]: number } = {};
    const daysInMonth = { Gennaio: 31, Febbraio: 28.25, Marzo: 31, Aprile: 30, Maggio: 31, Giugno: 30, Luglio: 31, Agosto: 31, Settembre: 30, Ottobre: 31, Novembre: 30, Dicembre: 31 };
    const performanceRatio = 0.80; 

    monthsOrder.forEach(month => {
        const irradiance = dailyIrradianceData[month];
        producibility[month] = irradiance * daysInMonth[month as keyof typeof daysInMonth] * performanceRatio;
    });
    return producibility;
};

const getAzimuthCorrectionFactor = (azimuth: string): number => {
    switch (azimuth) {
        case "0": return 1.0;   
        case "15": return 0.99; 
        case "30": return 0.97; 
        case "45": return 0.93; 
        case "90": return 0.85; 
        default: return 1.0;
    }
};

const getTiltCorrectionFactor = (tilt: string): number => {
    switch (tilt) {
        case "0": return 0.85;  
        case "10": return 0.95;
        case "15": return 0.98;
        case "20": return 0.99; 
        case "30": return 1.0;  
        case "90": return 0.60; 
        default: return 1.0;
    }
};

const fullProducibilityDataByProvince: { [provinceCode: string]: { [month: string]: number } } = {};
for (const provinceCode in provinceCodeToName) {
    const provinceName = provinceCodeToName[provinceCode];
    const irradianceData = dailyIrradiance_kWh_per_sqm_per_day[provinceName] || dailyIrradiance_kWh_per_sqm_per_day['Roma']; 
    fullProducibilityDataByProvince[provinceCode] = calculateMonthlyProducibility_1kWp(irradianceData);
}

interface ProducibilityRow {
    periodo: string;
    kwh: number;
}

interface ResumeData {
    location: string;
    power: string;
    totalAnnual: number;
}

export default function CalcolatoreFVPage() {
    const [province, setProvince] = useState<string>('');
    const [azimuth, setAzimuth] = useState<string>('0'); 
    const [tilt, setTilt] = useState<string>('30');     
    const [potenza, setPotenza] = useState<string>('');
    
    const [producibilityData, setProducibilityData] = useState<ProducibilityRow[] | null>(null);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [isCalculating, setIsCalculating] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { [key: string]: string } = {};

        if (!province) errors.province = 'Seleziona una provincia.';
        const parsedPotenza = parseFloat(potenza.replace(',', '.')); 
        if (isNaN(parsedPotenza) || parsedPotenza <= 0) {
            errors.potenza = 'Inserisci una potenza valida.';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setProducibilityData(null);
            setResumeData(null);
            return;
        }

        setValidationErrors({});
        setIsCalculating(true);

        // Simulazione caricamento premium in stile configuratore auto
        setTimeout(() => {
            const baseProducibility = fullProducibilityDataByProvince[province];
            const azimuthFactor = getAzimuthCorrectionFactor(azimuth);
            const tiltFactor = getTiltCorrectionFactor(tilt);
            
            const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            const results: ProducibilityRow[] = [];
            let total = 0;

            months.forEach(month => {
                const val = baseProducibility[month] * parsedPotenza * azimuthFactor * tiltFactor;
                results.push({ periodo: month, kwh: val });
                total += val;
            });

            setProducibilityData(results);
            setResumeData({
                location: provinceCodeToName[province],
                power: potenza,
                totalAnnual: total
            });
            setIsCalculating(false);
        }, 600);
    };

    // Trova il picco di produzione per scalare i grafici a barre mensili
    const maxMonthlyProduction = producibilityData 
        ? Math.max(...producibilityData.map(d => d.kwh)) 
        : 1;

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-[#f2f2f2] font-sans antialiased selection:bg-white selection:text-black py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* --- HEADER TESLA STYLE --- */}
                <header className="text-center mb-16 space-y-4">
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium"
                    >
                        Efficienza Energetica Avanzata
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-light tracking-tight text-white"
                    >
                        Calcolatore Producibilità Solare
                    </motion.h1>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "40px" }}
                        className="h-[1px] bg-white mx-auto mt-6"
                    />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* --- CONFIGURATORE / FORM --- */}
                    <div className="lg:col-span-5 bg-[#141414] border border-neutral-800 rounded-lg p-6 sm:p-8 space-y-8 shadow-2xl">
                        <h2 className="text-xl font-normal tracking-tight text-white mb-2">Specifiche Impianto</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Località */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">Località</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                    <select
                                        value={province}
                                        onChange={(e) => setProvince(e.target.value)}
                                        className="w-full bg-[#1c1c1c] border border-neutral-800 rounded-md py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="">Seleziona Provincia...</option>
                                        {provinceData.map((p) => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {validationErrors.province && (
                                    <p className="text-xs text-red-400 mt-1">{validationErrors.province}</p>
                                )}
                            </div>

                            {/* Potenza Impianto */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">Potenza Nominale (kWp)</label>
                                <div className="relative">
                                    <Sun className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="es. 6.0"
                                        value={potenza}
                                        onChange={(e) => setPotenza(e.target.value)}
                                        className="w-full bg-[#1c1c1c] border border-neutral-800 rounded-md py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                                    />
                                </div>
                                {validationErrors.potenza && (
                                    <p className="text-xs text-red-400 mt-1">{validationErrors.potenza}</p>
                                )}
                            </div>

                            {/* Orientamento / Azimuth */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">Orientamento (Azimuth)</label>
                                <div className="relative">
                                    <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                    <select
                                        value={azimuth}
                                        onChange={(e) => setAzimuth(e.target.value)}
                                        className="w-full bg-[#1c1c1c] border border-neutral-800 rounded-md py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="0">Sud (0°)</option>
                                        <option value="15">Sud-Est / Sud-Ovest (15°)</option>
                                        <option value="30">Sud-Est / Sud-Ovest (30°)</option>
                                        <option value="45">Est / Ovest (45°)</option>
                                        <option value="90">Est / Ovest Netto (90°)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Inclinazione / Tilt */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">Inclinazione Pannelli (Tilt)</label>
                                <div className="relative">
                                    <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                    <select
                                        value={tilt}
                                        onChange={(e) => setTilt(e.target.value)}
                                        className="w-full bg-[#1c1c1c] border border-neutral-800 rounded-md py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="30">Ottimale (30°)</option>
                                        <option value="20">Inclinazione Standard (20°)</option>
                                        <option value="15">Inclinazione Bassa (15°)</option>
                                        <option value="10">Quasi Piano (10°)</option>
                                        <option value="0">Tetto Piano (0°)</option>
                                        <option value="90">Facciata Verticale (90°)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Pulsante Calcola */}
                            <button
                                type="submit"
                                disabled={isCalculating}
                                className="w-full mt-4 bg-white text-black font-medium text-sm py-3 px-4 rounded-md hover:bg-neutral-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCalculating ? (
                                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Elabora Dati Producibilità
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* --- PANNELLO RISULTATI DINGAMICI --- */}
                    <div className="lg:col-span-7 h-full min-h-[450px]">
                        <AnimatePresence mode="wait">
                            {!resumeData ? (
                                <motion.div 
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full border border-dashed border-neutral-800 rounded-lg flex flex-col items-center justify-center p-8 text-center bg-[#0d0d0d]/50 min-h-[480px]"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#141414] border border-neutral-800 flex items-center justify-center mb-4 shadow-inner">
                                        <Sun className="w-5 h-5 text-neutral-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-lg font-light text-neutral-300">In attesa dei parametri</h3>
                                    <p className="text-sm text-neutral-500 max-w-xs mt-1">
                                        Configura la potenza e l'esposizione del tuo impianto per calcolare la produzione energetica stimata.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="space-y-6"
                                >
                                    {/* KPI Principale - Produzione Annua */}
                                    <div className="bg-[#141414] border border-neutral-800 rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 relative overflow-hidden shadow-xl">
                                        <div className="absolute top-0 right-0 p-6 opacity-5">
                                            <Zap className="w-32 h-32 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1">Produzione Annua Stimata</p>
                                            <p className="text-4xl sm:text-5xl font-extralight text-white tracking-tight">
                                                {Math.round(resumeData.totalAnnual).toLocaleString('it-IT')} <span className="text-xl font-light text-neutral-400">kWh</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-end space-y-1 sm:border-l sm:border-neutral-800 sm:pl-6 text-sm text-neutral-400">
                                            <div>Località: <strong className="text-white font-normal">{resumeData.location}</strong></div>
                                            <div>Taglia Impianto: <strong className="text-white font-normal">{resumeData.power} kWp</strong></div>
                                            <div>Rendimento di Sistema: <strong className="text-white font-normal">80% (PR)</strong></div>
                                        </div>
                                    </div>

                                    {/* Grafico a barre & Tabella Mensile */}
                                    <div className="bg-[#141414] border border-neutral-800 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
                                        <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
                                            <BarChart3 className="w-4 h-4 text-neutral-400" />
                                            <h3 className="text-sm uppercase tracking-wider text-neutral-300 font-medium">Rendimento Mensile Dettagliato</h3>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            {producibilityData?.map((item, idx) => {
                                                const percentage = (item.kwh / maxMonthlyProduction) * 100;
                                                return (
                                                    <motion.div 
                                                        key={item.periodo}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: idx * 0.03 }}
                                                        className="grid grid-cols-12 gap-2 items-center text-xs sm:text-sm"
                                                    >
                                                        {/* Mese */}
                                                        <span className="col-span-3 text-neutral-400 font-light truncate">{item.periodo}</span>
                                                        
                                                        {/* Barra Dinamica */}
                                                        <div className="col-span-6 bg-neutral-900 h-2.5 rounded-full relative overflow-hidden">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${percentage}%` }}
                                                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                                                className="absolute top-0 left-0 h-full bg-white rounded-full opacity-90"
                                                            />
                                                        </div>

                                                        {/* Valore kWh */}
                                                        <span className="col-span-3 text-right text-white font-mono tracking-tight">
                                                            {Math.round(item.kwh).toLocaleString('it-IT')} <span className="text-[10px] text-neutral-500 font-sans">kWh</span>
                                                        </span>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </div>
    );
}