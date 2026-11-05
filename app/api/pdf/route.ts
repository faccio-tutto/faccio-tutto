import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import nodemailer from "nodemailer";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const technicalDatasheets: Record<string, string> = {
  "modulo:mod1": "DS-Vertex-S+NEG9R.28-IT (1).pdf",
  "modulo:mod2": "Peimar_IT_OR10E460MNDB(BF).pdf",
  "modulo:mod3": "DS-Peimar-OR10E510MNDB-FB-IT (1).pdf",
  "modulo:mod4": "DS-NEG18R.28-ULTRA-495-525W-EN.pdf",
  "modulo:mod5": "DS-TCL-HSM-ND66-GR-EN.pdf",
  "modulo:mod6": "DS-TWMNF-66HD720-740W-EN.pdf",
  "inverter:inv1": "DS-SUN2000-3-6K-LB0-EN.pdf",
  "inverter:inv2": "DS-SUN2000-3-6K-LB0-EN.pdf",
  "inverter:inv3": "Deye_sun-xxK-SG05LP1-EU-AM2_scheda_tecnica.pdf",
  "inverter:inv4": "X13009allegatoDEPLIANT1-1X_zoe1-scheda_ita_04-2026.pdf",
  "inverter:inv5": "SE_DS_Fronius_Symo_GEN24_GEN24Plus_3_to_10_kW_IT.pdf",
  "inverter:inv6": "sunny-boy-smart-energy.pdf",
  "inverter:inv7": "DS-S6-EH1P(3-10)K-L-PLUS-IT.pdf",
  "inverter:inv8": "DS-1PH-HYD-3000-6000-ZP1-IT.pdf",
  "inverter:inv9": "DS_ZCS-1PH-HYD-3000-6000-ZSS-HP_IT.pdf",
  "inverter:inv10": "4822988f44dea18319cfe344cdb9bdb0.pdf",
  "inverter:inv11": "DS-EP-Cube-All-in-One-IT.pdf",
  "inverter:inv12": "DS-Haier-SMART-CUBE-IT.pdf",
  "inverter:inv13": "uhome-3k0l-8k0l.pdf",
  "batteria:bat1": "LUNA2000-5-15-S0_T.pdf",
  "batteria:bat2": "SE_DS_FroniusReserva_IT.pdf",
  "batteria:bat3": "12278-12279-12280-12281-12282-12283-Technical-Specs.pdf",
  "batteria:bat4": "X13640allegatoDEPLIANT1-1X_batteria-ste-os_scheda-ita_09-2026.pdf",
  "batteria:bat5": "LUNA2000-5-15-S0_T.pdf",
  "batteria:bat6": "LUNA2000-5-15-S0_T.pdf",
  "batteria:bat7": "DynessPowerboxG2DatasheetIT20251016-536.pdf",
  "batteria:bat8": "HS-BM-10-DS-en-12.pdf",
  "batteria:bat9": "DS-AZZURRO-HV-ZBT-5K-HTR-IT.pdf",
  "batteria:bat10": "DS-AZZURRO-LV-ZSX5000-S-IT.pdf",
  "batteria:bat11": "4822988f44dea18319cfe344cdb9bdb0.pdf",
  "batteria:bat12": "DS-EP-Cube-All-in-One-IT.pdf",
  "batteria:bat13": "DS-Haier-SMART-CUBE-IT.pdf",
  "batteria:bat14": "uhome-3k0l-8k0l.pdf",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      cliente, 
      email, 
      inverter, 
      moduli, 
      numeroModuli, 
      batteria, 
      batteryQuantity, 
      struttura, 
      totale,
      applyVAT,
    } = body;

    const potenzaTotaleKw = moduli ? ((moduli.powerW * numeroModuli) / 1000).toFixed(2) : "0.00";
    const qtaBatterie = batteryQuantity ? parseInt(batteryQuantity) : 1; 

    const formatEuro = (v: number) => v.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

    // HTML pulito e corretto per evitare sovrapposizioni o testi tagliati nelle tabelle
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            * { box-sizing: border-box; }
            @page { size: A4; margin: 25mm 20mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; color: #171717; background-color: #ffffff; }
            .table-layout { width: 100%; border-collapse: collapse; }
            .table-cell { vertical-align: top; padding: 0; }
            .header-container { margin-bottom: 20mm; }
            .logo-text { font-size: 16pt; font-weight: 300; letter-spacing: 5px; text-transform: uppercase; color: #000000; margin: 0; }
            .sub-logo { font-size: 7.5pt; text-transform: uppercase; letter-spacing: 3px; color: #737373; margin: 0; }
            .meta-box { text-align: right; font-size: 9pt; color: #404040; line-height: 1.5; }
            .meta-title { font-weight: 600; color: #000000; text-transform: uppercase; letter-spacing: 1px; font-size: 8pt; }
            .section-header { font-size: 10pt; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #171717; border-bottom: 1px solid #e5e5e5; padding-bottom: 8px; margin-top: 12mm; margin-bottom: 6mm; page-break-after: avoid; }
            .data-table { width: 100%; border-collapse: collapse; margin-bottom: 8mm; }
            .data-table th { font-size: 8pt; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #737373; text-align: left; padding-bottom: 8px; border-bottom: 1px solid #171717; }
            .data-table td { font-size: 9.5pt; padding: 12px 0; border-bottom: 1px solid #f5f5f5; color: #404040; }
            .text-right { text-align: right; }
            .font-mono { font-family: monospace; font-weight: 600; }
            .total-card { background-color: #0a0a0a; color: #ffffff; padding: 24px 30px; margin-top: 10mm; page-break-inside: avoid; }
            .total-label { font-size: 8pt; text-transform: uppercase; letter-spacing: 3px; color: #a3a3a3; margin-bottom: 4px; }
            .total-amount { font-size: 34pt; font-weight: 200; letter-spacing: -1px; color: #ffffff; margin: 0; }
            .total-subtext { font-size: 8pt; color: #737373; margin-top: 8px; }
            .footer-disclaimer { font-size: 7.5pt; color: #737373; line-height: 1.6; margin-top: 15mm; page-break-inside: avoid; }
            .footer-disclaimer p { margin: 0 0 2mm; }
        </style>
    </head>
    <body>
        <table class="table-layout header-container">
            <tr>
                <td class="table-cell" style="width: 50%;">
                    <h1 class="logo-text">FACCIO-TUTTO.IT</h1>
                    <p class="sub-logo">Ecosistema residenziale solare</p>
                </td>
                <td class="table-cell text-right" style="width: 50%;">
                    <div class="meta-box">
                        <span class="meta-title">Preventivo</span><br>
                        ID Pratica: <span class="font-mono">PRV-${Math.floor(100000 + Math.random() * 900000)}</span><br>
                        Data Valutazione: ${new Date().toLocaleDateString('it-IT')}<br>
                        Validità: 15 Giorni
                    </div>
                </td>
            </tr>
        </table>

        <div class="section-header">01 / Intestatario Pratica</div>
        <table class="table-layout" style="margin-bottom: 5mm;">
            <tr>
                <td class="table-cell" style="width: 50%; line-height: 1.6; font-size: 10pt;">
                    <span style="color: #737373; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; display: block;">Cliente Contraente</span>
                    <strong>${cliente}</strong><br>
                    <span style="color: #404040;">${email}</span>
                </td>
                <td class="table-cell text-right" style="width: 50%; line-height: 1.6; font-size: 10pt;">
                    <span style="color: #737373; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; display: block;">Potenza Nominale Impianto</span>
                    Potenza moduli: <strong>${potenzaTotaleKw} kWp</strong><br>
                    Architettura elettrica: <strong>100% Compatibile</strong>
                </td>
            </tr>
        </table>

        <div class="section-header">02 / Specifiche Componenti Selezionati</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 35%;">Componenti Impianto</th>
                    <th style="width: 50%;">Descrizione Modello</th>
                    <th class="text-right" style="width: 15%;">Quantità</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Moduli fotovoltaici</strong></td>
                    <td>${moduli?.brand} ${moduli?.modello || ""} (${moduli?.powerW} W)</td>
                    <td class="text-right font-mono">${numeroModuli}</td>
                </tr>
                <tr>
                    <td><strong>Inverter</strong></td>
                    <td>${inverter?.brand} ${inverter?.modello || ""} (${inverter?.powerKw} kW)</td>
                    <td class="text-right font-mono">1</td>
                </tr>
                ${batteria ? `
                <tr>
                    <td><strong>Batteria di accumulo</strong></td>
                    <td>${batteria.brand} ${batteria.modello || ""} (${batteria.capacityKwh} kWh)</td>
                    <td class="text-right font-mono">${qtaBatterie}</td>
                </tr>` : ""}
                <tr>
                    <td><strong>Tipologia installazione</strong></td>
                    <td>Ancoraggio strutturale specifico per ${struttura?.type}</td>
                    <td class="text-right font-mono">1 Kit</td>
                </tr>
            </tbody>
        </table>

        <div class="section-header">03 / Voci incluse nel preventivo</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Voce di Capitolato</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Fornitura moduli fotovoltaici (${numeroModuli} unità)</td>
                </tr>
                <tr>
                    <td>Fornitura inverter</td>
                </tr>
                ${batteria ? `
                <tr>
                    <td>Fornitura batterie di accumulo (${qtaBatterie} unità)</td>
                </tr>` : ""}
                <tr>
                    <td>Tipologia di fissaggio moduli fotovoltaici</td>
                </tr>
                <tr>
                    <td>Installazione hardware e cablaggio elettrico a regola d'arte</td>
                </tr>
                <tr>
                    <td>Oneri burocratici di connessione e pratiche e-distribuzione / GSE</td>
                </tr>
                <tr>
                    <td>IVA agevolata applicata secondo l'aliquota selezionata</td>
                </tr>
            </tbody>
        </table>

        <div class="total-card">
            <div class="total-label">Valore Totale Chiavi in Mano</div>
            <h2 class="total-amount">${formatEuro(totale)}</h2>
            <div class="total-subtext">${applyVAT ? "Importo finale comprensivo di materiali, manodopera e IVA." : "Importo totale al netto dell'IVA."}</div>
        </div>

        <div class="footer-disclaimer">
            <p>Il dimensionamento finale e l'effettiva producibilità dell'impianto sono soggetti al sopralluogo tecnico e strutturale prima dell'avvio dei lavori.</p>
            <p>Dal presente preventivo sono esclusi:</p>
            <p>1) eventuali costi aggiuntivi per opere murarie, elettriche o strutturali non preventivate.</p>
            <p>2) il corrispettivo di connessione e-distribuzione pari a € 100,00 + IVA (se non sono previsti lavori alla rete elettrica) da corrispondere direttamente al distributore di energia elettrica.</p>
            <p>3) l'eventuale costo del mezzo per il sollevamento dei pannelli fotovoltaici sulla copertura.</p>
            <p>Il presente preventivo ha validità di 15 giorni dalla data di emissione.</p>
        </div>
    </body>
    </html>
    `;

    const isProd = process.env.NODE_ENV === "production";

    const browser = await puppeteer.launch({
      args: isProd ? chromium.args : ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: isProd 
        ? await chromium.executablePath() 
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true, 
    });

    const page = await browser.newPage();
    await page.setContent(htmlTemplate, { waitUntil: "domcontentloaded" });
    
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    let finalPdfBuffer = Buffer.from(pdfBuffer);
    
    await browser.close();

    const selectedComponents = [
      { type: "modulo", item: moduli, label: `Moduli fotovoltaici: ${moduli?.brand ?? ""} ${moduli?.modello ?? ""}` },
      { type: "inverter", item: inverter, label: `Inverter: ${inverter?.brand ?? ""} ${inverter?.modello ?? ""}` },
      { type: "batteria", item: batteria, label: `Batteria: ${batteria?.brand ?? ""} ${batteria?.modello ?? ""}` },
    ].filter(component => component.item);

    const documents = new Map<string, string[]>();
    const unavailableDatasheets: string[] = [];

    for (const component of selectedComponents) {
      const fileName = technicalDatasheets[`${component.type}:${component.item.id}`];
      if (!fileName) {
        unavailableDatasheets.push(component.label);
        continue;
      }

      const associatedComponents = documents.get(fileName) ?? [];
      associatedComponents.push(component.label);
      documents.set(fileName, associatedComponents);
    }

    if (documents.size > 0 || unavailableDatasheets.length > 0) {
      const quotePdf = await PDFDocument.load(pdfBuffer);
      const regularFont = await quotePdf.embedFont(StandardFonts.Helvetica);
      const boldFont = await quotePdf.embedFont(StandardFonts.HelveticaBold);
      const appendixPage = quotePdf.addPage();
      const { width, height } = appendixPage.getSize();

      appendixPage.drawText("Documentazione tecnica", {
        x: 54,
        y: height - 72,
        size: 22,
        font: boldFont,
        color: rgb(0.08, 0.08, 0.08),
      });
      appendixPage.drawText("Schede tecniche dei componenti selezionati", {
        x: 54,
        y: height - 100,
        size: 11,
        font: regularFont,
        color: rgb(0.35, 0.35, 0.35),
      });

      let y = height - 145;
      for (const [fileName, components] of documents) {
        appendixPage.drawText(components.join(" / "), {
          x: 54,
          y,
          size: 10,
          font: boldFont,
          color: rgb(0.08, 0.08, 0.08),
          maxWidth: width - 108,
        });
        y -= 18;
        appendixPage.drawText("Scheda tecnica allegata nelle pagine successive", {
          x: 54,
          y,
          size: 9,
          font: regularFont,
          color: rgb(0.35, 0.35, 0.35),
        });
        y -= 26;
      }

      if (unavailableDatasheets.length > 0) {
        appendixPage.drawText("Schede tecniche non disponibili", {
          x: 54,
          y,
          size: 10,
          font: boldFont,
          color: rgb(0.08, 0.08, 0.08),
        });
        y -= 18;
        for (const component of unavailableDatasheets) {
          appendixPage.drawText(component, {
            x: 54,
            y,
            size: 9,
            font: regularFont,
            color: rgb(0.35, 0.35, 0.35),
            maxWidth: width - 108,
          });
          y -= 14;
        }
      }

      for (const [fileName, components] of documents) {
        const separatorPage = quotePdf.addPage();
        const { width: pageWidth, height: pageHeight } = separatorPage.getSize();
        separatorPage.drawText("Scheda tecnica", {
          x: 54,
          y: pageHeight - 80,
          size: 20,
          font: boldFont,
          color: rgb(0.08, 0.08, 0.08),
        });
        separatorPage.drawText(components.join(" / "), {
          x: 54,
          y: pageHeight - 110,
          size: 11,
          font: regularFont,
          color: rgb(0.35, 0.35, 0.35),
          maxWidth: pageWidth - 108,
        });

        const datasheetPath = path.join(process.cwd(), "public", "schede-tecniche", fileName);
        const datasheet = await PDFDocument.load(await readFile(datasheetPath));
        const datasheetPages = await quotePdf.copyPages(datasheet, datasheet.getPageIndices());
        datasheetPages.forEach(datasheetPage => quotePdf.addPage(datasheetPage));
      }

      const quoteWithDatasheets = await quotePdf.save();
      finalPdfBuffer = Buffer.from(quoteWithDatasheets);
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const nomeFileSenzaSpazi = cliente.replace(/\s+/g, "_").toLowerCase();

      await transporter.sendMail({
        from: `"Faccio Tutto - Fotovoltaico" <${process.env.SMTP_USER}>`,
        to: "fotovoltaico@faccio-tutto.it",
        replyTo: email,
        subject: `⚡ Nuovo Preventivo Generato: ${cliente} - ${potenzaTotaleKw} kWp`,
        html: `
          <div style="font-family: sans-serif; color: #171717; max-width: 600px; line-height: 1.6;">
            <h2>Nuova richiesta preventivo dal sito</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Cliente:</td><td>${cliente}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Potenza:</td><td>${potenzaTotaleKw} kWp</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Accumulo:</td><td>${batteria ? `${qtaBatterie}x ${batteria.brand}` : 'No'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Prezzo Finale:</td><td>${formatEuro(totale)}</td></tr>
            </table>
          </div>
        `,
        attachments: [
          {
            filename: `preventivo_${nomeFileSenzaSpazi}.pdf`,
            content: finalPdfBuffer,
            contentType: "application/pdf"
          }
        ]
      });
    } catch (emailError) {
      console.error("Errore notifica email:", emailError);
    }

    const pdfBlob = new Blob([finalPdfBuffer], { type: "application/pdf" });
    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="preventivo.pdf"',
        "Content-Length": finalPdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error("Errore:", error);
    return new NextResponse(JSON.stringify({ error: "Generazione fallita" }), { status: 500 });
  }
}