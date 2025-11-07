import { NextResponse } from "next/server";

export async function GET() {
  const listini = {
    // Prezzi medi netti (IVA esclusa) per inverter ibridi di fascia alta
    inverter: [
      // Huawei SUN2000 5KTL-M1 (Ibrido, circa 5 kW)
      { id: "inv1", brand: "Huawei", powerKw: 5, price: 535.00 }, 
      // Huawei SUN2000-6KTL-L1 (Ibrido, circa 6 kW)
       { id: "inv2", brand: "Huawei", powerKw: 6, price: 700.00 }, 
      //V-Tac Deye Inverter Fotovoltaico Monofase Ibrido On-Grid / Off-Grid 6kW Display Touch LCD CEI 0-21 - SKU 11529
      { id: "inv3", brand: "Deye", powerKw: 6, price: 900.00 }, 
      //Unical inverter ZOE 6000 monofase ibrido 6 kw n.2 mppt con wi-fi modulo buckup incluso
      { id: "inv4", brand: "Unical", powerKw: 6, price: 1150.00 }, 
      // Fronius GEN24 Plus (Ibrido monofase, 6 kW)
      { id: "inv5", brand: "Fronius", powerKw: 6, price: 1480.00 }, 
      // SMA Sunny Tripower Smart Energy 8.0 (Ibrido, circa 8 kW)
      { id: "inv6", brand: "SMA", powerKw: 8, price: 2800.00 }, 
    ],
    // Prezzi medi netti (IVA esclusa) per moduli di fascia media/alta
    moduli: [
      // Modulo 430W (~0.23 €/W)
      { id: "mod1", brand: "JA Solar", powerW: 430, price: 99.00 }, 
      // Modulo 450W (~0.24 €/W)
      { id: "mod2", brand: "Trina", powerW: 450, price: 108.00 }, 
      // Modulo 460W (~0.25 €/W)
      { id: "mod3", brand: "Canadian Solar", powerW: 460, price: 115.00 }, 
    ],
    // Prezzi medi netti (IVA esclusa) per batterie LFP, modulari
    batterie: [
      // Batteria 5 kWh - Huawei Luna2000-5-E0 + Modulo BMS
      { id: "bat1", brand: "Huawei", modello: "Luna", capacityKwh: 5, price: 2250.00 }, 
      // Batteria 5 kWh
      { id: "bat2", brand: "BYD", capacityKwh: 5, price: 2500.00 }, 
      //FRONIUS RESERVA – BATTERIA AL LITIO PER ACCUMULO 9.5 KWH
      { id: "bat3", brand: "Fronius", capacityKwh: 9.5, price: 4160.00 },
      //BATTERIA V-TAC VT-48200B LVB LITIO 48V 9,6KW MONTAGGIO A RACK
      { id: "bat4", brand: "V-Tac", capacityKwh: 9.6, price: 2110.00 },
      // Batteria BOX Unical 10,24 kWh
      { id: "bat5", brand: "Unical", capacityKwh: 10.24, price: 3170.00 }, 
      // Batteria 10 kWh - Huawei Luna2000-10-S0 + Modulo BMS
      { id: "bat6", brand: "Huawei", modello: "Luna", capacityKwh: 10, price: 4140.00 }, 
      // Batteria 15 kWh
      { id: "bat7", brand: "Huawei", modello: "Luna", capacityKwh: 15, price: 5730.00 }, 
     
    ],
    // Prezzi netti stimati per il sistema di fissaggio (variabili in base al tipo)
    strutture: [
      // Costo complessivo per un impianto standard
      { id: "str1", type: "Tetto inclinato (tegole/coppi)", price: 1103.25 }, 
      // Richiede zavorre o fissaggi più complessi
      { id: "str2", type: "Tetto piano (zavorrato)", price: 758.98 }, 
      // La pensilina è una struttura portante più costosa
      { id: "str3", type: "Pensilina / Pergolato", price: 939.31 }, 
    ],
    // Costo medio per manodopera, cablaggi, quadri elettrici, pratiche (€/kW)
    cablaggio: {
      // Ho aumentato a 250€/kW per essere più realistico sul costo totale dell'installazione
      pricePerKw: 250, 
    },
  };

  return NextResponse.json(listini);
}
