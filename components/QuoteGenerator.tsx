"use client"

interface QuoteGeneratorProps {
  modulesCost: number;
  inverterCost: number;
  batteryCost: number;
}

export default function QuoteGenerator({

modulesCost,
inverterCost,
batteryCost

}: QuoteGeneratorProps){

const total=modulesCost+inverterCost+batteryCost

return(

<div className="p-6 border rounded">

<h2>Preventivo impianto</h2>

<p>Moduli: €{modulesCost}</p>

<p>Inverter: €{inverterCost}</p>

<p>Batterie: €{batteryCost}</p>

<h3 className="text-xl font-bold">

Totale: €{total}

</h3>

<button
className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
>

Scarica preventivo

</button>

</div>

)

}