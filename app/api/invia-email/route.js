import nodemailer from 'nodemailer';

export async function POST(request) {
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
    destinatarioEmail  // Aggiungi il campo destinatario per la pagina fotovoltaico
  } = body;

  // Se destinatarioEmail non è presente, usa quello di default (infissi)
  const emailDestinatario = destinatarioEmail || process.env.MAIL_DESTINATARIO_INFISSI;

  const contenutoMail = `
Hai ricevuto una nuova richiesta di preventivo per un impianto fotovoltaico dal sito faccio-tutto.it:

📌 **Dati utente**
- Nome: ${nome}
- Cognome: ${cognome}
- Email: ${email}
- Telefono: ${telefono}
- Via: ${via}
- Città: ${città}

📐 **Dimensioni Finestre**
${dimensioni.filter(val => val.trim()).map((val, i) => `  - Finestra ${i + 1}: ${val}`).join('\n')}

🎨 **Colore:** ${colore}
🧱 **Materiale:** ${materiale}
🧩 **Accessori:** ${accessori}

✉️ **Messaggio aggiuntivo:** ${messaggio || 'Nessun messaggio'}
`;

try {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Faccio Tutto" <${process.env.SMTP_USER}>`,
    to: emailDestinatario,
    subject: `Richiesta Preventivo da ${nome} ${cognome}`,
    text: contenutoMail,
    html: `<pre>${contenutoMail}</pre>`
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });

} catch (error) {
  console.error('Errore invio email:', error);

  return new Response(JSON.stringify({ success: false, error: error.message }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}
}