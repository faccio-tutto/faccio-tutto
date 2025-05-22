import { Readable } from 'stream';
import Busboy from 'busboy';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/emailService';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType) throw new Error('Missing Content-Type');

   const body = await req.arrayBuffer();
const readable = Readable.from(Buffer.from(body));
const busboy = Busboy({ headers: { 'content-type': contentType } });

const fields = {};
const files = {};

  return await new Promise((resolve, reject) => {
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    let buffer = Buffer.alloc(0);
    file.on('data', (data) => {
      buffer = Buffer.concat([buffer, data]);
    });
    file.on('end', () => {
      if (filename) {
        files[fieldname] = {
          filename: typeof filename === 'string' ? filename : 'file.pdf',
          mimetype: mimetype || 'application/octet-stream',
          buffer,
        };
      }
    });
  });

   busboy.on('field', (fieldname, value) => {
  console.log('Ricevuto campo:', fieldname, '=>', value);
  fields[fieldname] = value.normalize('NFC');
});

      busboy.on('finish', async () => {
        console.log('Tutti i campi ricevuti:', fields);
        console.log('Campi:', fields);
        console.log('File ricevuti:', Object.keys(files));

        // ✅ Salvataggio file opzionale
        const uploadDir = path.resolve('./uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

        for (const [key, file] of Object.entries(files)) {
          const safeFilename = typeof file.filename === 'string' ? file.filename : 'file';
          const savePath = path.join(uploadDir, safeFilename);
          fs.writeFileSync(savePath, file.buffer);
        }

                // ✅ Controllo campi obbligatori in base al tipo utente
const tipoUtente = fields.tipoUtente?.normalize('NFC').toLowerCase();
console.log('Tipo utente ricevuto:', tipoUtente);

if (tipoUtente === 'azienda') {
  if (
    !fields.email ||
    !fields.partitaIva ||
    !files.visuraCamerale ||
    !files.documentoIdentita
  ) {
    return resolve(
      NextResponse.json(
        {
          error:
            'Campi obbligatori mancanti (email, partita IVA, documento o visura)',
        },
        { status: 400 }
      )
    );
  }
} else if (tipoUtente === 'privato') {
  if (!fields.email || !fields.nome || !fields.cognome) {
    return resolve(
      NextResponse.json(
        {
          error:
            'Campi obbligatori mancanti per privato (nome, cognome, email)',
        },
        { status: 400 }
      )
    );
  }
} else {
  console.error('Valore tipoUtente non valido:', tipoUtente);
  return resolve(
    NextResponse.json(
      { error: 'Tipo utente non valido o mancante' },
      { status: 400 }
    )
  );
}

        // ✉️ Corpo email
let html = `<h2>Richiesta di affiliazione</h2>`;

if (tipoUtente === 'azienda') {
  html += `
    <p><strong>Azienda:</strong> ${fields.nomeAzienda}</p>
    <p><strong>Partita IVA:</strong> ${fields.partitaIva}</p>
    <p><strong>Legale Rappresentante:</strong> ${fields.legaleRappresentante}</p>
  `;
} else if (tipoUtente === 'privato') {
  html += `
    <p><strong>Nome:</strong> ${fields.nome}</p>
    <p><strong>Cognome:</strong> ${fields.cognome}</p>
  `;
}

html += `
  <p><strong>Email:</strong> ${fields.email}</p>
  <p><strong>Telefono:</strong> ${fields.telefono}</p>
  <p><strong>Sito Web:</strong> ${fields.sitoWeb}</p>
  <p><strong>Indirizzo:</strong> ${fields.via}, ${fields['citta']}</p>
  <p><strong>Messaggio:</strong> ${fields.messaggio}</p>
`;

if (fields['citta']) {
  fields['città'] = fields['cittÃ '];
  delete fields['cittÃ '];
}
        // 📎 Allegati
        const attachments = Object.entries(files).map(([_, file]) => ({
          filename: file.filename,
          content: file.buffer,
          contentType: file.mimetype,
        }));

        // 📤 Invio email
        try {
          const result = await sendEmail({ fields, attachments });
          console.log('Allegati email:', attachments);
          resolve(NextResponse.json({ success: true }));
        } catch (emailError) {
          console.error('Errore durante l’invio email:', emailError);
          resolve(NextResponse.json({ error: 'Errore durante l’invio email' }, { status: 500 }));
        }
      });

      busboy.on('error', (err) => reject(err));
      readable.pipe(busboy);
    });
    
  } catch (error) {
    console.error('Errore nella route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}