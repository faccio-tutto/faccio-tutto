import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_DESTINATARIO_AFFILIAZIONE,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ fields, attachments }) {
  try {
    const to = fields.destinatarioEmail || 'affiliazione@faccio-tutto.it';

    console.log('📨 Invio email a:', to);
    console.log('📄 Campi ricevuti:', fields);
    console.log('📎 Allegati ricevuti:', attachments);

    const html = `
      <h2>Richiesta di affiliazione</h2>
      <p><strong>Nome:</strong> ${fields.nome}</p>
      <p><strong>Cognome:</strong> ${fields.cognome}</p>
      <p><strong>Nome azienda:</strong> ${fields.nomeAzienda}</p>
      <p><strong>Partita IVA:</strong> ${fields.partitaIva}</p>
      <p><strong>Legale Rappresentante:</strong> ${fields.legaleRappresentante}</p>
      <p><strong>Email:</strong> ${fields.email}</p>
      <p><strong>Telefono:</strong> ${fields.telefono}</p>
      <p><strong>Sito Web:</strong> ${fields.sitoWeb}</p>
      <p><strong>Indirizzo:</strong> ${fields.via}, ${fields['citta']}</p>
      <p><strong>Messaggio:</strong> ${fields.messaggio}</p>
    `;

    const info = await transporter.sendMail({
      from: '"Faccio Tutto" <affiliazione@faccio-tutto.it>',
      to,
      subject: 'Nuova richiesta di affiliazione',
      html,
      attachments,
    });

    console.log('✅ Email inviata con successo. ID:', info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error('❌ Errore in sendEmail:', error);
    throw new Error('Errore durante l’invio email');
  }
}