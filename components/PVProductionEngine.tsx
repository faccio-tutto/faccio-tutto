"use client"

import { useMemo } from "react"
import { production25Years } from "@/utils/pvProduction25y"

interface Props{
systemKw:number
irradiation:number
}

export default function PVProductionEngine({
systemKw,
irradiation
}:Props){

const firstYear=systemKw*irradiation

const production=useMemo(()=>{

return production25Years(firstYear)

},[firstYear])


return(

<div className="bg-green-50 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Produzione 25 anni
</h2>

<div className="grid grid-cols-5 gap-2 text-sm">

{production.map(p=>(

<div
key={p.year}
className="bg-white border p-2 rounded text-center"
>

<p>Anno {p.year}</p>
<p className="font-bold">{p.value.toFixed(0)} kWh</p>

</div>

))}

</div>

</div>

)

}