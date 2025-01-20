const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();

// Middleware
app.use(express.json()); // Fix: Invoking express.json()
app.use(cors()); // Allow cross-origin requests

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/register", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.post("/login", (req,res) => {
    const {email,password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
      if(user) {
        if(user.password === password)
        {
          res.json("Success")
        }else{
          res.json("The password is incorrect")
        }
      }else {
        res.json("No recird existed")
      }
    })
  })

// Route for Registering Employees
app.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Basic validation
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newEmployee = await EmployeeModel.create({ name, email, password, phone });
    res.status(201).json({ message: "Employee registered successfully", newEmployee });
  } catch (err) {
    console.error("Error saving employee:", err);
    if (err.code === 11000) {
      res.status(400).json({ error: "Email already exists" }); // Handle duplicate email error
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// Start Server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
