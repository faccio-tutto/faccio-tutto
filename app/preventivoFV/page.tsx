"use client";

import React, { useMemo, useState, useEffect, FC } from "react";

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
  price: number; // Prezzo Totale per la struttura
}

interface ListiniData {
    inverter: Inverter[];
    moduli: Modulo[];
    batterie: Batteria[];
    strutture: Struttura[];
}

// --- CONFIGURAZIONE COSTANTI (Nessuna modifica) ---
const IVA_RATE = 0.22;
const PNRR_MAX = 1500; 
const LABOUR_AND_WIRING_COST_PER_KWP = 286; 
const DOCUMENTATION_COST = 250; // costo fisso pratiche e documentazione
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
          { id: "inv7", brand: "Solis", modello: "S6 Hybrid", powerKw: 6, price: 1180.00 },
          { id: "inv8", brand: "Zucchetti Easy power - all in one", modello: "HYD 6000 ZP1", powerKw: 6, price: 1400.00 },
          { id: "inv9", brand: "Zucchetti ZCS Azzurro", modello: "1PH HYD 6000-ZSS HP", powerKw: 6, price: 1300.00 },
          { id: "inv10", brand: "WECO", modello: "5K0 SMART EU All in One", powerKw: 6, price: 1400.00 },
          { id: "inv11", brand: "CanadianSolar", modello: "EP CUBE", powerKw: 6, price: 1500.00 },
          { id: "inv12", brand: "Midea", modello: "MHELIOS FLEX-A EA-S6K", powerKw: 6, price: 1100.00 },
        ],
        moduli: [
          { id: "mod1", brand: "Trina", modello: "Vertex S+", powerW: 450, price: 70.00 }, 
          { id: "mod2", brand: "Canadian Solar", modello:"TOPHiKu6 CS6.2-48TD",powerW: 460, price: 77.00 }, 
          { id: "mod3", brand: "Peimar", modello:"OR10H500MNDB-FB",powerW: 500, price: 84.00 }, 
          { id: "mod4", brand: "JA Solar", modello: "JAM60D40-500/LB", powerW: 500, price: 85.00 }, 
          
          
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

  // --- OGGETTI SELEZIONATI E LOGICHE (Nessuna modifica funzionale) ---
  const selectedModuloObj: Modulo | undefined | null = selectedModulo === DEFAULT_SELECTION_ID ? null : moduloList.find(b => b.id === selectedModulo); 
  const selectedInverterObj: Inverter | undefined | null = selectedInverter === DEFAULT_SELECTION_ID ? null : inverterList.find(b => b.id === selectedInverter); 
  const selectedBatteriaObj: Batteria | undefined | null = selectedBatteria === DEFAULT_SELECTION_ID ? null : batteriaList.find(b => b.id === selectedBatteria); 
  const selectedStrutturaObj: Struttura | undefined | null = selectedStruttura === DEFAULT_SELECTION_ID ? null : strutturaList.find(b => b.id === selectedStruttura); 

  const filteredBatteriaList = useMemo(() => {
  if (!selectedInverterObj) return [];

  const inverterBrand = selectedInverterObj.brand;
  const compatibleBrands: string[] = [inverterBrand];

  if (inverterBrand === "Deye ibrido") {
    compatibleBrands.push("V-Tac");
    compatibleBrands.push("Deye");
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
  }, [selectedBatteria, filteredBatteriaList, selectedInverterObj, setSelectedBatteria]); 
  
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
    if (selectedInverter === DEFAULT_SELECTION_ID) errs.push("❌ Seleziona un Inverter.");
    if (selectedModulo === DEFAULT_SELECTION_ID) errs.push("❌ Seleziona un Modulo.");
    if (selectedStruttura === DEFAULT_SELECTION_ID) errs.push("❌ Seleziona una Struttura.");
    if (moduleCount < 1) errs.push("❌ Inserisci un numero di moduli valido.");
    if (!cliente.trim() || !email.trim()) errs.push("⚠️ Inserisci nome cliente ed email per l'esportazione.");

    if (selectedBatteria !== DEFAULT_SELECTION_ID && selectedInverterObj) {
        const isCompatible = filteredBatteriaList.some(b => b.id === selectedBatteria);
        if (!isCompatible) errs.push("❌ Errore di Compatibilità: La batteria selezionata non è compatibile con l'inverter.");
    }

    if (selectedInverterObj && selectedModuloObj) {
        if (selectedInverterObj.powerKw > 0 && modulesTotalKw > selectedInverterObj.powerKw * 1.3) {
          errs.push(`⚠️ La potenza dei moduli (${modulesTotalKw} kWp) supera del 30% la potenza nominale dell'inverter (${selectedInverterObj.powerKw} kW).`);
        }
        if (modulesTotalKw > 0) {
          const costoPerKwNetto = prices.subtotal / modulesTotalKw;
          if (costoPerKwNetto > PNRR_MAX) {
            errs.push(`⚠️ Il costo netto per kW (${costoPerKwNetto.toFixed(2)} €/kW) supera il massimale PNRR (${PNRR_MAX} €/kW).`);
          }
        }
    }
    return errs;
  }, [selectedInverterObj, selectedModuloObj, selectedStruttura, moduleCount, modulesTotalKw, prices.subtotal, selectedInverter, selectedModulo, cliente, email, selectedBatteria, filteredBatteriaList]);


  // --- Helpers e Export (Nessuna modifica funzionale) ---
  const formatEuro = (v: number) => v.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const exportPDF = async () => {
    if (errors.length > 0) return console.error("Impossibile esportare: sono presenti errori di conformità.");
    try {
      const res = await fetch("/api/pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cliente: cliente, email: email, inverter: selectedInverterObj, moduli: selectedModuloObj, numeroModuli: moduleCount, batteria: selectedBatteriaObj, struttura: selectedStrutturaObj, cablaggio: prices.labourAndWiringPrice, totale: applyVAT ? prices.total : prices.subtotal, }) });
      if (!res.ok) throw new Error("PDF generation failed: " + (await res.json()).error); 
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
      console.error("Errore esportazione PDF:", err);
    }
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto p-6 text-center text-lg text-slate-600">Caricamento listini...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-slate-100 min-h-screen font-sans">
      <div className="mb-8 text-center border-b pb-4">
        <h1 className="text-2xl font-extrabold text-slate-800">
          Simulatore di preventivo fotovoltaico ☀️
        </h1>
        <div className="text-lg font-semibold text-slate-600 mt-1">
          Configura il tuo impianto e genera un preventivo dettagliato
        </div>
      </div>

      <div className="p-6 space-y-8 bg-white rounded-xl shadow-2xl border border-slate-200">
        
        {/* MESSAGGI DI ERRORE / VALIDAZIONE */}
        {errors.length > 0 && (
          <div className="p-4 bg-red-50 text-red-700 border border-red-300 rounded-lg shadow-sm">
            <div className="font-bold mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                Attenzione! Sono presenti problemi di conformità:
            </div>
            {errors.map((e,i) => <div key={i} className="text-sm ml-7">{e}</div>)}
          </div>
        )}

        {/* --- DATI CLIENTE --- */}
        <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xl font-bold text-slate-700 border-b pb-2 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-600" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                Dati cliente
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label>
                <span className="text-sm font-medium text-slate-700">Nome cliente</span>
                <input 
                  type="text" 
                  value={cliente} 
                  onChange={e=>setCliente(e.target.value)} 
                  className="w-full border border-slate-300 p-2 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 transition duration-150" 
                  placeholder="Es. Mario Rossi"
                />
              </label>
              <label>
                <span className="text-sm font-medium text-slate-700">e-mail cliente</span>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                  className="w-full border border-slate-300 p-2 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 transition duration-150" 
                  placeholder="Es. mario.rossi@mail.com"
                />
              </label>
            </div>
        </div>

        {/* --- SELEZIONE COMPONENTI PRINCIPALI --- */}
        <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xl font-bold text-slate-700 border-b pb-2 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Componenti impianto
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Inverter */}
              <label>
                <span className="text-sm font-medium text-slate-700">Inverter</span>
                <select 
                  value={selectedInverter} 
                  onChange={e=>setSelectedInverter(e.target.value)} 
                  className="w-full border border-slate-300 p-2 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                >
                  <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedInverter !== DEFAULT_SELECTION_ID}>Seleziona inverter</option>
                 {inverterList.map(i => 
<option key={i.id} value={i.id}>
{i.brand} {i.modello ? `- ${i.modello}` : ""} ({i.powerKw} kW) — {formatEuro(i.price)}
</option>
)}
                </select>
              </label>

              {/* Modulo */}
              <label>
                <span className="text-sm font-medium text-slate-700">Modulo FV</span>
                <select 
                  value={selectedModulo} 
                  onChange={e=>setSelectedModulo(e.target.value)} 
                  className="w-full border border-slate-300 p-2 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                >
                  <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedModulo !== DEFAULT_SELECTION_ID}>Seleziona modulo</option>
                 {moduloList.map(m => 
<option key={m.id} value={m.id}>
{m.brand} {m.modello ? `- ${m.modello}` : ""} ({m.powerW} W) — {formatEuro(m.price)}
</option>
)}
                </select>
              </label>

  {/* Numero Moduli */}
  <label>
    <span className="text-sm font-medium text-slate-700">Numero moduli</span>
    <input 
      type="number"
      inputMode="numeric"
      value={moduleCount === 0 ? "" : moduleCount}
      min={0} 
      onChange={e => setModuleCount(e.target.value === "" ? 0 : Number(e.target.value))}
      className="w-full border border-slate-300 p-2 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 transition duration-150" 
      placeholder="0"
    />
  </label>
              
              {/* Riepilogo Potenza Totale */}
              <div className="lg:col-span-3 mt-1">
                <div className="text-lg font-bold text-sky-700 p-3 w-full border border-sky-300 bg-sky-50 rounded-lg shadow-sm text-center">
                    Potenza totale impianto: **{modulesTotalKw.toFixed(2)} kWp**
                </div>
              </div>

             {/* Batteria */}
<div className="sm:col-span-2 grid grid-cols-2 gap-2 items-end">

  <label className="lg:col-span-0">
    <span className="text-sm font-medium text-slate-700">
      Batteria di accumulo (Opzionale)
    </span>

    <select
      value={selectedBatteria}
      onChange={e => setSelectedBatteria(e.target.value)}
      className="w-full border border-slate-300 p-2 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500"
    >
      <option value={DEFAULT_SELECTION_ID}>Nessuna batteria</option>

      {filteredBatteriaList.map(b => (
<option key={b.id} value={b.id}>
{b.brand} {b.modello ? `- ${b.modello}` : ""} ({b.capacityKwh} kWh) — {formatEuro(b.price)}
</option>
))}

    </select>

  </label>

  <div className="col-span-1 flex flex-col items-center">
  <span className="text-sm font-medium text-slate-700">
    Quantità batterie
  </span>

  <div className="flex items-center mt-1 border border-slate-300 rounded-md overflow-hidden w-28">

    <button
      type="button"
      onClick={() => setBatteryQuantity(q => Math.max(1, q - 1))}
      disabled={selectedBatteria === DEFAULT_SELECTION_ID}
      className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
    >
      −
    </button>

    <div className="flex-1 text-center text-slate-800">
      {batteryQuantity}
    </div>

    <button
      type="button"
      onClick={() => setBatteryQuantity(q => Math.min(10, q + 1))}
      disabled={selectedBatteria === DEFAULT_SELECTION_ID}
      className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
    >
      +
    </button>

  </div>
</div>

  {selectedInverterObj && (
    <p className="text-xs text-slate-500 col-span-2">
      Mostra solo batterie compatibili con <b>{selectedInverterObj.brand}</b>.
    </p>
  )}

</div>

              {/* Struttura */}
              <label>
                <span className="text-sm font-medium text-slate-700">Struttura di montaggio</span>
                <select 
                  value={selectedStruttura} 
                  onChange={e=>setSelectedStruttura(e.target.value)} 
                  className="w-full border border-slate-300 p-2 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                >
                  <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedStruttura !== DEFAULT_SELECTION_ID}>Seleziona struttura</option>
                  {strutturaList.map(s => <option key={s.id} value={s.id}>{s.type} — {formatEuro(s.price)} Totale</option>)}
                </select>
              </label>
            </div>
        </div>

        {/* --- TOTALI E EXPORT --- */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Dettaglio Costi */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 shadow-inner">
            <h3 className="font-bold text-xl text-slate-700 mb-3 border-b pb-2">Dettaglio costi netti (IVA esclusa)</h3>
           <ul className="text-sm space-y-2">

  <li className="flex justify-between items-center">
    <span>Moduli FV ({moduleCount}x)</span>
    <b>{formatEuro(prices.modulesPrice)}</b>
  </li>

  <li className="flex justify-between items-center">
    <span>Inverter</span>
    <b>{formatEuro(prices.inverterPrice)}</b>
  </li>

  <li className="flex justify-between items-center">
   <span>Batteria {selectedBatteriaObj ? `(${batteryQuantity}x)` : ""}</span>
    <b>{formatEuro(prices.batteryPrice)}</b>
  </li>

  <li className="flex justify-between items-center border-b border-slate-200 pb-2">
    <span>Struttura ({selectedStrutturaObj?.type || "N/A"})</span>
    <b>{formatEuro(prices.structurePrice)}</b>
  </li>

  <li className="flex justify-between items-center pt-2 font-semibold text-slate-800">
    <span>Costo materiali (totale)</span>
    <b>{formatEuro(prices.materialCost)}</b>
  </li>

  <li className="flex justify-between items-center pt-2 border-t border-slate-200 text-sky-700 bg-sky-50 p-2 rounded-md font-semibold">
    <span>Manodopera / Cablaggio ({LABOUR_AND_WIRING_COST_PER_KWP} €/kWp)</span>
    <b>{formatEuro(prices.labourAndWiringPrice)}</b>
  </li>

  <li className="flex justify-between items-center pt-2 border-t border-slate-200 text-sky-700 bg-sky-50 p-2 rounded-md font-semibold">
    <span>Pratiche e documentazione</span>
    <b>{formatEuro(prices.documentationCost)}</b>
  </li>

  <li className="flex justify-between items-center pt-2 font-extrabold text-lg text-slate-800 border-t border-slate-300">
    <span>Subtotale preventivo</span>
    <b>{formatEuro(prices.subtotal)}</b>
  </li>

</ul>
          </div>
          
          {/* Totale Finale */}
          <div className="p-6 rounded-xl bg-sky-600 text-white shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl mb-3 border-b border-sky-400 pb-2">Totale preventivo <br/>"chiavi in mano"</h3>
              
              <div className="text-sm mb-2">
                {applyVAT && <span>IVA ({IVA_RATE*100}%): <b>{formatEuro(prices.iva)}</b></span>}
              </div>
              
              <div className="text-4xl font-extrabold">
                {formatEuro(applyVAT ? prices.total : prices.subtotal)}
              </div>
              <div className="text-lg font-semibold mt-1">
                {applyVAT ? "(Prezzo lordo) 💵" : "(Prezzo netto) 🏷️"}
              </div>
            </div>
            
            <div className="mt-6">
              <label className="flex items-center gap-2 mb-4 text-sm font-semibold">
                <input 
                  type="checkbox" 
                  checked={applyVAT} 
                  onChange={e=>setApplyVAT(e.target.checked)} 
                  className="form-checkbox h-5 w-5 text-yellow-300 rounded-sm border-2 border-white bg-sky-700 checked:bg-yellow-400 checked:border-yellow-400 focus:ring-0"
                />
                Includi IVA standard ({IVA_RATE*100}%)
              </label>

              <button 
                onClick={exportPDF} 
                className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold transition shadow-md disabled:bg-gray-400 disabled:text-gray-100 disabled:cursor-not-allowed"
                disabled={errors.length > 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {errors.length > 0 ? "Risolvi gli errori per esportare" : "Esporta Preventivo in PDF"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PvEstimator;