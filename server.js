const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const port = 3000;

// Initialize Resend
const resend = new Resend('re_FhMCppvw_6Ud7JP4g2FN4WiXy1SKvdRtE');

// Middleware
app.use(cors());
app.use(express.json());
// Specifically needed for parsing application/x-www-form-urlencoded payloads (FormData objects without fetch conversions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// API endpoint specifically for the contact page
app.post('/api/contact', async (req, res) => {
  const { yourName, yourEmail, yourMessage } = req.body;
  
  if (!yourName || !yourEmail || !yourMessage) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rayhankhan138@gmail.com',
      subject: `New Message from ${yourName} - Learn Fatiha Academy`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${yourName}</p>
        <p><strong>Email:</strong> ${yourEmail}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #eee; padding-left: 14px; margin-left: 0; color: #555;">
          ${yourMessage.replace(/\n/g, '<br>')}
        </blockquote>
      `
    });

    if (data.error) {
       console.error("Resend API Error:", data.error);
       return res.status(500).json({ success: false, message: data.error.message || 'Failed to send email' });
    }

    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Server API routing error:", error);
    res.status(500).json({ success: false, message: 'Internal server error while sending email' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`========================================`);
  console.log(`Server is running!`);
  console.log(`View site locally: http://localhost:${port}`);
  console.log(`API URL: http://localhost:${port}/api/contact`);
  console.log(`========================================`);
});
