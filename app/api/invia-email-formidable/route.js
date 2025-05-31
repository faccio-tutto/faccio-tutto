import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

// Disabilita il body parser built-in di Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // Leggi il buffer dal body della richiesta
    const formDataBuffer = await req.arrayBuffer();

    // Configura formidable
    const form = formidable({
      multiples: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    // Crea uno stream a partire dal buffer
    const stream = Readable.from(Buffer.from(formDataBuffer));

    // Parsing dei dati form-data (campi e file)
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(
        Object.assign(stream, {
          headers: Object.fromEntries(req.headers),
          method: 'POST',
          url: req.url,
        }),
        (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        }
      );
    });

    console.log('FIELDS:', fields);
    console.log('FILES:', files);

    // Costruzione degli allegati da file caricati
    const allegati = [];

    if (files.documentoIdentita) {
      const fileArray = Array.isArray(files.documentoIdentita)
        ? files.documentoIdentita
        : [files.documentoIdentita];

      for (const file of fileArray) {
        allegati.push({
          filename: file.originalFilename,
          content: await fs.promises.readFile(file.filepath),
        });
      }
    }

    // Costruisci testo email con tutti i campi
    const testoEmail = `
Nuova richiesta da 
Nome: ${fields.nome}
Cognome: ${fields.cognome}  
Indirizzo email: ${fields.email}
Telefono: ${fields.telefono}
Via: ${fields.via}
Città: ${fields.citta}
Messaggio: ${fields.messaggio}
`;

    // Configura transporter SMTP usando variabili ambiente
   const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // es. 'smtps.aruba.it'
  port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,                  // false per STARTTLS su 587, true su 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 30000,          // 30 secondi timeout
  greetingTimeout: 30000,
});

    // Invio email
    await transporter.sendMail({
      from: `"Modulo Affiliazione" <${process.env.SMTP_USER}>`,
      to: fields.destinatarioEmail?.[0] || process.env.MAIL_DESTINATARIO_AFFILIAZIONE || 'affiliazione@faccio-tutto.it',
      replyTo: fields.email,
      subject: 'Richiesta Affiliazione Privato',
      text: testoEmail,
      attachments: allegati,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Errore invio email:', err);
    return NextResponse.json({ error: 'Errore nell\'invio del modulo.' }, { status: 500 });
  }
}