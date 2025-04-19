const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = async (options) => {
  // Create transporter
  console.log(`Connecting to email service...`, process.env.EMAIL_USERNAME)
  const transporter = nodemailer.createTransport({
   
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Define mail options
  const mailOptions = {
    from: `Alumni Connect <${config.email.from}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log(`Email sent: ${info.messageId}`);
};

module.exports = sendEmail;