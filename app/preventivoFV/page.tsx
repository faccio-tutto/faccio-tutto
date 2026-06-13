"use client";

import React, { useMemo, useState, useEffect, FC } from "react";
import Image from "next/image";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";

// --- INTERFACCE TYPESCRIPT (Nessuna modifica) ---
interface Inverter {
  id: string;
  brand: string;
  modello?: string;
  powerKw: number;
  price: number;
}

interface Modulo {
  id: string;
  brand: string;
  modello?: string;
  powerW: number;
  price: number;
}

interface Batteria {
  id: string;
  brand: string;
  modello?: string;
  capacityKwh: number;
  price: number;
}

interface Struttura {
  id: string;
  type: string;
  price: number;
}

interface ListiniData {
    inverter: Inverter[];
    moduli: Modulo[];
    batterie: Batteria[];
    strutture: Struttura[];
}

// --- CONFIGURAZIONE COSTANTI (Nessuna modifica) ---
const IVA_RATE = 0.10;
const PNRR_MAX = 1500; 
const LABOUR_AND_WIRING_COST_PER_KWP = 286; 
const DOCUMENTATION_COST = 250; 
const DEFAULT_SELECTION_ID = "none"; 

const PvEstimator: FC = () => {
  // --- STATI ---
  const [cliente, setCliente] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [inverterList, setInverterList] = useState<Inverter[]>([]);
  const [moduloList, setModuloList] = useState<Modulo[]>([]);
  const [batteriaList, setBatteriaList] = useState<Batteria[]>([]);
  const [strutturaList, setStrutturaList] = useState<Struttura[]>([]);
  const [selectedInverter, setSelectedInverter] = useState(DEFAULT_SELECTION_ID);
  const [selectedModulo, setSelectedModulo] = useState(DEFAULT_SELECTION_ID);
  const [moduleCount, setModuleCount] = useState<number>(0);
  const [batteryQuantity, setBatteryQuantity] = useState<number>(1);
  const [selectedBatteria, setSelectedBatteria] = useState(DEFAULT_SELECTION_ID); 
  const [selectedStruttura, setSelectedStruttura] = useState(DEFAULT_SELECTION_ID);
  const [applyVAT, setApplyVAT] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);

  // --- Caricamento Listini Fissi (Nessuna modifica) ---
  useEffect(() => {
    const fetchData = () => {
      const data: ListiniData = {
        inverter: [
          { id: "inv1", brand: "Huawei", modello: "SUN2000-M5", powerKw: 5, price: 535.00 },
          { id: "inv2", brand: "Huawei", modello: "SUN2000-M6", powerKw: 6, price: 700.00 }, 
          { id: "inv3", brand: "Deye", modello: "SUN-6K-SG04LP1", powerKw: 6, price: 900.00 }, 
          { id: "inv4", brand: "Unical", modello: "Hybrid 6K", powerKw: 6, price: 1280.00 },  
          { id: "inv5", brand: "Fronius", modello: "Gen24 Plus", powerKw: 6, price: 1699.00 }, 
          { id: "inv6", brand: "SMA", modello: "Sunny Boy Smart Energy", powerKw: 6, price: 1500.00 }, 
          { id: "inv7", brand: "Solis", modello: "S6-EH1P6K-L-PLUS Hybrid", powerKw: 6, price: 1180.00 },
          { id: "inv8", brand: "Zucchetti Easy power - all in one", modello: "HYD 6000 ZP1", powerKw: 6, price: 1400.00 },
          { id: "inv9", brand: "Zucchetti ZCS Azzurro", modello: "1PH HYD 6000-ZSS HP", powerKw: 6, price: 1300.00 },
          { id: "inv10", brand: "WECO", modello: "5K0 SMART EU All in One", powerKw: 6, price: 1400.00 },
          { id: "inv11", brand: "CanadianSolar", modello: "EP CUBE", powerKw: 6, price: 1500.00 },
          { id: "inv12", brand: "Midea", modello: "MHELIOS FLEX-A EA-S6K", powerKw: 6, price: 1100.00 },
          { id: "inv13", brand: "U can power", modello: "UHome 6K0L", powerKw: 6, price: 1600.00 },
        ],
        moduli: [
          { id: "mod1", brand: "Peimar", modello: "OR10H450MNDB-BF bifacciale", powerW: 450, price: 70.00 }, 
          { id: "mod2", brand: "Trina", modello: "Vertex S+", powerW: 450, price: 70.00 }, 
          { id: "mod3", brand: "Canadian Solar", modello:"TOPHiKu6 CS6.2-48TD",powerW: 460, price: 77.00 }, 
          { id: "mod4", brand: "Peimar", modello:"OR10H500MNDB-FB",powerW: 500, price: 84.00 }, 
          { id: "mod5", brand: "JA Solar", modello: "JAM60D40-500/LB", powerW: 500, price: 85.00 }, 
        ],
        batterie: [
          { id: "bat1", brand: "Huawei", modello: "Luna", capacityKwh: 5, price: 2250.00 }, 
          { id: "bat2", brand: "BYD", capacityKwh: 5, price: 2500.00 }, 
          { id: "bat3", brand: "Fronius", modello: "Reserva", capacityKwh: 9.5, price: 4160.00 },
          { id: "bat4", brand: "V-Tac", capacityKwh: 9.6, price: 1800.00 }, 
          { id: "bat5", brand: "Unical", capacityKwh: 10.24, price: 3170.00 }, 
          { id: "bat6", brand: "Huawei", modello: "Luna", capacityKwh: 10, price: 4140.00 }, 
          { id: "bat7", brand: "Huawei", modello: "Luna", capacityKwh: 15, price: 5730.00 }, 
          { id: "bat8", brand: "Dyness", modello: "Powerbox G2", capacityKwh: 10.24, price: 1700.00 }, 
          { id: "bat9", brand: "SMA", modello: "Home storage", capacityKwh: 3.28, price: 1350.00 }, 
          { id: "bat10", brand: "Deye", modello: "RW-F10.2", capacityKwh: 10.24, price: 2650.00 }, 
          { id: "bat11", brand: "Zucchetti Easy power - all in one", modello: "HV ZBT 5K HTR", capacityKwh: 5.12, price: 1540.00 }, 
          { id: "bat12", brand: "Zucchetti ZCS Azzurro", modello: "LV ZSX5000 S", capacityKwh: 5.12, price: 950.00 }, 
          { id: "bat13", brand: "WECO", modello: "5K0 SMART HV PRO", capacityKwh: 5.12, price: 1550.00 }, 
          { id: "bat14", brand: "CanadianSolar", modello: "EP CUBE", capacityKwh: 5.12, price: 1300.00 },
          { id: "bat16", brand: "Midea", modello: "MHELIOS FLEX-A AL10.2-Eo", capacityKwh: 10.24, price: 2720.00 },
          { id: "bat17", brand: "U can power", modello: "ULB-5120MT", capacityKwh: 5.12, price: 1750.00 },
        ],
        strutture: [
          { id: "str1", type: "Tetto inclinato (tegole/coppi)", price: 650.00 }, 
          { id: "str2", type: "Tetto piano (zavorrato)", price: 750.00 }, 
          { id: "str3", type: "Pensilina / Pergolato", price: 580.00 }, 
        ],
      };
      setInverterList(data.inverter || []);
      setModuloList(data.moduli || []);
      setBatteriaList(data.batterie || []);
      setStrutturaList(data.strutture || []);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // --- LOGICHE E MEMO (Nessuna modifica) ---
  const selectedModuloObj: Modulo | undefined | null = selectedModulo === DEFAULT_SELECTION_ID ? null : moduloList.find(b => b.id === selectedModulo); 
  const selectedInverterObj: Inverter | undefined | null = selectedInverter === DEFAULT_SELECTION_ID ? null : inverterList.find(b => b.id === selectedInverter); 
  const selectedBatteriaObj: Batteria | undefined | null = selectedBatteria === DEFAULT_SELECTION_ID ? null : batteriaList.find(b => b.id === selectedBatteria); 
  const selectedStrutturaObj: Struttura | undefined | null = selectedStruttura === DEFAULT_SELECTION_ID ? null : strutturaList.find(b => b.id === selectedStruttura); 

  const filteredBatteriaList = useMemo(() => {
    if (!selectedInverterObj) return [];
    const inverterBrand = selectedInverterObj.brand;
    const compatibleBrands: string[] = [inverterBrand];

    if (inverterBrand === "Deye ibrido") {
      compatibleBrands.push("V-Tac", "Deye");
    }
    if (inverterBrand === "Solis") {
      compatibleBrands.push("Dyness");
    }
    return batteriaList.filter(b => compatibleBrands.includes(b.brand));
  }, [selectedInverterObj, batteriaList]);

  useEffect(() => {
    if (selectedBatteria === DEFAULT_SELECTION_ID || !selectedInverterObj) return; 
    const isCurrentlyCompatible = filteredBatteriaList.some(b => b.id === selectedBatteria); 
    if (!isCurrentlyCompatible) { 
      setSelectedBatteria(DEFAULT_SELECTION_ID);
    }
  }, [selectedBatteria, filteredBatteriaList, selectedInverterObj]); 
  
  const modulesTotalKw = useMemo(() => {
    if (!selectedModuloObj || moduleCount <= 0) return 0;
    return +(selectedModuloObj.powerW * moduleCount / 1000).toFixed(2); 
  }, [selectedModuloObj, moduleCount]);

  const prices = useMemo(() => {
    if (!selectedModuloObj || !selectedInverterObj || !selectedStrutturaObj || modulesTotalKw === 0) {
      return { modulesPrice: 0, inverterPrice: 0, batteryPrice: 0, structurePrice: 0, materialCost: 0, labourAndWiringPrice: 0, documentationCost: 0, subtotal: 0, iva: 0, total: 0 };
    }
    const modulesPrice = selectedModuloObj.price * moduleCount; 
    const inverterPrice = selectedInverterObj.price;
    const batteryPrice = selectedBatteriaObj ? selectedBatteriaObj.price * batteryQuantity : 0;
    const structurePrice = selectedStrutturaObj.price; 
    const materialCost = modulesPrice + inverterPrice + batteryPrice + structurePrice;
    const labourAndWiringPrice = modulesTotalKw * LABOUR_AND_WIRING_COST_PER_KWP; 
    const documentationCost = DOCUMENTATION_COST;
    const subtotal = materialCost + labourAndWiringPrice + documentationCost;
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;
    return { modulesPrice, inverterPrice, batteryPrice, structurePrice, materialCost, labourAndWiringPrice, documentationCost, subtotal, iva, total };
  }, [selectedModuloObj, moduleCount, selectedInverterObj, selectedBatteriaObj, selectedStrutturaObj, modulesTotalKw, batteryQuantity]);

  const errors = useMemo(() => {
    const errs: string[] = [];
    if (selectedInverter === DEFAULT_SELECTION_ID) errs.push("Seleziona un Inverter nominale.");
    if (selectedModulo === DEFAULT_SELECTION_ID) errs.push("Seleziona un modello di Modulo.");
    if (selectedStruttura === DEFAULT_SELECTION_ID) errs.push("Seleziona una Struttura di montaggio.");
    if (moduleCount < 1) errs.push("Inserisci un quantitativo valido di moduli fotovoltaici.");
    if (!cliente.trim() || !email.trim()) errs.push("Specificare nome cliente ed e-mail per sbloccare l'esportazione.");

    if (selectedInverterObj && selectedModuloObj) {
        if (selectedInverterObj.powerKw > 0 && modulesTotalKw > selectedInverterObj.powerKw * 1.3) {
          errs.push(`Sovradimensionamento: la potenza dei moduli (${modulesTotalKw} kWp) eccede del 30% la tolleranza dell'inverter (${selectedInverterObj.powerKw} kW).`);
        }
        if (modulesTotalKw > 0) {
          const costoPerKwNetto = prices.subtotal / modulesTotalKw;
          if (costoPerKwNetto > PNRR_MAX) {
            errs.push(`Soglia limite: il valore netto per kW (${costoPerKwNetto.toFixed(2)} €/kW) supera il massimale vincolante PNRR (${PNRR_MAX} €/kW).`);
          }
        }
    }
    return errs;
  }, [selectedInverterObj, selectedModuloObj, selectedStruttura, moduleCount, modulesTotalKw, prices.subtotal, selectedInverter, selectedModulo, cliente, email, selectedBatteria, filteredBatteriaList]);

  const formatEuro = (v: number) => v.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const exportPDF = async () => {
    if (errors.length > 0) return;
    try {
      const res = await fetch("/api/pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cliente: cliente, email: email, inverter: selectedInverterObj, moduli: selectedModuloObj, numeroModuli: moduleCount, batteria: selectedBatteriaObj, struttura: selectedStrutturaObj, cablaggio: prices.labourAndWiringPrice, totale: applyVAT ? prices.total : prices.subtotal, }) });
      if (!res.ok) throw new Error("Generazione fallita."); 
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "preventivo.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-xs tracking-widest text-neutral-400 uppercase">Inizializzazione ecosistema...</div>;
  }
  
  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-12 bg-black min-h-screen text-white font-sans antialiased">
      
      {/* HEADER STILE TESLA */}
      <div className="mb-16 text-center space-y-3">
        <h1 className="text-4xl font-light tracking-tight text-neutral-100">
          Configuratore impianto fotovoltaico
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
          Sistemi ad alta efficienza energetica e accumulo intelligente
        </p>
      </div>

      <div className="space-y-10">
        
        {/* MESSAGGI DI ERRORE / VALIDAZIONE MINIMALISTI */}
        {errors.length > 0 && (
          <div className="p-5 bg-neutral-900/60 border-l-2 border-red-500 rounded-r-lg space-y-1">
            <div className="text-xs uppercase tracking-wider font-bold text-red-500 mb-2">
              Note di Configurazione
            </div>
            {errors.map((e, i) => (
              <div key={i} className="text-xs text-neutral-400 flex items-start gap-1">
                <span>•</span> <span>{e}</span>
              </div>
            ))}
          </div>
        )}

        {/* --- SEZIONE: ANAGRAFICA --- */}
        <div className="p-6 bg-neutral-900/40 rounded-xl border border-neutral-800/60">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-6">
              01 / Intestazione Pratica
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Nome e Cognome</span>
                <input 
                  type="text" 
                  value={cliente} 
                  onChange={e=>setCliente(e.target.value)} 
                  className="w-full bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition" 
                  placeholder="Es. Mario Rossi"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Indirizzo e-mail</span>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                  className="w-full bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition" 
                  placeholder="Es. nome@dominio.com"
                />
              </label>
            </div>
        </div>

        {/* --- SEZIONE: COMPONENTI HARDWARE --- */}
        <div className="p-6 bg-neutral-900/40 rounded-xl border border-neutral-800/60 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-6">
              02 / Specifica Tecnica Componenti
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Inverter */}
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Inverter</span>
                <select 
                  value={selectedInverter} 
                  onChange={e=>setSelectedInverter(e.target.value)} 
                  className="w-full bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-600 transition appearance-none"
                >
                  <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedInverter !== DEFAULT_SELECTION_ID}>Seleziona inverter</option>
                  {inverterList.map(i => (
                    <option key={i.id} value={i.id} className="bg-neutral-900 text-white">
                      {i.brand} {i.modello ? `${i.modello}` : ""} ({i.powerKw} kW) — {formatEuro(i.price)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Modulo */}
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Moduli Fotovoltaici</span>
                <select 
                  value={selectedModulo} 
                  onChange={e=>setSelectedModulo(e.target.value)} 
                  className="w-full bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-600 transition appearance-none"
                >
                  <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedModulo !== DEFAULT_SELECTION_ID}>Seleziona modulo</option>
                  {moduloList.map(m => (
                    <option key={m.id} value={m.id} className="bg-neutral-900 text-white">
                      {m.brand} {m.modello ? `${m.modello}` : ""} ({m.powerW} W) — {formatEuro(m.price)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Numero Moduli */}
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Unità complessive</span>
                <input 
                  type="number"
                  inputMode="numeric"
                  value={moduleCount === 0 ? "" : moduleCount}
                  min={0} 
                  onChange={e => setModuleCount(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-full bg-neutral-900/80 border border-neutral-800 text-white p-3 rounded-lg text-sm focus:outline-none focus:border-neutral-600 transition" 
                  placeholder="0"
                />
              </label>
              
              {/* Box Dinamico Potenza Impianto */}
              <div className="lg:col-span-3 py-4 border-t border-b border-neutral-800/40 my-2 flex justify-between items-center px-2">
                <span className="text-xs uppercase tracking-widest text-neutral-400">Potenza Nominale Calcolata:</span>
                <span className="text-xl font-light text-neutral-200">{modulesTotalKw.toFixed(2)} <span className="text-xs text-neutral-500">kWp</span></span>
              </div>

              {/* Accumulo di Energia */}
              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 items-end">
                <label className="flex-1 flex flex-col gap-2 w-full">
                  <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Batteria (Opzionale)</span>
                  <select
                    value={selectedBatteria}
                    onChange={e => setSelectedBatteria(e.target.value)}
                    className="w-full bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-600 transition appearance-none"
                  >
                    <option value={DEFAULT_SELECTION_ID}>Escludi pacco batterie</option>
                    {filteredBatteriaList.map(b => (
                      <option key={b.id} value={b.id} className="bg-neutral-900 text-white">
                        {b.brand} {b.modello ? `${b.modello}` : ""} ({b.capacityKwh} kWh) — {formatEuro(b.price)}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Quantità Batterie Tesla Configurator Style */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium block text-left sm:text-center">Quantità moduli</span>
                  <div className="flex items-center border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/80 h-11 w-full sm:w-28">
                    <button
                      type="button"
                      onClick={() => setBatteryQuantity(q => Math.max(1, q - 1))}
                      disabled={selectedBatteria === DEFAULT_SELECTION_ID}
                      className="w-9 h-full flex items-center justify-center bg-transparent text-neutral-400 hover:text-white disabled:opacity-20 transition"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center text-sm font-medium text-neutral-200">
                      {batteryQuantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => setBatteryQuantity(q => Math.min(10, q + 1))}
                      disabled={selectedBatteria === DEFAULT_SELECTION_ID}
                      className="w-9 h-full flex items-center justify-center bg-transparent text-neutral-400 hover:text-white disabled:opacity-20 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Struttura ancoraggio */}
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Tipologia copertura</span>
                <select 
                  value={selectedStruttura} 
                  onChange={e=>setSelectedStruttura(e.target.value)} 
                  className="w-full bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-600 transition appearance-none"
                >
                  <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedStruttura !== DEFAULT_SELECTION_ID}>Seleziona ancoraggio</option>
                  {strutturaList.map(s => (
                    <option key={s.id} value={s.id} className="bg-neutral-900 text-white">
                      {s.type} — {formatEuro(s.price)}
                    </option>
                  ))}
                </select>
              </label>

              {selectedInverterObj && (
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 col-span-1 sm:col-span-3 px-1 mt-1">
                  * Filtri attivi: visualizzazione ristretta ad hardware compatibile con tecnologia <b>{selectedInverterObj.brand}</b>.
                </p>
              )}
            </div>
        </div>

        {/* --- SEZIONE RIEPILOGO FINALE / DETTAGLIO COSTI --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Dettaglio Costi Meticoloso */}
          <div className="p-6 rounded-xl bg-neutral-900/20 border border-neutral-800/80 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold border-b border-neutral-800 pb-3">
              03 / Voci di preventivo (Prezzo Netto)
            </h3>
            <ul className="text-xs space-y-3 font-medium text-neutral-400">
              <li className="flex justify-between items-center">
                <span>Moduli fotovoltaici ({moduleCount}x)</span>
                <span className="text-neutral-200">{formatEuro(prices.modulesPrice)}</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Inverter</span>
                <span className="text-neutral-200">{formatEuro(prices.inverterPrice)}</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Sistema di accumulo {selectedBatteriaObj ? `(${batteryQuantity}x)` : ""}</span>
                <span className="text-neutral-200">{formatEuro(prices.batteryPrice)}</span>
              </li>
              <li className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <span>Struttura di sostegno</span>
                <span className="text-neutral-200">{formatEuro(prices.structurePrice)}</span>
              </li>
              <li className="flex justify-between items-center pt-1 font-semibold text-neutral-300">
                <span>Sommario fornitura materiali</span>
                <span className="text-neutral-100">{formatEuro(prices.materialCost)}</span>
              </li>
              <li className="flex justify-between items-center p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-400">
                <span>Installazione e cablaggio ({LABOUR_AND_WIRING_COST_PER_KWP} €/kWp)</span>
                <span className="text-neutral-200">{formatEuro(prices.labourAndWiringPrice)}</span>
              </li>
              <li className="flex justify-between items-center p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-400">
                <span>Oneri burocratici per connessione in rete</span>
                <span className="text-neutral-200">{formatEuro(prices.documentationCost)}</span>
              </li>
              <li className="flex justify-between items-center pt-4 border-t border-neutral-800 text-sm text-neutral-300 font-semibold">
                <span>Base imponibile</span>
                <span className="text-white font-medium">{formatEuro(prices.subtotal)}</span>
              </li>
            </ul>
          </div>
          
          {/* Totale Chiavi in Mano - Quadro d'Acquisto Tesla Style */}
          <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold border-b border-neutral-800 pb-3">
                04 / Soluzione Finanziaria Chiavi In Mano
              </h3>
              
              <div className="text-xs text-neutral-500 font-medium">
                {applyVAT && (
                  <div className="flex justify-between items-center">
                    <span>Imposta valore aggiunto applicata ({IVA_RATE*100}%):</span>
                    <span className="text-neutral-300">{formatEuro(prices.iva)}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <div className="text-5xl font-light tracking-tight text-white">
                  {formatEuro(applyVAT ? prices.total : prices.subtotal)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mt-2">
                  {applyVAT ? "Valore Finale Lordo Chiavi in Mano" : "Valore Esente da Imposta di Bollo / Netto"}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-xs tracking-wider text-neutral-400 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={applyVAT} 
                  onChange={e=>setApplyVAT(e.target.checked)} 
                  className="form-checkbox h-4 w-4 bg-black border-neutral-700 text-neutral-200 rounded focus:ring-0 focus:ring-offset-0"
                />
                Calcola aliquota fiscale agevolata ({IVA_RATE*100}%)
              </label>

              <button 
                onClick={exportPDF} 
                disabled={errors.length > 0}
                className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full transition-all hover:bg-neutral-200 active:scale-[0.99] disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed"
              >
                {errors.length > 0 ? "Configurazione incompleta" : "Genera prospetto preventivo PDF"}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default PvEstimator;