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
})); // CORS setup to allow cross-origin requests

// MongoDB Connection (Updated to remove deprecated options)
mongoose
  .connect("mongodb://localhost:27017/register", {
    // Removed deprecated options
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// JWT Secret (for token generation and verification)
const JWT_SECRET = "your_jwt_secret";

// Route for Registering Employees
app.post("/register", async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!["Student", "Admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newEmployee = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    res.status(201).json({ message: "Employee registered successfully", newEmployee });
  } catch (err) {
    console.error("Error saving employee:", err);
    if (err.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// Route for Logging In Employees
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No record existed" });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: `Only ${role}s are allowed to login` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "The password is incorrect" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Middleware to check token authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;  // Save decoded user info in request object
    next();
  });
};

// Route to Get User Info (protected by JWT)
app.get("/tostudent", authenticateToken, async (req, res) => {
  const { email } = req.user;  // Extract email from the decoded token

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      accountType: user.role,  // Returning accountType based on role (Student or Admin)
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Start Server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
