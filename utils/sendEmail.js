import nodemailer from "nodemailer";

const sendEmail = async (mail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com", // Corrected host
    port: 465, // For secure connections (SMTP over SSL/TLS)
    secure: true, // Use SSL/TLS for Gmail
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or App Password
    },
    tls: {
      rejectUnauthorized: false, // Ignore self-signed certificate issue (only use in development)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
