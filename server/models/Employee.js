const mongoose = require("mongoose");

// Employee Schema with Validation
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "is invalid"], // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{10,15}$/, "is invalid"], // Phone validation regex
  },
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
