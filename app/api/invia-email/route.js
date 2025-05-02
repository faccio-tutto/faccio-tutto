import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      nome,
      cognome,
      email,
      telefono,
      via,
      città,
      messaggio,
      dimensioni = [],
      materiale,
      colore,
      accessori,
      destinatarioEmail,
    } = body;

    const defaultDestinatario = process.env.MAIL_DESTINATARIO_INFISSI;
    const mailDestinatario = destinatarioEmail || defaultDestinatario;

    if (!mailDestinatario) {
      return NextResponse.json(
        { success: false, error: 'Destinatario email non configurato.' },
        { status: 400 },
      );
    }

    const contenutoMail = `
Hai ricevuto una nuova richiesta di preventivo dal sito faccio-tutto.it:

📌 **Dati utente**
- Nome: ${nome}
- Cognome: ${cognome}
- Email: ${email}
- Telefono: ${telefono}
- Via: ${via}
- Città: ${città}

📐 **Dimensioni Finestre**
${dimensioni.filter((val) => val.trim()).map((val, i) => `  - Finestra ${i + 1}: ${val}`).join('\n')}

🎨 **Colore:** ${colore}
🧱 **Materiale:** ${materiale}
🧩 **Accessori:** ${accessori}

✉️ **Messaggio aggiuntivo:** ${messaggio || 'Nessun messaggio'}
`;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      logger: true,
      debug: true,
    });

    const mailOptions = {
      from: `"Faccio Tutto" <${process.env.SMTP_USER}>`,
      to: mailDestinatario,
      subject: `Richiesta Preventivo da ${nome} ${cognome}`,
      text: contenutoMail,
      html: `<pre>${contenutoMail}</pre>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ success: true, message: 'Email inviata correttamente!' }, { status: 200 });
  } catch (error) {
    console.error('Errore invio email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Errore sconosciuto durante l\'invio dell\'email.' },
      { status: 500 },
    );
  }
}
