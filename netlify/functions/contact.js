const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_FhMCppvw_6Ud7JP4g2FN4WiXy1SKvdRtE');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    const { yourName, yourEmail, yourMessage } = JSON.parse(event.body);

    if (!yourName || !yourEmail || !yourMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'All fields are required' })
      };
    }

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
      console.error('Resend API Error:', data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: data.error.message || 'Failed to send email' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Email sent successfully!' })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Internal server error' })
    };
  }
};
