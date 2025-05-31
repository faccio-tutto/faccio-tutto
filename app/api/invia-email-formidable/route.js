import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

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
   const tipoUtente = fields.tipoUtente?.[0];
console.log("TIPO UTENTE:", tipoUtente);
console.log('FIELDS:', fields);
console.log('FILES:', files);

// Costruisci testo email con tutti i campi
 const testoEmail = `Hai ricevuto una nuova richiesta di affiliazione da un ${tipoUtente === 'privato' ? 'Privato' : 'Azienda'}:

Azienda: ${fields.nomeAzienda?.[0] || '—'}
Partita IVA: ${fields.partitaIva?.[0] || '—'}
Legale Rappresentante: ${fields.legaleRappresentante?.[0] || '—'}
Sito Web: ${fields.sitoWeb?.[0] || '—'}

Nome: ${fields.nome?.[0] || '—'}
Cognome: ${fields.cognome?.[0] || '—'}  
Indirizzo email: ${fields.email?.[0] || '—'}
Telefono: ${fields.telefono?.[0] || '—'}
Via: ${fields.via?.[0] || '—'}
Città: ${fields.citta?.[0] || '—'}
Messaggio: ${fields.messaggio?.[0] || '—'}
`;

    // Costruzione degli allegati da file caricati
    const allegati = [];
    let fileArray = []; 
   if (tipoUtente === 'privato' && files.documentoIdentita) {
  fileArray = Array.isArray(files.documentoIdentita)
    ? files.documentoIdentita
    : [files.documentoIdentita];
}

if (tipoUtente === 'azienda') {
  if (files.documentoIdentita) {
    fileArray.push(...(Array.isArray(files.documentoIdentita) ? files.documentoIdentita : [files.documentoIdentita]));
  }
  if (files.visuraCamerale) {
    fileArray.push(...(Array.isArray(files.visuraCamerale) ? files.visuraCamerale : [files.visuraCamerale]));
  }
}

for (const file of fileArray) {
  const buffer = await fs.promises.readFile(file.filepath);
  console.log("📎 Allegato:", file.originalFilename, "size:", buffer.length);
  allegati.push({
    filename: file.originalFilename,
    content: buffer,
  });
}

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