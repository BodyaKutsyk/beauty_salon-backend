import nodemailer from 'nodemailer';
import 'dotenv/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

type MailBody = {
  email: string;
  subject: string;
  html: string;
};

const smtpConfig: SMTPTransport.Options = {
  host: process.env.SMTP_HOST,
  // port: Number(process.env.SMTP_PORT),
  port: 465,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

export function sendMail({ email, subject, html }: MailBody) {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
}

export function sendActivationEmail(email: string, token: string) {
  const href = `${process.env.CLIENT_HOST}/activate/${token}`;
  const html = `
    <h1>Activate account</h1>
    <a href="${href}">${href}</a>
  `;
  return sendMail({ email, html, subject: 'Activate' });
}

export const emailService = {
  sendActivationEmail,
  sendMail,
};
