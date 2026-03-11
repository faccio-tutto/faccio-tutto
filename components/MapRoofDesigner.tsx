"use client"

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import { useState } from "react"

const center = {
  lat: 37.5079,
  lng: 13.0832
}

export default function MapRoofDesigner(){

const { isLoaded, loadError } = useLoadScript({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
})

const [panels,setPanels]=useState<{lat:number,lng:number}[]>([])

function addPanel(e:google.maps.MapMouseEvent){

if(!e.latLng) return

const lat=e.latLng.lat()
const lng=e.latLng.lng()

setPanels(prev=>[...prev,{lat,lng}])

}

if(loadError) return <div>Errore caricamento Google Maps</div>

if(!isLoaded) return <div>Loading map...</div>

return(

<div>

<h2 className="text-xl font-bold mb-4">
Disegna il tuo impianto sul tetto
</h2>

<GoogleMap
zoom={20}
center={center}
mapContainerStyle={{width:"100%",height:"500px"}}
onClick={addPanel}
mapTypeId="satellite"
>

{panels.map((p,i)=>(

<Marker
key={i}
position={{lat:p.lat,lng:p.lng}}
/>

))}

</GoogleMap>

<p className="mt-4">

Moduli posizionati: {panels.length}

</p>

</div>

)

}