// api/contact.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Sadece POST'a izin verelim
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, message, website } = req.body || {};

    // Basit anti-spam (honeypot)
    if (website) return res.status(200).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing fields' });
    }

    // Env değişkenleri (Vercel Settings → Environment Variables)
    const host   = process.env.SMTP_HOST;          // smtp.zoho.eu
    const port   = Number(process.env.SMTP_PORT);  // 465 veya 587
    const secure = port === 465 || String(process.env.SMTP_SECURE) === 'true';
    const user   = process.env.SMTP_USER;          // info@turluna.com (veya egodo)
    const pass   = process.env.SMTP_PASS;          // Zoho App Password (boşluksuz)
    const to     = process.env.RECEIVER_EMAIL || user;

    // SMTP transporter
    const transporter = nodemailer.createTransport({
      host, port, secure,
      auth: { user, pass }
    });

    // Mail içeriği
    const subject = `New contact form • ${name}`;
    const plain   =
`Name: ${name}
Email: ${email}

Message:
${message}`;

    const info = await transporter.sendMail({
      from: `"Website" <${user}>`,
      replyTo: email,
      to,
      subject,
      text: plain,
      html: plain.replace(/\n/g, '<br>')
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error('Mailer error:', err);
    return res.status(500).json({ ok: false, error: 'Mailer error' });
  }
};
