const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("./models/Employee");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: [
    "http://localhost:3000",  // your front-end address
    "http://localhost:5173",  // your React dev server address
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/register")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// JWT Secret (for token generation and verification)
const JWT_SECRET = "your_jwt_secret";

// Route to register user
app.post("/register", async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new EmployeeModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to login user
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to fetch student data (new route)
app.get("/tostudent", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded); // Log the decoded token to debug

    const user = await EmployeeModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user-specific data
    res.json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Start Server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
