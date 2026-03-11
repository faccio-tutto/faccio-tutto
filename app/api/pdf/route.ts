import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Rimosso PNG
import path from 'path'; 
import fs from 'fs/promises'; 
import nodemailer from "nodemailer";


export async function POST(req: NextRequest) {
  
  const formatEuro = (value: number | string | undefined): string => {
    const num = Number(value) || 0;
    return num.toLocaleString('it-IT', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2
    }).replace('€', '€ '); 
  };

  try { 
    const body = await req.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    const { width, height } = page.getSize(); 

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold); 

    let cursorY = height - 50; 

    // --- AGGIUNTA LOGO AZIENDALE ---
    const logoPath = path.join(process.cwd(), 'public', 'logo.png'); 
    const logoImageBytes = await fs.readFile(logoPath); 
    const logoImage = await pdfDoc.embedPng(logoImageBytes); // Usa embedPng

    const logoDims = logoImage.scale(0.07); 
    const logoX = 50; 
    const logoY = height - 50 - logoDims.height; 

    page.drawImage(logoImage, {
      x: logoX,
      y: logoY,
      width: logoDims.width,
      height: logoDims.height,
    });
    
    cursorY = logoY - 30; 
    // -------------------------------
    
    // --- Titolo ---
    page.drawText("Preventivo Impianto Fotovoltaico", {
      x: 50,
      y: cursorY,
      size: 18,
      font: boldFont, 
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 40;

    // --- Dati cliente ---
    page.drawText(`Cliente: ${body.cliente || "N/A"}`, { x: 50, y: cursorY, size: 12, font });
    cursorY -= 20;
    page.drawText(`Email: ${body.email || "N/A"}`, { x: 50, y: cursorY, size: 12, font });
    cursorY -= 20;
    page.drawText(`Data: ${new Date().toLocaleDateString("it-IT")}`, { x: 50, y: cursorY, size: 12, font });
    cursorY -= 40;

    // --- Dettagli componenti ---
    if (body.inverter) {
      page.drawText(`Inverter - ${body.inverter.brand}, ${body.inverter.powerKw} kW : ${formatEuro(body.inverter.price)}`, { x: 50, y: cursorY, size: 12, font });
      cursorY -= 20;
    }

    if (body.moduli) {
      const costoTotaleModuli = body.moduli.price * (body.numeroModuli || 0); 
     page.drawText(
`Moduli - ${body.moduli.brand} ${body.moduli.modello || ""}, ${body.moduli.powerW} W x ${body.numeroModuli} pz : ${formatEuro(costoTotaleModuli)}`,
{ x: 50, y: cursorY, size: 12, font }
);
      cursorY -= 20;
    }

    if (body.batteria) {
      page.drawText(`Batteria - ${body.batteria.brand}, ${body.batteria.capacityKwh} kWh : ${formatEuro(body.batteria.price)}`, { x: 50, y: cursorY, size: 12, font });
      cursorY -= 20;
    }

    if (body.struttura) {
      page.drawText(`Struttura - ${body.struttura.type} : ${formatEuro(body.struttura.price)}`, { x: 50, y: cursorY, size: 12, font });
      cursorY -= 20;
    }

    if (body.cablaggio !== undefined && body.cablaggio !== null) {
      page.drawText(`Manodopera e cablaggio: ${formatEuro(body.cablaggio)}`, { x: 50, y: cursorY, size: 12, font });
      cursorY -= 40;
    }

    // --- Totale ---
    page.drawText(`Totale: ${formatEuro(body.totale)}`, { 
      x: 400,
      y: cursorY,
      size: 14,
      font,
      color: rgb(0.2, 0.4, 0.8),
    });

    // --- AGGIUNTA MAIL AZIENDALE IN FOOTER ---
    const companyEmail = "fotovoltaico@faccio-tutto.it";
    const footerY = 30; 
    
    // CORREZIONE: Usiamo widthOfTextAtSize per calcolare la larghezza del testo
    const footerX = width - 50 - font.widthOfTextAtSize(companyEmail, 10); 
    
    page.drawText(companyEmail, {
      x: footerX, 
      y: footerY,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5), 
    });
    // ------------------------------------------

    const pdfBytes = await pdfDoc.save();
    // --- INVIO EMAIL AUTOMATICO CON PREVENTIVO ---

try {

const transporter = nodemailer.createTransport({

host: "smtps.aruba.it",
port: 465,
secure: true,

auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS
}

});

await transporter.sendMail({

from: `"Configuratore FV" <${process.env.SMTP_USER}>`,

to: "fotovoltaico@faccio-tutto.it",

subject: "Nuovo preventivo generato dal sito",

html: `
<h2>Nuovo preventivo generato</h2>

<b>Cliente:</b> ${body.cliente}<br>
<b>Email:</b> ${body.email}<br>
<b>Data:</b> ${new Date().toLocaleDateString("it-IT")}<br>

<hr>

<b>Inverter:</b> ${body.inverter?.brand || ""} ${body.inverter?.modello || ""}<br>
<b>Moduli:</b> ${body.moduli?.brand || ""} ${body.moduli?.powerW || ""} W<br>
<b>Numero moduli:</b> ${body.numeroModuli || 0}<br>
<b>Batteria:</b> ${body.batteria ? body.batteria.brand + " " + (body.batteria.modello || "") : "Nessuna"}<br>
<b>Struttura:</b> ${body.struttura?.type || ""}<br>

<hr>

<b>Totale impianto:</b> ${formatEuro(body.totale)}
`,

attachments: [
{
filename: "preventivo-fotovoltaico.pdf",
content: Buffer.from(pdfBytes)
}
]

});

console.log("📧 Email preventivo inviata correttamente");

} catch (mailError) {

console.error("❌ Errore invio email:", mailError);

}

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=preventivo.pdf",
      },
    });
  } catch (err: any) {
    console.error("❌ ERRORE FATALE API - ORIGINE:", err);
    if (err.stack) {
        console.error("Stack Trace:", err.stack);
    }
    
    return NextResponse.json({ 
        error: "Internal Server Error during PDF processing. Check server terminal for stack trace.",
        originalMessage: err.message
    }, { status: 500 });
  }
}