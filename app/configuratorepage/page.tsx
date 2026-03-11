import MapRoofDesigner from "@/components/MapRoofDesigner"
import PVProductionEngine from "@/components/PVProductionEngine"
import FinancialEngine from "@/components/FinancialEngine"
import QuotePDF from "@/components/QuotePDF"
import CustomerForm from "@/components/CustomerForm"

export default function Page(){

const systemKw=6
const irradiation=1400
const systemCost=9000
const energyPrice=0.30

return(

<div className="max-w-7xl mx-auto p-10 space-y-8">

<h1 className="text-3xl font-bold">

Configuratore FV Super Industriale

</h1>

<MapRoofDesigner/>

<PVProductionEngine
systemKw={systemKw}
irradiation={irradiation}
/>

<FinancialEngine
systemCost={systemCost}
systemKw={systemKw}
irradiation={irradiation}
energyPrice={energyPrice}
/>

<QuotePDF totalCost={systemCost}/>

<CustomerForm/>

</div>

)

}