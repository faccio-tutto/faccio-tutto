"use client";

import React, { useMemo, useState, useEffect, FC } from "react";

// --- INTERFACCE TYPESCRIPT ---
interface Inverter {
  id: string;
  brand: string;
  powerKw: number;
  price: number;
}

interface Modulo {
  id: string;
  brand: string;
  powerW: number; // Watt
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

// --- CONFIGURAZIONE COSTANTI ---
const IVA_RATE = 0.22;
const PNRR_MAX = 1500; // €/kW massimo incentivabile (Netto)
const LABOUR_AND_WIRING_COST_PER_KWP = 200; 

// Valore di default usato per le selezioni non effettuate
const DEFAULT_SELECTION_ID = "default_select";

const PvEstimator: FC = () => {
  // --- STATI TIPIZZATI ---
  const [cliente, setCliente] = useState<string>("Mario Rossi");
  const [email, setEmail] = useState<string>("mario.rossi@esempio.it");
  
  const [inverterList, setInverterList] = useState<Inverter[]>([]);
  const [moduloList, setModuloList] = useState<Modulo[]>([]);
  const [batteriaList, setBatteriaList] = useState<Batteria[]>([]);
  const [strutturaList, setStrutturaList] = useState<Struttura[]>([]);

  // IMPOSTAZIONE INIZIALE AGGIORNATA
  const [selectedInverter, setSelectedInverter] = useState(DEFAULT_SELECTION_ID);
  const [selectedModulo, setSelectedModulo] = useState(DEFAULT_SELECTION_ID);
  const [moduleCount, setModuleCount] = useState<number>(14); 
  // Manteniamo "none" per l'opzione "Nessuna Batteria"
  const [selectedBatteria, setSelectedBatteria] = useState("none"); 
  const [selectedStruttura, setSelectedStruttura] = useState(DEFAULT_SELECTION_ID);
  const [applyVAT, setApplyVAT] = useState<boolean>(true);
  
  const [isLoading, setIsLoading] = useState(true);

  // --- Caricamento Listini Fissi ---
  useEffect(() => {
    const fetchData = () => {
      // Dati dei listini (prezzi medi netti IVA esclusa)
      const data: ListiniData = {
        inverter: [
          { id: "inv1", brand: "Huawei", powerKw: 5, price: 650 },
          { id: "inv2", brand: "Huawei", powerKw: 6, price: 850 }, 
          { id: "inv3", brand: "Deye monofase", powerKw: 6, price: 1100 },  
          { id: "inv4", brand: "Fronius", powerKw: 6, price: 2100 }, 
          { id: "inv5", brand: "SMA", powerKw: 8, price: 2800 }, 
        ],
        moduli: [
          { id: "mod1", brand: "JA Solar", powerW: 430, price: 99 }, 
          { id: "mod2", brand: "Trina", powerW: 450, price: 108 }, 
          { id: "mod3", brand: "Canadian Solar", powerW: 460, price: 115 }, 
        ],
        batterie: [
          { id: "bat1", brand: "Huawei", modello: "Luna", capacityKwh: 5, price: 2250.00 }, 
          { id: "bat2", brand: "BYD", capacityKwh: 5, price: 2500.00 },
          { id: "bat3", brand: "V-Tac", capacityKwh: 9.6, price: 2000.00 }, 
          { id: "bat4", brand: "Huawei", modello: "Luna", capacityKwh: 10, price: 5050.00 }, 
          { id: "bat5", brand: "LG Chem", capacityKwh: 10, price: 4600.00 }, 
          { id: "bat6", brand: "Huawei", modello: "Luna", capacityKwh: 15, price: 6500.00 }, 
        ],
        strutture: [
          { id: "str1", type: "Tetto inclinato (tegole/coppi)", price: 1013.25 }, 
          { id: "str2", type: "Tetto piano (zavorrato)", price: 668.98 }, 
          { id: "str3", type: "Pensilina / Pergolato", price: 849.31 }, 
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

  // --- OGGETTI SELEZIONATI TIPIZZATI ---
  const selectedModuloObj: Modulo | undefined = moduloList.find(m => m.id === selectedModulo && m.id !== DEFAULT_SELECTION_ID);
  const selectedInverterObj: Inverter | undefined = inverterList.find(i => i.id === selectedInverter && i.id !== DEFAULT_SELECTION_ID);
  const selectedBatteriaObj: Batteria | undefined | null = selectedBatteria === "none" ? null : batteriaList.find(b => b.id === selectedBatteria); 
  const selectedStrutturaObj: Struttura | undefined = strutturaList.find(s => s.id === selectedStruttura && s.id !== DEFAULT_SELECTION_ID);


  // --- BLOCCO FILTRO: LOGICA RIGOROSA PER MARCA ---
  const filteredBatteriaList = useMemo(() => {
    if (!selectedInverterObj) return []; 

    const inverterBrand = selectedInverterObj.brand;
    const compatibleBrands: string[] = [inverterBrand]; 
    
    if (inverterBrand === "Deye monofase") {
      compatibleBrands.push("V-Tac");
    } 
    
    return batteriaList.filter(b => compatibleBrands.includes(b.brand));
  }, [selectedInverterObj, batteriaList]);


  // --- VALIDAZIONE E RESET ---
  useEffect(() => {
    if (selectedBatteria === "none" || selectedBatteria === DEFAULT_SELECTION_ID) return; 

    const isCurrentlyCompatible = filteredBatteriaList.some(b => b.id === selectedBatteria);

    if (!isCurrentlyCompatible) {
      setSelectedBatteria("none"); 
    }
  }, [selectedBatteria, filteredBatteriaList, setSelectedBatteria]); 


  // --- Calcoli Derivati ---
  const modulesTotalKw = useMemo(() => {
    if (!selectedModuloObj || moduleCount <= 0) return 0;
    return +(selectedModuloObj.powerW * moduleCount / 1000).toFixed(2); 
  }, [selectedModuloObj, moduleCount]);

  const prices = useMemo(() => {
    if (!selectedModuloObj || !selectedInverterObj || !selectedStrutturaObj || modulesTotalKw === 0) {
        return { 
            modulesPrice: 0, inverterPrice: 0, batteryPrice: 0, structurePrice: 0, 
            materialCost: 0, labourAndWiringPrice: 0, 
            subtotal: 0, iva: 0, total: 0 
        };
    }
    
    const modulesPrice = selectedModuloObj.price * moduleCount; 
    const inverterPrice = selectedInverterObj.price;
    const batteryPrice = selectedBatteriaObj ? selectedBatteriaObj.price : 0;
    const structurePrice = selectedStrutturaObj.price; 
    
    const materialCost = modulesPrice + inverterPrice + batteryPrice + structurePrice;
    const labourAndWiringPrice = modulesTotalKw * LABOUR_AND_WIRING_COST_PER_KWP; 
    const subtotal = materialCost + labourAndWiringPrice;
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;

    return { 
        modulesPrice, inverterPrice, batteryPrice, structurePrice, 
        materialCost, labourAndWiringPrice, 
        subtotal, iva, total 
    };
  }, [selectedModuloObj, moduleCount, selectedInverterObj, selectedBatteriaObj, selectedStrutturaObj, modulesTotalKw]);


  // --- Validazioni ---
  const errors = useMemo(() => {
    const errs: string[] = [];
    
    // Controlli base sulla selezione
    if (selectedInverter === DEFAULT_SELECTION_ID) {
        errs.push("⚠️ Seleziona un Inverter.");
    }
    if (selectedModulo === DEFAULT_SELECTION_ID) {
        errs.push("⚠️ Seleziona un Modulo.");
    }
    if (selectedStruttura === DEFAULT_SELECTION_ID) {
        errs.push("⚠️ Seleziona una Struttura.");
    }
    if (moduleCount < 1) {
        errs.push("⚠️ Inserisci un numero di moduli valido.");
    }
    
    if (!cliente.trim() || !email.trim()) {
        errs.push("⚠️ Inserisci nome cliente ed email per l'esportazione.");
    }
    
    // Validazione compatibilità batteria (rigorosa)
    if (selectedBatteria !== "none") {
        const isCompatible = filteredBatteriaList.some(b => b.id === selectedBatteria);
        if (!isCompatible) {
             errs.push("❌ Errore di Compatibilità: La batteria selezionata non è compatibile con l'inverter.");
        }
    }

    // Validazioni tecniche (solo se i componenti principali sono selezionati)
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


  // --- Helpers ---
  const formatEuro = (v: number) => v.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const exportPDF = async () => {
    if (errors.length > 0) {
        console.error("Impossibile esportare: sono presenti errori di conformità.");
        return;
    }
    try {
      const res = await fetch("/api/pdf", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: cliente,
          email: email,
          inverter: selectedInverterObj,
          moduli: selectedModuloObj,      
          numeroModuli: moduleCount,      
          batteria: selectedBatteriaObj,
          struttura: selectedStrutturaObj,
          cablaggio: prices.labourAndWiringPrice,
          totale: applyVAT ? prices.total : prices.subtotal,
        })
      });
      
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
    return <div className="max-w-4xl mx-auto p-6 text-center text-lg text-sky-600">Caricamento listini...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-extrabold text-sky-700 mb-6 text-center">
        Crea il preventivo per il tuo impianto
      </h1>

      <div className="p-6 space-y-6 border rounded-2xl shadow-xl bg-green-200">
        <div className="text-2xl font-extrabold text-black border-b pb-3 mb-4">Selezione componenti</div>

        {/* Messaggi di Errore / Validazione */}
        {errors.length > 0 && (
          <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg shadow-sm">
            <div className="font-semibold text-black mb-1">Problemi di conformità:</div>
            {errors.map((e,i) => <div key={i} className="text-sm">{e}</div>)}
          </div>
        )}

        {/* Campi Cliente (omessi per brevità) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label>
              <span className="text-lm font-medium text-gray-700">Nome Cliente</span>
              <input
                  type="text"
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  placeholder="Mario Rossi"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              />
          </label>
          <label>
              <span className="text-lm font-medium text-gray-700">Email Cliente</span>
              <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="mario.rossi@esempio.it"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              />
          </label>
        </div>
        
        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Inverter */}
          <label>
            <span className="text-lm font-medium text-gray-700">Inverter</span>
            <select 
                value={selectedInverter} 
                onChange={e => setSelectedInverter(e.target.value)} 
                className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
                {/* CORREZIONE: Opzione di default con selected e disabled */}
                <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedInverter !== DEFAULT_SELECTION_ID}>Seleziona Inverter</option>
                {inverterList.map(i => <option key={i.id} value={i.id}>{i.brand} ({i.powerKw} kW) — {formatEuro(i.price)}</option>)}
            </select>
          </label>

          {/* Modulo */}
          <label>
            <span className="text-lm font-medium text-gray-700">Modulo (Pz: {moduleCount})</span>
            <select 
                value={selectedModulo} 
                onChange={e => setSelectedModulo(e.target.value)} 
                className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
                {/* CORREZIONE: Opzione di default con selected e disabled */}
                <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedModulo !== DEFAULT_SELECTION_ID}>Seleziona Modulo</option>
                {moduloList.map(m => <option key={m.id} value={m.id}>{m.brand} ({m.powerW} W) — {formatEuro(m.price)}</option>)}
            </select>
          </label>

          {/* Numero Moduli */}
          <label>
              <span className="text-lm font-medium text-gray-700">Numero Moduli</span>
              <input
                  type="number"
                  value={moduleCount}
                  onChange={e => setModuleCount(Number(e.target.value))}
                  min="1"
                  placeholder="Seleziona Numero Moduli"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              />
          </label>
          
          {/* Riepilogo Potenza Nominale Totale (invariato) */}
          <div className="sm:col-span-3 text-center p-3 bg-white border border-dashed rounded-lg">
              <span className="text-lg font-bold text-sky-700">Potenza Totale: {modulesTotalKw} kWp</span>
          </div>

          {/* Batteria */}
          <label className="sm:col-span-2">
            <span className="text-lm font-medium text-gray-700">Batteria (Opzionale)</span>
            <select 
              value={selectedBatteria} 
              onChange={e=>setSelectedBatteria(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="none">Nessuna</option>
              {/* Rimosso il caso complesso: lasciamo solo la lista filtrata e l'opzione "Nessuna" */}
              {filteredBatteriaList.map(b => 
                <option key={b.id} value={b.id}>
                    {b.brand} {b.modello ? `(${b.modello})` : ''} ({b.capacityKwh} kWh) — {formatEuro(b.price)}
                </option>
              )}
            </select>
            {/* Messaggio di guida per l'utente */}
            {selectedInverterObj && (
                <p className="text-xs text-gray-500 mt-1">
                    Mostra solo batterie compatibili con **{selectedInverterObj.brand}**.
                </p>
            )}
          </label>

          {/* Struttura */}
          <label>
            <span className="text-lm font-medium text-gray-700">Struttura</span>
            <select 
                value={selectedStruttura} 
                onChange={e => setSelectedStruttura(e.target.value)} 
                className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
                {/* CORREZIONE: Opzione di default con selected e disabled */}
                <option value={DEFAULT_SELECTION_ID} disabled hidden={selectedStruttura !== DEFAULT_SELECTION_ID}>Seleziona Struttura</option>
                {strutturaList.map(s => <option key={s.id} value={s.id}>{s.type} — {formatEuro(s.price)}</option>)}
            </select>
          </label>
        </div>

        {/* Totali e Export (omessi per brevità) */}
        <div className="p-4 bg-white rounded-lg shadow-inner">
            <div className="text-xl font-bold text-black border-b pb-2 mb-2">Riepilogo Costi (Netto)</div>
            <div className="space-y-1">
                <div className="flex justify-between text-sm"><span>Costo Materiali:</span><span>{formatEuro(prices.materialCost)}</span></div>
                <div className="flex justify-between text-sm"><span>Costo Manodopera/Cablaggio ({LABOUR_AND_WIRING_COST_PER_KWP} €/kWp):</span><span>{formatEuro(prices.labourAndWiringPrice)}</span></div>
                <div className="flex justify-between text-sm font-semibold border-t pt-2"><span>Subtotale (Imponibile):</span><span>{formatEuro(prices.subtotal)}</span></div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-sky-700">Totale (IVA {applyVAT ? IVA_RATE * 100 : 0}%)</span>
                    <span className="text-2xl font-extrabold text-sky-700">{formatEuro(applyVAT ? prices.total : prices.subtotal)}</span>
                </div>
                
                <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        checked={applyVAT} 
                        onChange={e => setApplyVAT(e.target.checked)} 
                        className="form-checkbox h-4 w-4 text-sky-600"
                    />
                    <span className="text-sm text-gray-700">Applica IVA ({IVA_RATE * 100}%)</span>
                </label>
            </div>
        </div>

        {/* Pulsante di Esportazione */}
        <div className="text-center mt-6">
            <button
                onClick={exportPDF}
                disabled={errors.length > 0}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl text-lg font-bold transition duration-200 ${
                    errors.length > 0
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-sky-600 text-white hover:bg-sky-700 shadow-lg"
                }`}
            >
                {errors.length > 0 ? "Correggi errori per esportare" : "Esporta in PDF"}
            </button>
        </div>
      </div>
    </div>
  );
}

export default PvEstimator;