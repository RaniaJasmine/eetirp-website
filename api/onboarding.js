import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { fullName, email, segment, domainInterest, inquiryMatrix } = req.body;

    if (!fullName || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"EETIRP Portal" <${process.env.EMAIL_USER}>`,
        to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Inquiry from ${fullName}`,
        html: `
      <h2>New Onboarding Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Segment:</strong> ${segment || 'Not specified'}</p>
      <p><strong>Interest:</strong> ${domainInterest || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${inquiryMatrix || 'No message provided'}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Inquiry sent!' });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}