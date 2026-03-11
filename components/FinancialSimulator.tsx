"use client"

import { useMemo } from "react"

interface Props{
  systemCost:number
  production:number
  energyPrice:number
  battery:boolean
}

export default function FinancialSimulator({
  systemCost,
  production,
  energyPrice,
  battery
}:Props){

const selfConsumptionRate = battery ? 0.7 : 0.35


const selfConsumption = useMemo(()=>{

return production * selfConsumptionRate

},[production,selfConsumptionRate])


const annualSaving = useMemo(()=>{

return selfConsumption * energyPrice

},[selfConsumption,energyPrice])


const payback = useMemo(()=>{

if(!annualSaving) return 0

return systemCost / annualSaving

},[systemCost,annualSaving])


const roi = useMemo(()=>{

return (annualSaving/systemCost)*100

},[annualSaving,systemCost])


return(

<div className="bg-blue-50 p-6 rounded-xl space-y-4">

<h2 className="text-xl font-bold">

Simulazione Economica

</h2>

<p>

Autoconsumo stimato:

<strong className="ml-2">

{selfConsumption.toFixed(0)} kWh

</strong>

</p>

<p>

Risparmio annuo:

<strong className="ml-2">

€ {annualSaving.toFixed(0)}

</strong>

</p>

<p>

Payback:

<strong className="ml-2">

{payback.toFixed(1)} anni

</strong>

</p>

<p>

ROI annuo:

<strong className="ml-2">

{roi.toFixed(1)} %

</strong>

</p>

</div>

)

}