const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 6000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your route to handle form submissions
app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter with your SMTP settings
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "dgadhiya412@rku.ac.in",
      pass: 'R789s73""""""',
    },
    // tls:{rejectUnauthorized:false}
  });

  // Define email options
  const mailOptions = {
    from: "dgadhiya412@rku.ac.in",
    to: "dharmik.webdeveloper@gmail.com",
    subject: subject,
    html: `<div>Name: ${name}</div>
    <div>Email: ${email}\n</div>
    <div>Subject is: ${subject}\n</div>
    Message: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
