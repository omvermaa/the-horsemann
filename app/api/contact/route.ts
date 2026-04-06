import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, scale, projectScope } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Debug check (will not log actual passwords)
    console.log('GMAIL_USER present:', !!process.env.GMAIL_USER);
    console.log('GMAIL_APP_PASSWORD present:', !!process.env.GMAIL_APP_PASSWORD);

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('CRITICAL: Email credentials missing from environment variables.');
      return NextResponse.json({ error: 'Email configuration is incomplete on server.' }, { status: 500 });
    }

    // Configure the nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'verma.om003@gmail.com',
      subject: `New Priority Access Request: ${name}`,
      text: `
        You have received a new priority access request!

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Current Scale: ${scale}
        Project Scope: ${projectScope || 'Not provided'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #fff; padding: 30px; border-radius: 10px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37; text-transform: uppercase; letter-spacing: 2px;">New Priority Request</h2>
          <hr style="border-color: #333; margin-bottom: 20px;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Current Scale:</strong> ${scale}</p>
          <p><strong>Project Scope / Intel:</strong><br />${projectScope || 'Not provided'}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
