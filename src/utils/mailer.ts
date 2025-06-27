import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

});
console.log("Email user:", process.env.EMAIL_USER)
export const sendEmail = async (to: string, subject: string, html: string) => {
  return transporter.sendMail({
    from: `"Feranmi 👋" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
