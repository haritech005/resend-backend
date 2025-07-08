import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Hariharan <onboarding@resend.dev>',
      to: 'j.hariharan005@gmail.com',
      subject: `New message from ${name}`,
      reply_to: email,
      text: "email : "+ email +"\n message : " + message,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
};
