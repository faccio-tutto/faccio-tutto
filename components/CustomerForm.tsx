"use client"

import { useState } from "react"

export default function CustomerForm(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")

function submit(){

console.log({
name,
email
})

}

return(

<div className="border p-6 rounded">

<h2 className="text-xl font-bold mb-4">
Richiedi preventivo
</h2>

<input
placeholder="Nome"
value={name}
onChange={e=>setName(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
className="border p-2 w-full mb-2"
/>

<button
onClick={submit}
className="bg-blue-600 text-white px-4 py-2 rounded"
>

Invia richiesta

</button>

</div>

)

}