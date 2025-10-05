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

const PvEstimator: FC = () => {
  // --- STATI TIPIZZATI ---
  const [cliente, setCliente] = useState<string>("Mario Rossi");
  const [email, setEmail] = useState<string>("mario.rossi@esempio.it");
  
  const [inverterList, setInverterList] = useState<Inverter[]>([]);
  const [moduloList, setModuloList] = useState<Modulo[]>([]);
  const [batteriaList, setBatteriaList] = useState<Batteria[]>([]);
  const [strutturaList, setStrutturaList] = useState<Struttura[]>([]);

  const [selectedInverter, setSelectedInverter] = useState("");
  const [selectedModulo, setSelectedModulo] = useState("");
  const [moduleCount, setModuleCount] = useState<number>(14);
  const [selectedBatteria, setSelectedBatteria] = useState("none"); 
  const [selectedStruttura, setSelectedStruttura] = useState("");
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
          { id: "bat1", brand: "Huawei Luna", capacityKwh: 5, price: 2250 }, 
          { id: "bat2", brand: "BYD", capacityKwh: 5, price: 2500 }, // Compatibile con Fronius, SMA (generico)
          { id: "bat3", brand: "V-Tac", capacityKwh: 9.6, price: 2000 }, // Compatibile con Deye
          { id: "bat4", brand: "Huawei Luna", capacityKwh: 10, price: 5050 }, 
          { id: "bat5", brand: "LG Chem", capacityKwh: 10, price: 4600 }, 
          { id: "bat6", brand: "Huawei Luna", capacityKwh: 15, price: 6500 }, 
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

      // Imposta i valori di default
      if (data.inverter?.length) setSelectedInverter(data.inverter[1].id); // inv2 (Huawei 6kW)
      if (data.moduli?.length) setSelectedModulo(data.moduli[1].id); // mod2 (Trina 450W)
      if (data.strutture?.length) setSelectedStruttura(data.strutture[0].id);
      
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // --- OGGETTI SELEZIONATI TIPIZZATI ---
  const selectedModuloObj: Modulo | undefined = moduloList.find(m => m.id === selectedModulo);
  const selectedInverterObj: Inverter | undefined = inverterList.find(i => i.id === selectedInverter);
  const selectedBatteriaObj: Batteria | undefined | null = selectedBatteria === "none" ? null : batteriaList.find(b => b.id === selectedBatteria); 
  const selectedStrutturaObj: Struttura | undefined = strutturaList.find(s => s.id === selectedStruttura);


  // --- Elenco Batterie Filtrato (LOGICA DI COMPATIBILITÀ) ---
  const filteredBatteriaList = useMemo(() => {
    if (!selectedInverterObj) return batteriaList;

    const inverterBrand = selectedInverterObj.brand.includes('Deye') ? 'Deye' : selectedInverterObj.brand;

    // La logica si basa sul brand
    return batteriaList.filter(b => {
      // 1. Regola standard: Inverter e Batteria devono avere la stessa marca
      const sameBrand = b.brand.includes(inverterBrand);

      // 2. Eccezione: Deye è compatibile con V-Tac
      const deyeVTacException = inverterBrand === "Deye" && b.brand === "V-Tac";

      // 3. Eccezione: V-Tac è compatibile con Deye (se Deye fosse una batteria)
      const vTacDeyeException = b.brand === "V-Tac" && inverterBrand === "Deye";

      return sameBrand || deyeVTacException || vTacDeyeException;
    });
  }, [selectedInverterObj, batteriaList]);


  // --- Validazione: Reset della Batteria Se Incompatibile ---
  useEffect(() => {
    // Se la batteria selezionata non è 'none' e non è inclusa nell'elenco filtrato, la resettiamo.
    const isCurrentlyCompatible = selectedBatteria === "none" || filteredBatteriaList.some(b => b.id === selectedBatteria);

    if (!isCurrentlyCompatible) {
      setSelectedBatteria("none"); // Resetta la batteria a "Nessuna"
    }
  }, [selectedBatteria, filteredBatteriaList, setSelectedBatteria]);


  // --- Calcoli Derivati (omessi per brevità, non modificati) ---
  const modulesTotalKw = useMemo(() => {
    if (!selectedModuloObj || moduleCount <= 0) return 0;
    return +(selectedModuloObj.powerW * moduleCount / 1000).toFixed(2); 
  }, [selectedModuloObj, moduleCount]);

  const prices = useMemo(() => {
    if (modulesTotalKw === 0 || !selectedModuloObj || !selectedInverterObj || !selectedStrutturaObj) {
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
    if (!selectedInverterObj || !selectedModuloObj) return errs;
    
    if (!cliente.trim() || !email.trim()) {
        errs.push("⚠️ Inserisci nome cliente ed email per l'esportazione.");
    }
    
    // Aggiunto: Validazione di compatibilità (anche se il filtro aiuta)
    if (selectedBatteria !== "none") {
        const isCompatible = filteredBatteriaList.some(b => b.id === selectedBatteria);
        if (!isCompatible) {
             errs.push("⚠️ La batteria selezionata non è compatibile con l'inverter.");
        }
    }


    if (selectedInverterObj.powerKw > 0 && modulesTotalKw > selectedInverterObj.powerKw * 1.3) {
      errs.push(`⚠️ La potenza dei moduli (${modulesTotalKw} kWp) supera del 30% la potenza nominale dell'inverter (${selectedInverterObj.powerKw} kW).`);
    }
    
    if (modulesTotalKw > 0) {
      const costoPerKwNetto = prices.subtotal / modulesTotalKw;
      if (costoPerKwNetto > PNRR_MAX) {
        errs.push(`⚠️ Il costo netto per kW (${costoPerKwNetto.toFixed(2)} €/kW) supera il massimale PNRR (${PNRR_MAX} €/kW).`);
      }
    }
    return errs;
  }, [selectedInverterObj, modulesTotalKw, prices.subtotal, selectedModuloObj, cliente, email, selectedBatteria, filteredBatteriaList]);


  // --- Helpers (omessi per brevità, non modificati) ---
  const formatEuro = (v: number) => v.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const exportPDF = async () => {
    if (errors.length > 0) {
        console.error("Impossibile esportare: sono presenti errori di conformità.");
        return;
    }
    try {
      // NOTE: Modificato l'URL come concordato (se il tuo API è in /api/pdf)
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
        {/* ... */}
        
        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Inverter */}
          <label>
            <span className="text-lm font-medium text-gray-700">Inverter</span>
            {/* ... */}
          </label>

          {/* Modulo */}
          <label>
            {/* ... */}
          </label>

          {/* Numero Moduli */}
          <label>
            {/* ... */}
          </label>
          
          {/* Riepilogo Potenza Nominale Totale */}
          {/* ... */}

          {/* Batteria */}
          <label className="sm:col-span-2">
            <span className="text-lm font-medium text-gray-700">Batteria (Opzionale)</span>
            <select 
              value={selectedBatteria} 
              onChange={e=>setSelectedBatteria(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="none">Nessuna</option>
              {/* Vengono mostrate SOLO le batterie compatibili */}
              {filteredBatteriaList.map(b => <option key={b.id} value={b.id}>{b.brand} ({b.capacityKwh} kWh) — {formatEuro(b.price)}</option>)}
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
            {/* ... */}
          </label>
        </div>

        {/* Totali (omessi per brevità) */}
        {/* ... */}
      </div>
    </div>
  );
}

export default PvEstimator;