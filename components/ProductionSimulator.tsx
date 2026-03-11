"use client"

import { useMemo } from "react"

interface Props{
  systemKw:number
  irradiation:number
}

export default function ProductionSimulator({
  systemKw,
  irradiation
}:Props){

const yearlyProduction = useMemo(()=>{

  return systemKw * irradiation

},[systemKw,irradiation])


const monthlyProduction = useMemo(()=>{

const distribution=[2,4,10,13,17,19,19,17,12,6,3,2]

return distribution.map(p=>Math.round((yearlyProduction*p)/100))

},[yearlyProduction])


return(

<div className="bg-green-50 p-6 rounded-xl space-y-4">

<h2 className="text-xl font-bold">

Simulazione Produzione Fotovoltaica

</h2>

<p>

Produzione annua stimata:

<strong className="ml-2">

{yearlyProduction.toFixed(0)} kWh

</strong>

</p>


<div className="grid grid-cols-3 gap-2">

{monthlyProduction.map((m,i)=>(

<div
key={i}
className="bg-white border rounded p-2 text-center"
>

<p className="text-sm">

{[
"Gen","Feb","Mar","Apr","Mag","Giu",
"Lug","Ago","Set","Ott","Nov","Dic"
][i]}

</p>

<p className="font-bold">

{m} kWh

</p>

</div>

))}

</div>

</div>

)

}