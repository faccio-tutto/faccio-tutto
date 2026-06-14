import { NextResponse } from "next/server"; // <-- FISSAATO: Importazione mancante
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cliente, email, inverter, moduli, numeroModuli, batteria, struttura, cablaggio, totale } = body;

    const potenzaTotaleKw = moduli ? ((moduli.powerW * numeroModuli) / 1000).toFixed(2) : "0.00";
    const prezzoModuli = moduli ? moduli.price * numeroModuli : 0;
    const prezzoInverter = inverter ? inverter.price : 0;
    const prezzoBatteria = batteria ? batteria.price : 0;
    const prezzoStruttura = struttura ? struttura.price : 0;
    const oneriBurocratici = 250; 
    
    const baseImponibile = prezzoModuli + prezzoInverter + prezzoBatteria + prezzoStruttura + cablaggio + oneriBurocratici;
    const quotaIva = baseImponibile * 0.10;

    const formatEuro = (v: number) => v.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            * { box-sizing: border-box; }
            @page {
                size: A4;
                margin: 25mm 20mm;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                margin: 0; padding: 0; color: #171717; background-color: #ffffff;
            }
            .table-layout { width: 100%; border-collapse: collapse; }
            .table-cell { vertical-align: top; padding: 0; }
            .header-container { margin-bottom: 20mm; }
            .logo-text { font-size: 16pt; font-weight: 300; letter-spacing: 5px; text-transform: uppercase; color: #000000; margin: 0; }
            .sub-logo { font-size: 7.5pt; text-transform: uppercase; letter-spacing: 3px; color: #737373; margin: 0; }
            .meta-box { text-align: right; font-size: 9pt; color: #404040; line-height: 1.5; }
            .meta-title { font-weight: 600; color: #000000; text-transform: uppercase; letter-spacing: 1px; font-size: 8pt; }
            .section-header {
                font-size: 10pt; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;
                color: #171717; border-bottom: 1px solid #e5e5e5; padding-bottom: 8px;
                margin-top: 12mm; margin-bottom: 6mm; page-break-after: avoid;
            }
            .data-table { width: 100%; border-collapse: collapse; margin-bottom: 8mm; }
            .data-table th {
                font-size: 8pt; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
                color: #737373; text-align: left; padding-bottom: 8px; border-bottom: 1px solid #171717;
            }
            .data-table td { font-size: 9.5pt; padding: 12px 0; border-bottom: 1px solid #f5f5f5; color: #404040; }
            .text-right { text-align: right; }
            .font-mono { font-family: monospace; font-weight: 600; }
            .total-card { background-color: #0a0a0a; color: #ffffff; padding: 24px 30px; margin-top: 10mm; page-break-inside: avoid; }
            .total-label { font-size: 8pt; text-transform: uppercase; letter-spacing: 3px; color: #a3a3a3; margin-bottom: 4px; }
            .total-amount { font-size: 34pt; font-weight: 200; letter-spacing: -1px; color: #ffffff; margin: 0; }
            .total-subtext { font-size: 8pt; color: #737373; margin-top: 8px; }
            .footer-disclaimer { font-size: 7.5pt; color: #737373; line-height: 1.6; margin-top: 15mm; page-break-inside: avoid; }
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
                    <th style="width: 30%;">Componenti Impianto</th>
                    <th style="width: 55%;">Descrizione Modello</th>
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
                    <td class="text-right font-mono">Incluso</td>
                </tr>` : ""}
                <tr>
                    <td><strong>Tipologia installazione</strong></td>
                    <td>Ancoraggio strutturale specifico per ${struttura?.type}</td>
                    <td class="text-right font-mono">1 Kit</td>
                </tr>
            </tbody>
        </table>

        <div class="section-header">03 / Scomposizione Finanziaria</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 75%;">Voce di Capitolato</th>
                    <th class="text-right" style="width: 25%;">Prezzo Netto</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Fornitura moduli fotovoltaici(${numeroModuli} unità)</td>
                    <td class="text-right font-mono">${formatEuro(prezzoModuli)}</td>
                </tr>
                <tr>
                    <td>Fornitura inverter</td>
                    <td class="text-right font-mono">${formatEuro(prezzoInverter)}</td>
                </tr>
                ${batteria ? `
                <tr>
                    <td>Fornitura batterie di accumulo</td>
                    <td class="text-right font-mono">${formatEuro(prezzoBatteria)}</td>
                </tr>` : ""}
                <tr>
                    <td>Tipologia di fissaggio moduli fotovoltaici</td>
                    <td class="text-right font-mono">${formatEuro(prezzoStruttura)}</td>
                </tr>
                <tr>
                    <td>Installazione hardware e cablaggio elettrico a regola d'arte</td>
                    <td class="text-right font-mono">${formatEuro(cablaggio)}</td>
                </tr>
                <tr>
                    <td>Oneri burocratici di connessione e pratiche e-distribuzione / GSE</td>
                    <td class="text-right font-mono">${formatEuro(oneriBurocratici)}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: #000000; border-top: 1px solid #171717; padding-top: 12px;">Base imponibile netta</td>
                    <td class="text-right font-mono" style="font-weight: 600; border-top: 1px solid #171717; padding-top: 12px;">${formatEuro(baseImponibile)}</td>
                </tr>
                <tr>
                    <td style="color: #737373; border: none; padding-top: 6px;">Imposta valore aggiunto applicata (IVA 10%)</td>
                    <td class="text-right font-mono" style="color: #737373; border: none; padding-top: 6px;">${formatEuro(quotaIva)}</td>
                </tr>
            </tbody>
        </table>

        <div class="total-card">
            <div class="total-label">Valore Totale Chiavi in Mano</div>
            <h2 class="total-amount">${formatEuro(totale)}</h2>
            <div class="total-subtext">* Importo finale omnicomprensivo di materiali, manodopera e oneri burocratici, IVA inclusa.</div>
        </div>

        <div class="footer-disclaimer">
            <strong>Condizioni di fornitura tecnica e vincoli normativi:</strong><br>
            Il presente documento viene generato sulla base delle tariffe correnti di mercato e dei vincoli massimali dettati dai decreti PNRR (pari a un tetto di € 1.500,00 per singolo kWp installato). Il dimensionamento finale e l'effettiva producibilità dell'architettura hardware rimangono vincolati all'esito del sopralluogo tecnico e strutturale obbligatorio da eseguirsi in loco prima dell'avvio dei lavori.
        </div>
    </body>
    </html>
    `;

    const isProd = process.env.NODE_ENV === "production";

    // FISSAATO: Rimossi defaultViewport e headless legati a chromium.
    // Usiamo le impostazioni standard che non fanno arrabbiare TypeScript.
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
    
    await browser.close();

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: process.env.SMTP_PORT === "465", // true per porta 465, false per altre porte (es. 587)
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const nomeFileSenzaSpazi = cliente.replace(/\s+/g, "_").toLowerCase();

      await transporter.sendMail({
        from: `"Faccio Tutto - Fotovoltaico" <${process.env.SMTP_USER}>`,
        to: "fotovoltaico@faccio-tutto.it", // Destinatario fisso richiesto
        replyTo: email, // Comodo: se fai "Rispondi", risponderai direttamente al cliente
        subject: `⚡ Nuovo Preventivo Generato: ${cliente} - ${potenzaTotaleKw} kWp`,
        html: `
          <div style="font-family: sans-serif; color: #171717; max-width: 600px; line-height: 1.6;">
            <h2>Nuova richiesta preventivo dal sito</h2>
            <p>Un utente ha appena configurato un impianto fotovoltaico. Ecco i dettagli principali:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Cliente:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${cliente}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Email cliente:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Potenza Impianto:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${potenzaTotaleKw} kWp (${numeroModuli} moduli)</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Accumulo:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${batteria ? `${batteria.brand} ${batteria.capacityKwh}kWh` : 'No'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #000;">Prezzo Finale:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #000;">${formatEuro(totale)}</td>
              </tr>
            </table>
            <p>Il riepilogo dettagliato in stile Tesla è stato generato ed è <strong>allegato a questa email</strong> in formato PDF.</p>
            <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 30px 0;" />
            <small style="color: #737373;">Sistema di notifica automatica Faccio-Tutto</small>
          </div>
        `,
        attachments: [
          {
            filename: `preventivo_${nomeFileSenzaSpazi}.pdf`,
            content: Buffer.from(pdfBuffer), // Iniettiamo direttamente i byte del PDF
            contentType: "application/pdf"
          }
        ]
      });
      console.log(`Email inviata con successo a fotovoltaico@faccio-tutto.it per il cliente ${cliente}`);
    } catch (emailError) {
      // Logghiamo l'errore ma non blocchiamo l'API, l'utente riceverà comunque il suo PDF sul browser
      console.error("Errore durante l'invio della notifica email:", emailError);
    }
    // ==========================================

    const pdfBlob = new Blob([pdfBuffer as unknown as BlobPart], { type: "application/pdf" });

    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="preventivo_tesla.pdf"',
        "Content-Length": pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error("Errore crash browser online:", error);
    return new NextResponse(JSON.stringify({ error: "Generazione fallita" }), { status: 500 });
  }
}