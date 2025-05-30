import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Convertitore Web stream → Node.js stream
async function requestToNodeStream(request) {
  const reader = request.body.getReader();

  const stream = new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });

  // Qui aggiungo le proprietà che formidable si aspetta
  stream.headers = {};
  for (const [key, value] of request.headers.entries()) {
    stream.headers[key.toLowerCase()] = value;
  }
  stream.method = request.method;

  return stream;
}

export async function POST(req) {
  try {
    const nodeReq = await requestToNodeStream(req);

    const uploadDir = path.join(process.cwd(), '/uploads');
    fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      multiples: false,
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const {
      nome, cognome, email, telefono, via, citta, messaggio, destinatarioEmail
    } = fields;

    const attachments = [];
// Documento Identità
const fileDocumento = Array.isArray(files.documentoIdentita) ? files.documentoIdentita[0] : files.documentoIdentita;
if (fileDocumento && fileDocumento.filepath) {
  attachments.push({
    filename: fileDocumento.originalFilename || 'documento_identita.pdf',
    path: fileDocumento.filepath,
    contentType: fileDocumento.mimetype || 'application/pdf',
  });
} else {
  console.warn('Documento identità mancante o non valido:', fileDocumento);
}

// Visura Camerale
const fileVisura = Array.isArray(files.visuraCamerale) ? files.visuraCamerale[0] : files.visuraCamerale;
if (fileVisura && fileVisura.filepath) {
  attachments.push({
    filename: fileVisura.originalFilename || 'visura_camerale.pdf',
    path: fileVisura.filepath,
    contentType: fileVisura.mimetype || 'application/pdf',
  });
} else {
  console.warn('Visura camerale mancante o non valida:', fileVisura);
}

    const transporter = nodemailer.createTransport({
      host: 'smtps.aruba.it',
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
  from: process.env.SMTP_USER, // indirizzo mittente autorizzato dal server SMTP (es. la tua mail Aruba)
  replyTo: `"${nome} ${cognome}" <${email}>`, // risposte indirizzate all’utente del form
  to: destinatarioEmail || process.env.MAIL_DESTINATARIO_AFFILIAZIONE,
  subject: 'Nuova richiesta dal modulo contatti',
  text: `
Hai ricevuto una nuova richiesta:

Nome: ${nome}
Cognome: ${cognome}
Email: ${email}
Telefono: ${telefono}
Indirizzo: ${via}, ${citta}
Messaggio: ${messaggio}
  `,
  attachments,
});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Errore invio email:', error);
    return NextResponse.json({ error: 'Errore durante l\'invio della email' }, { status: 500 });
  }
}