import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../Models/User.js";
import sendEmailVerification from "../Utils/EmailVerification.js";

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

    // generate token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

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

    // send verification email — use name not username
    await sendEmailVerification(email, name, verifyToken);

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

// ===== VERIFY EMAIL =====
export const verifyEmail = async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Verify Email Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ===== RESEND VERIFICATION =====
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified.",
      });
    }

    // generate new token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verifyToken = verifyToken;
    user.verifyExpiry = verifyExpiry;
    await user.save();

    await sendEmailVerification(email, user.name, verifyToken);

    res.status(200).json({
      success: true,
      message: "Verification email resent! Please check your inbox.",
    });
  } catch (err) {
    console.error("Resend Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error.",
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
