import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyToken: { type: String },
  verifyExpiry: { type: Date },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
