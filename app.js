const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, keys } = req.body;

    // Create a Nodemailer transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail'
      auth: {
        user: "dgadhiya412@rku.ac.in",
        pass: 'R789s73"""""',
      },
    });

    // HTML content for the email
    const htmlContent = `
      <h3 style='color:#000'>Password Reset Request From PawanPutra Technology</h3>
      <p style='color:#000'>Dear ${name},</p>
      <p style='color:#000'>You are receiving this email because a password reset request has been initiated for your PawanPutraTechnology account.</p>
      <p style='color:#000'> To reset your password, please click on the following link: <a href='http://localhost:3000/#/authentication/reset-password/${keys}'>http://localhost:3000/#/authentication/reset-password/${keys}</a></p>
      <p style='color:#000'>If you did not initiate this request, please disregard this message. Your account remains secure, and no action is needed.</p>
      <p style='color:#000'>Thank you,</p>
      <p style='color:#000'>PawanPutra Technology</p>
    `;

    // Email content
    const mailOptions = {
      from: "dgadhiya412@rku.ac.in",
      to: email, // Replace with the recipient's email address
      subject: "New Form Submission",
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email: ", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
