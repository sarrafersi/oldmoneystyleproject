const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendResetEmail(to, token) {
  const link = `http://localhost:5000/reset-password/${token}`;
  return transporter.sendMail({
    from: `Old Money <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Réinitialisation de mot de passe',
    html: `<p>Réinitialisez votre mot de passe : <a href="${link}">${link}</a></p>`
  });
}

module.exports = { sendResetEmail };
