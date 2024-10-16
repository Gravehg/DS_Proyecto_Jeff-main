import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codeduende@gmail.com",
    pass: "btkhgxybyxemyqjq",
  },
});

export function sendEmail(email: string, subject: string, content: string) {
  // Configura el contenido del correo
  const mailOptions = {
    from: "codeduende@gmail.com",
    to: email,
    subject: subject,
    text: content,
  };

  // Envía el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
}
