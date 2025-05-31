import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      tipoUtente,
      nome,
      cognome,
      nomeAzienda,
      partitaIva,
      legaleRappresentante,
      email,
      telefono,
      sitoWeb,
      via,
      citta,
      messaggio,
      destinatarioEmail,
      visuraCamerale,
      documentoIdentita,
    } = data;

    const testoEmail = `Hai ricevuto una nuova richiesta da ${tipoUtente === 'privato' ? 'Privato' : 'Azienda'}:

Azienda: ${nomeAzienda || '—'}
Partita IVA: ${partitaIva || '—'}
Legale Rappresentante: ${legaleRappresentante || '—'}
Sito Web: ${sitoWeb || '—'}

Nome: ${nome || '—'}
Cognome: ${cognome || '—'}
Email: ${email || '—'}
Telefono: ${telefono || '—'}
Via: ${via || '—'}
Città: ${citta || '—'}
Messaggio: ${messaggio || '—'}
`;

    const allegati = [];

    if (visuraCamerale) {
      allegati.push({
        filename: 'visura_camerale.pdf',
        content: Buffer.from(visuraCamerale.split(',')[1], 'base64'),
        contentType: visuraCamerale.split(';')[0].split(':')[1],
      });
    }

    if (documentoIdentita) {
      allegati.push({
        filename: 'documento_identita.pdf',
        content: Buffer.from(documentoIdentita.split(',')[1], 'base64'),
        contentType: documentoIdentita.split(';')[0].split(':')[1],
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'smtps.aruba.it',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Modulo Affiliazione" <${process.env.SMTP_USER}>`,
      to: destinatarioEmail || process.env.MAIL_DESTINATARIO_AFFILIAZIONE,
      subject: 'Nuova richiesta di affiliazione',
      text: testoEmail,
      attachments: allegati,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Errore durante l\'invio.' }, { status: 500 });
  }
}