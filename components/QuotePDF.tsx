"use client"

import jsPDF from "jspdf"

export default function QuotePDF({totalCost}: {totalCost: number}){

function generatePDF(){

const doc=new jsPDF()

doc.setFontSize(18)

doc.text("Preventivo impianto fotovoltaico",20,20)

doc.setFontSize(14)

doc.text(`Costo totale: € ${totalCost}`,20,40)

doc.text("facciotutto.it",20,60)

doc.save("preventivo-fotovoltaico.pdf")

}

return(

<button
onClick={generatePDF}
className="bg-green-600 text-white px-4 py-2 rounded"
>

Scarica preventivo PDF

</button>

)

}