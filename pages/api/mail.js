import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';

export default function handler(req, res){
  const method = req.method;

  if(method === "POST"){
    const { to, subject, text } = req.body

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: "vaishnavirtc@gmail.com",
          pass: process.env.APP_PASSWORD
      }
    });

    const mailOptions = {
      from: "vaishnavirtc@gmail.com",
      to: to,
      subject: subject,
      text: text
    }

    smtpTransport.sendMail(mailOptions, () => {
      smtpTransport.close()
    })


    res.json({
      status: true,
      message: "mail sent sucessfully"
    })
  }
}
