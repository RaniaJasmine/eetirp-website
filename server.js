import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Set up the authenticated email connection channel
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Post endpoint targeted by the frontend submit request
app.post('/api/onboarding', async (req, res) => {
    const { fullName, email, segment, domainInterest, inquiryMatrix } = req.body;

    if (!fullName || !email || !inquiryMatrix) {
        return res.status(400).json({
            success: false,
            message: 'Please complete all required fields before submitting.'
        });
    }

    const mailOptions = {
        from: `"EETIRP Web Studio Portal" <${process.env.EMAIL_USER}>`,
        to: process.env.COMPANY_EMAIL,
        replyTo: email,
        subject: `🚀 New Studio Inquiry from ${fullName}`,
        html: `
      <div style="font-family: sans-serif; padding: 25px; line-height: 1.6; max-width: 600px; background-color: #0b1f3b; color: #f4f1ea; border-radius: 8px;">
        <h2 style="color: #bfd3e6; margin-top: 0; border-bottom: 2px solid #1f3a5f; padding-bottom: 10px;">New Intake Notification</h2>
        <p><strong>Candidate Name:</strong> ${fullName}</p>
        <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #6f8faf; text-decoration: none;">${email}</a></p>
        <p><strong>Profile Segment:</strong> ${segment || 'Not specified'}</p>
        <p><strong>Focus Domain Interest:</strong> ${domainInterest || 'Not specified'}</p>
        <div style="background-color: #1f3a5f; padding: 15px; border-left: 4px solid #6f8faf; border-radius: 4px; margin-top: 20px;">
          <h4 style="margin: 0 0 10px 0; color: #bfd3e6;">Core Query / Goals:</h4>
          <p style="margin: 0; font-style: italic; color: #f4f1ea;">"${inquiryMatrix}"</p>
        </div>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Inquiry received!' });
    } catch (error) {
        console.error('Mail dispatch system failure:', error);
        return res.status(500).json({ success: false, message: 'Server email routing error.' });
    }
});

// Serve compiled static layout views
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server actively running on port :${PORT}`);
});