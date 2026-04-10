const bcrypt = require("bcryptjs");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
import sendEmailVerification from "../Utils/EmailVerification.js";

// Load environment variables
dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // inside signup function after creating user
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verifyToken,
      verifyExpiry,
    });
    await newUser.save();
    await sendEmailVerification(email, username, verifyToken);

    res.status(201).json({
      message: "Signup successful.",
      success: true,
    });
  } catch (err) {
    console.error("Signup Error:", err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  const user = await UserModel.findOne({ verifyToken: token });

  if (!user) {
    return res.status(200).json({
      success: true,
      message: "Already verified!",
    });
  }

  if (user.verifyExpiry < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Link expired. Please request a new one.",
    });
  }

  user.isVerified = true;
  user.verifyToken = null;
  user.verifyExpiry = null;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Email verified successfully!",
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User does not exist.",
        success: false,
      });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Authentication failed. Email or password is incorrect.",
        success: false,
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      message: "Login successful.",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login Error:", err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  verifyEmail,
};
