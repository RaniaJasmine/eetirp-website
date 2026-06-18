// api/notify-registration.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, role, timestamp } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'eetirpltd@gmail.com',
      subject: `🔔 New User Registration: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a1628; color: #fff; border-radius: 12px; border: 1px solid #1a3a5a;">
          <h2 style="color: #6f8faf;">New User Registration</h2>
          <div style="background: #0d1f33; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #6f8faf;">Name:</strong> ${name}</p>
            <p><strong style="color: #6f8faf;">Email:</strong> ${email}</p>
            <p><strong style="color: #6f8faf;">Role:</strong> ${role || 'Student'}</p>
            <p><strong style="color: #6f8faf;">Registered:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>
          <p style="color: #b0c4d8; font-size: 14px;">A new user has joined the EETIRP ecosystem.</p>
          <hr style="border-color: #1a3a5a; margin: 20px 0;">
          <p style="color: #4a6a8f; font-size: 12px;">EETIRP Studio • Hybrid Tech Academy</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Notification sent' });
  } catch (error) {
    console.error('Email notification failed:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}