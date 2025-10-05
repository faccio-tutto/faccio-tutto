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
// COSTO FISSO AGGIORNATO (200 €/kWp) per Manodopera, Cablaggio, Quadri, Pratiche, ecc.
const LABOUR_AND_WIRING_COST_PER_KWP = 200; 

const PvEstimator: FC = () => {
  // --- STATI PER I DATI DEL CLIENTE (NUOVO) ---
  const [cliente, setCliente] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // --- STATI TIPIZZATI ---
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
          { id: "inv1", brand: "Huawei", powerKw: 5, price: 650.00 },
          { id: "inv2", brand: "Huawei", powerKw: 6, price: 850.00 }, 
          { id: "inv3", brand: "Deye monofase", powerKw: 6, price: 1100.00 },  
          { id: "inv4", brand: "Fronius", powerKw: 6, price: 2100.00 }, 
          { id: "inv5", brand: "SMA", powerKw: 8, price: 2800.00 }, 
        ],
        moduli: [
          { id: "mod1", brand: "JA Solar", powerW: 430, price: 99.00 }, 
          { id: "mod2", brand: "Trina", powerW: 450, price: 108.00 }, 
          { id: "mod3", brand: "Canadian Solar", powerW: 460, price: 115.00 }, 
        ],
        batterie: [
          { id: "bat1", brand: "Huawei Luna", capacityKwh: 5, price: 2250.00 }, 
          { id: "bat2", brand: "BYD", capacityKwh: 5, price: 2500.00 }, 
          { id: "bat3", brand: "V-Tac", capacityKwh: 9.6, price: 2000.00 }, 
          { id: "bat4", brand: "Huawei Luna", capacityKwh: 10, price: 5050.00 }, 
          { id: "bat5", brand: "LG Chem", capacityKwh: 10, price: 4600.00 }, 
          { id: "bat6", brand: "Huawei Luna", capacityKwh: 15, price: 6500.00 }, 
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
      if (data.inverter?.length) setSelectedInverter(data.inverter[1].id); // inv2 (6kW)
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


  // --- Calcoli Derivati ---

  // Potenza moduli totale (in kWp)
  const modulesTotalKw = useMemo(() => {
    if (!selectedModuloObj || moduleCount <= 0) return 0;
    // Calcolo kWp: (Potenza W * Conteggio Moduli) / 1000
    return +(selectedModuloObj.powerW * moduleCount / 1000).toFixed(2); 
  }, [selectedModuloObj, moduleCount]);


  // Prezzi Netti (Subtotale)
  const prices = useMemo(() => {
    if (modulesTotalKw === 0 || !selectedModuloObj || !selectedInverterObj || !selectedStrutturaObj) {
        return { 
            modulesPrice: 0, inverterPrice: 0, batteryPrice: 0, structurePrice: 0, 
            materialCost: 0, labourAndWiringPrice: 0, 
            subtotal: 0, iva: 0, total: 0 
        };
    }
    
    // a) Componenti (Costi Materiali)
    const modulesPrice = selectedModuloObj.price * moduleCount; 
    const inverterPrice = selectedInverterObj.price;
    const batteryPrice = selectedBatteriaObj ? selectedBatteriaObj.price : 0;
    const structurePrice = selectedStrutturaObj.price; 
    
    // Costo Totale Materiali
    const materialCost = modulesPrice + inverterPrice + batteryPrice + structurePrice;

    // b) Manodopera & Cablaggio (Costo fisso per kWp)
    // Calcolo: Potenza Totale Moduli (kWp) * 200 €/kWp 
    const labourAndWiringPrice = modulesTotalKw * LABOUR_AND_WIRING_COST_PER_KWP; 

    // Subtotale (Netto)
    const subtotal = materialCost + labourAndWiringPrice;
    
    // IVA
    const iva = subtotal * IVA_RATE;
    
    // Totale Lordo
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
    
    // Controllo obbligatorio per l'esportazione:
    if (!cliente.trim() || !email.trim()) {
        errs.push("⚠️ Inserisci nome cliente ed email per l'esportazione.");
    }

    // 1. Potenza Inverter/Moduli (30% max)
    if (selectedInverterObj.powerKw > 0 && modulesTotalKw > selectedInverterObj.powerKw * 1.3) {
      errs.push(`⚠️ La potenza dei moduli (${modulesTotalKw} kWp) supera del 30% la potenza nominale dell'inverter (${selectedInverterObj.powerKw} kW).`);
    }
    
    // 2. Costo PNRR (€/kW)
    if (modulesTotalKw > 0) {
      const costoPerKwNetto = prices.subtotal / modulesTotalKw;
      if (costoPerKwNetto > PNRR_MAX) {
        errs.push(`⚠️ Il costo netto per kW (${costoPerKwNetto.toFixed(2)} €/kW) supera il massimale PNRR (${PNRR_MAX} €/kW).`);
      }
    }
    return errs;
  }, [selectedInverterObj, modulesTotalKw, prices.subtotal, selectedModuloObj, cliente, email]);


  // --- Helpers ---
  const formatEuro = (v: number) => v.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const exportPDF = async () => {
    if (errors.length > 0) {
        console.error("Impossibile esportare: sono presenti errori di conformità.");
        return;
    }
    try {
      // NOTE: Ho cambiato l'URL da /api/pdf a /api/preventivo-pdf per matchare la tua cartella
      // Se hai spostato il file route.ts nella cartella /api/pdf/, ripristina a "/api/pdf"
      const res = await fetch("/api/pdf", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // AGGIUNTE: Cliente ed Email
          cliente: cliente,
          email: email,

          // CORREZIONI: Allineamento dei nomi delle proprietà al Backend API
          inverter: selectedInverterObj,
          moduli: selectedModuloObj,       // CORRETTO: da 'modulo' a 'moduli'
          numeroModuli: moduleCount,       // AGGIUNTO: Necessario per il backend
          batteria: selectedBatteriaObj,
          struttura: selectedStrutturaObj,
          
          // AGGIUNTO: Cablaggio (Manodopera e Cablaggio)
          cablaggio: prices.labourAndWiringPrice,

          // AGGIUNTO: Totale (seleziona Lordo o Netto in base alla checkbox)
          totale: applyVAT ? prices.total : prices.subtotal,
          
          // I campi rimanenti non sono necessari per l'API, ma li lascio se li vuoi riattivare:
          // modulesTotalKw,
          // installationCostPerKw: LABOUR_AND_WIRING_COST_PER_KWP,
          // materialCost: prices.materialCost,
          // prices: { ...prices, isNetto: !applyVAT },
        })
      });
      
      if (!res.ok) throw new Error("PDF generation failed: " + (await res.json()).error); // Migliorato il messaggio d'errore

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

        {/* --- CAMPI CLIENTE (NUOVI) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label>
            <span className="text-lm font-medium text-gray-700">Nome Cliente</span>
            <input 
              type="text" 
              value={cliente} 
              onChange={e=>setCliente(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500" 
              placeholder="Es. Mario Rossi"
            />
          </label>
          <label>
            <span className="text-lm font-medium text-gray-700">Email Cliente</span>
            <input 
              type="email" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500" 
              placeholder="Es. mario.rossi@mail.com"
            />
          </label>
        </div>
        {/* --- FINE CAMPI CLIENTE --- */}

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Inverter */}
          <label>
            <span className="text-lm font-medium text-gray-700">Inverter</span>
            <select 
              value={selectedInverter} 
              onChange={e=>setSelectedInverter(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
              {inverterList.map(i => <option key={i.id} value={i.id}>{i.brand} ({i.powerKw} kW) — {formatEuro(i.price)}</option>)}
            </select>
          </label>

          {/* Modulo */}
          <label>
            <span className="text-lm font-medium text-gray-700">Modulo FV</span>
            <select 
              value={selectedModulo} 
              onChange={e=>setSelectedModulo(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
              {moduloList.map(m => <option key={m.id} value={m.id}>{m.brand} ({m.powerW} W) — {formatEuro(m.price)}</option>)}
            </select>
          </label>

          {/* Numero Moduli */}
          <label>
            <span className="text-lm font-medium text-gray-700">Numero moduli</span>
            <input 
              type="number" 
              value={moduleCount} 
              min={1} 
              onChange={e=>setModuleCount(Number(e.target.value))} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500" 
            />
          </label>
          
          {/* Riepilogo Potenza Nominale Totale */}
          <div className="lg:col-span-3 -mt-2 mb-4">
            <div className="text-xl font-semibold text-sky-700 p-2 w-full border border-gray-300 bg-white rounded-lg">
                Potenza nominale totale (kWp): **{modulesTotalKw.toFixed(2)} kWp**
            </div>
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
              {batteriaList.map(b => <option key={b.id} value={b.id}>{b.brand} ({b.capacityKwh} kWh) — {formatEuro(b.price)}</option>)}
            </select>
          </label>

          {/* Struttura */}
          <label>
            <span className="text-lm font-medium text-gray-700">Struttura di Montaggio</span>
            <select 
              value={selectedStruttura} 
              onChange={e=>setSelectedStruttura(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500"
            >
              {strutturaList.map(s => <option key={s.id} value={s.id}>{s.type} — {formatEuro(s.price)} Totale</option>)}
            </select>
          </label>
        </div>

        {/* Totali */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">Dettaglio Costi Netti</h3>
            <ul className="text-sm space-y-1">
              <li className="flex justify-between"><span>Moduli ({moduleCount}x):</span> <b>{formatEuro(prices.modulesPrice)}</b></li>
              <li className="flex justify-between"><span>Inverter:</span> <b>{formatEuro(prices.inverterPrice)}</b></li>
              <li className="flex justify-between"><span>Batteria:</span> <b>{formatEuro(prices.batteryPrice)}</b></li>
              <li className="flex justify-between border-b pb-2"><span>Struttura ({selectedStrutturaObj?.type || 'N/A'}):</span> <b>{formatEuro(prices.structurePrice)}</b></li>
              
              <li className="flex justify-between pt-2 font-semibold"><span>Costo Materiali (Netto):</span> <b>{formatEuro(prices.materialCost)}</b></li>
              
              {/* Voci calcolate su €/kWp fisso */}
              <li className="flex justify-between border-b pb-2 text-black bg-white p-1 rounded">
                {/* Visualizza la logica di calcolo per chiarezza */}
                <span>Manodopera e cablaggio (kWp x €/kWp):</span> 
                <b className="font-extrabold">{formatEuro(prices.labourAndWiringPrice)}</b>
              </li>
              
              <li className="flex justify-between pt-2 font-extrabold text-base text-sky-800"><span>Subtotale (Netto Finale):</span> <b>{formatEuro(prices.subtotal)}</b></li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white border border-sky-700 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl text-sky-700">Totale preventivo "chiavi in mano"</h3>
              <div className="text-sm text-gray-700 mt-1">
                {applyVAT && <span>IVA ({IVA_RATE*100}%): <b>{formatEuro(prices.iva)}</b></span>}
              </div>
              <div className="text-3xl font-extrabold text-sky-700 mt-2">
                {formatEuro(applyVAT ? prices.total : prices.subtotal)}
                <span className="text-sm font-normal text-gray-600 ml-2">{applyVAT ? "(Lordo)" : "(Netto)"}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                <input 
                  type="checkbox" 
                  checked={applyVAT} 
                  onChange={e=>setApplyVAT(e.target.checked)} 
                  className="form-checkbox h-4 w-4 text-sky-600 rounded-sm"
                />
                Includi IVA ({IVA_RATE*100}%)
              </label>

              <button 
                onClick={exportPDF} 
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition shadow-md disabled:bg-gray-400"
                disabled={errors.length > 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 0 003 3h10a3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              Esporta preventivo in pdf
              </button>
              {errors.length > 0 && <p className="text-xs text-center text-red-500 mt-1">Risolvi gli errori per esportare.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default PvEstimator;