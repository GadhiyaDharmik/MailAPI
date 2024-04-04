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
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail'
      auth: {
        user: "dgadhiya412@rku.ac.in",
        pass: 'R789s73""""""',
      },
    });

    // Email content
    const mailOptions = {
      from: "dgadhiya412@rku.ac.in",
      to: "mthumar85@gmail.com", // Replace with the recipient's email address
      subject: "New Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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
