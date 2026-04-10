const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");
const { signup, login } = require("../Controllers/AuthController");
const router = require("express").Router();

const User = require("../Models/User");
const bcrypt = require("bcryptjs/dist/bcrypt");

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

router.get("/verify-email/:token", verifyEmail);

router.post("/delete-account", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/change-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  //to make sure all the fields are filled up
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    //to find out if there is user with the same username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //to check if the old password match to the user's original password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    //to change the password and save it
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
