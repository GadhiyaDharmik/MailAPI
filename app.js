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
        user: "your-email@gmail.com", // Replace with your email address
        pass: 'your-email-password', // Replace with your email password
      },
    });

    // HTML content for the email
    const htmlContent = `
      <h3 style='color:#000'>Message from PawanPutra Technology</h3>
      <p style='color:#000'>You have received a new message:</p>
      <p style='color:#000'>${message}</p>
      <p style='color:#000'>Thank you,</p>
      <p style='color:#000'>PawanPutra Technology</p>
    `;

    // Email content
    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your email address
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
