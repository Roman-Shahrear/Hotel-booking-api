import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

// ------------------> Register ------------------------------->
export const register = async (req, res, next) => {
  try {
    // <-------- Take Input from body ------------>
    const { firstName, lastName, email, password } = req.body;

    // <--------- input validation --------->
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, `All fields are required`));
    }

    // <---------- Password validation ---------->
    if (password.length < 8) {
      return next(
        errorHandler(400, `Password must be at least 8 characters long`)
      );
    }

    // <----------- Check for existing User ------------->
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(errorHandler(409, `User already exists`));
    }

    // <----------- Hash passwod ------------->
    const hashedPassword = await bcryptjs.hash(password, 10);

    // <----------- Create new User ------------->
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // <----------- Create payload with user details ------------->
    const payload = {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };

    // <----------- Sign JWT token with payload ------------->
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: `User register successfully`, token });
  } catch (error) {
    next(error);
  }
};

// -------------------------> Log in ------------------------------->

export const login = async (req, res, next) => {
  // ----------> Take input from form body ------------->
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return next(errorHandler(400, `Invalid Credentials`));
    }

    // <----------- Create payload with user details ------------->
    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    // <----------- log in JWT token with payload ------------->
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ message: `User logged in successfully` });
  } catch (error) {
    next(errorHandler(500, `Internal Server Error`));
  }
};

// -------------------------> Log out ------------------------------->
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json(`User has been log out`);
  } catch (error) {
    next(error);
  }
};
