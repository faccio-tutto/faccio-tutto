"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaWrench, FaPhone, FaEnvelope, FaDraftingCompass, FaSolarPanel, FaPlug, FaDoorOpen } from "react-icons/fa";

export default function HomeRepairService() {
  return (
    <div className="min-h-screen bg-gray-100 p-6" style={{ backgroundImage: "url('/images/architect_working.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <header className="text-center text-3xl font-bold mb-6 bg-white bg-opacity-70 p-4 rounded-lg">
        faccio-tutto.it - servizi per la casa
      </header>
      <div className="grid md:grid-cols-3 gap-6 bg-white bg-opacity-80 p-6 rounded-lg">
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaWrench className="text-4xl mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold">Riparazioni Veloci</h2>
            <p>Interventi rapidi su piccole riparazioni domestiche.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaDraftingCompass className="text-4xl mb-4 text-purple-500" />
            <h2 className="text-xl font-semibold">Progettazione Architettonica</h2>
            <p>Servizi di progettazione per ristrutturazioni e nuove costruzioni.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaSolarPanel className="text-4xl mb-4 text-yellow-500" />
            <h2 className="text-xl font-semibold">Impianti Fotovoltaici</h2>
            <p>Progettazione, installazione e manutenzione di impianti fotovoltaici.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaPlug className="text-4xl mb-4 text-orange-500" />
            <h2 className="text-xl font-semibold">Riparazione Piccoli Elettrodomestici</h2>
            <p>Riparazione di piccoli elettrodomestici per la casa.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaDoorOpen className="text-4xl mb-4 text-brown-500" />
            <h2 className="text-xl font-semibold">Vendita e Installazione Infissi</h2>
            <p>Infissi in PVC e alluminio, con installazione professionale.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaPhone className="text-4xl mb-4 text-green-500" />
            <h2 className="text-xl font-semibold">Prenota Subito</h2>
            <p>Chiamaci per fissare un appuntamento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaEnvelope className="text-4xl mb-4 text-red-500" />
            <h2 className="text-xl font-semibold">Contattaci</h2>
            <p>Descrivi cosa ti serve per ricevere un preventivo.</p>
          </CardContent>
        </Card>
      </div>
      <div className="text-center mt-6">
        <a href="tel:3334491881">
          <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Prenota Subito
          </Button>
        </a>
      </div>
    </div>
  );
}