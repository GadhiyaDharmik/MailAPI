const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import the 'cors' package

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
  try {
    const { email, message } = req.body;

    // Check if both email and message are provided
    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required." });
    }

    // Create a Nodemailer transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail'
      auth: {
      user: "dgadhiya412@rku.ac.in",
        pass: 'R789s73""""""',
      },
    });

    // HTML content for the email
    const htmlContent = `
     <h3 style='color:#000; font-family: Arial, sans-serif;'>Thank You for Contacting Us</h3>
        <ul style='color:#333; font-family: Arial, sans-serif;'>
            <li><strong>Name:</strong> Dharmik gadhiya</li>
            <li><strong>Email:</strong> dharmikgadhiya52525@gmail.com</li>
            <li><strong>Mobile Number:</strong> 09724740340</li>
            <li><strong>Message:</strong> hii..</li>
        </ul>
        <p style='color:#333; font-family: Arial, sans-serif;'>Best Regards,</p>
        <p style='color:#333; font-family: Arial, sans-serif;'>Patel Cab Service</p>
    `;

    // Email content
    const mailOptions = {
      from: "dgadhiya412@rku.ac.in", // Replace with your email address
      to: email, // The recipient's email address
      subject: "New Message from PawanPutra Technology",
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
