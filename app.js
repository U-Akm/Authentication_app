const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { User, Feedback } = require("./mongo"); // Import Models

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Login Route
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json("exist");
    } else if (user) {
      res.json("incorrect"); // Password mismatch
    } else {
      res.json("notexist");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email });

    if (check) {
      res.json("exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.json("notexist");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});

// Feedback Submission
app.post("/api/feedback/submit-feedback", async (req, res) => {
  const { name, email, description } = req.body;

  try {
    const feedback = new Feedback({ name, email, description });
    await feedback.save();
    res.json({ success: true, message: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Fetch Feedback
app.get("/api/feedback/get-feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching feedback" });
  }
});

// Password Reset Email
app.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: http://localhost:3000/reset-password/${user._id}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error sending email");
      }
      res.send("Password reset email sent");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during password reset");
  }
});

// Update Password After Reset
app.post("/update-password", async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    if (!user) return res.status(400).send("User not found");
    res.send("Password updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating password");
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
