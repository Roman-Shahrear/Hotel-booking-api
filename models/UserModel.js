import mongoose from "mongoose";

const userRoles = ["user", "admin"];

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: userRoles,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
