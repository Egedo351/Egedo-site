const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });

  try {
    const { name, email, message, website } = req.body || {};
    if (website) return res.status(200).json({ ok:true }); // honeypot (botları filteler)
    if (!name || !email || !message) return res.status(400).json({ ok:false, error:'Missing fields' });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,    // smtp.zoho.eu
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true', // 465:true / 587:false
      auth: {
        user: process.env.SMTP_USER,  // info@egedo.net
        pass: process.env.SMTP_PASS   // Zoho app password
      }
    });

    const info = await transporter.sendMail({
      from: `"Egedo Website" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: `New contact form • ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).json({ ok:true, id: info.messageId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, error:'Mailer error' });
  }
};
