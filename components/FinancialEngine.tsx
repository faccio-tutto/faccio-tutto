"use client"

import { production25Years } from "@/utils/pvProduction25y"
import { totalSaving25Years } from "@/utils/financeCalc"

export default function FinancialEngine({
systemCost,
systemKw,
irradiation,
energyPrice
}: {
  systemCost: number;
  systemKw: number;
  irradiation: number;
  energyPrice: number;
}){

const firstYear=systemKw*irradiation

const production=production25Years(firstYear)

const saving25=totalSaving25Years(production,energyPrice)

const payback=systemCost/(firstYear*energyPrice)

return(

<div className="bg-blue-50 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">

Simulazione finanziaria

</h2>

<p>

Risparmio 25 anni

<strong className="ml-2">

€ {saving25.toFixed(0)}

</strong>

</p>

<p>

Payback

<strong className="ml-2">

{payback.toFixed(1)} anni

</strong>

</p>

</div>

)

}