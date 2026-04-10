import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../Models/User.js";

dotenv.config();

// ===== SIGNUP =====
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists.",
        success: false,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verifyToken,
      verifyExpiry,
    });
    await newUser.save();

    res.status(201).json({
      message:
        "Signup successful. Please check your email to verify your account.",
      success: true,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// ===== LOGIN =====
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User does not exist.",
        success: false,
      });
    }

    // block unverified users
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Authentication failed. Email or password is incorrect.",
        success: false,
      });
    }

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
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
