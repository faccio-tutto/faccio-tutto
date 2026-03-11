"use client"

import { useState } from "react"

export default function RoofDesigner(){

const [panels, setPanels] = useState<{ x: number; y: number }[]>([])

function addPanel(x:number,y:number){

setPanels([...panels,{x,y}])

}

return(

<div>

<h2>Disegno tetto</h2>

<div
className="relative border w-full h-96"
onClick={(e)=>{

const rect=e.currentTarget.getBoundingClientRect()

addPanel(
e.clientX-rect.left,
e.clientY-rect.top
)

}}

>

{panels.map((p,i)=>(

<div
key={i}
className="absolute bg-blue-500"
style={{
left:p.x,
top:p.y,
width:40,
height:80
}}
/>

))}

</div>

</div>

)

}