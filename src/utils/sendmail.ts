import "dotenv/config";
import nodemailer, { createTransport } from "nodemailer";
import generatehtml from "./generatehtml";
import { generateRandomNumber } from "./codegenerate";
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: false,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_PASS,
  },
});
// const transporter = createTransport({
//   host: String(process.env.SMTP_HOST),
//   port: process.env.SMTP_PORT,
//   secureConnection: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false, // Agar server sertifikati tasdiqlanmagan bo'lsa, to'xtatish
//   },
// });

export async function sendCode(mail: string) {
  // send mail with defined transport object
  let code = generateRandomNumber();
  let template = generatehtml(code);
  const info = await transporter.sendMail({
    from: "NETFLIX UZB", // sender address
    to: mail, // list of receivers
    subject: code + " Bu sizning tasdiqlash kodingiz", // Subject line
    html: template, // html body
  });
  return {
    code: code,
    mail: info,
  };
}
