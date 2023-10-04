import User from "../modules/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/Features.js";
import jwt from "jsonwebtoken";
import ErroHandeler from "../middleware/error.js";
export const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.json({
    success: true,
    user,
  });
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErroHandeler("User already exsist"), 403);

    const hasedpassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hasedpassword });
    sendToken(user, res, 200, "User created successfully");
  } catch (error) {
    next(new ErroHandeler("this is error"), 404);
  }
};

export const findSingleUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErroHandeler("Not found"), 403);
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return next(new ErroHandeler("invalid email and password"), 403);

      sendToken(user, res, 200, `Welcome ${user.name}`);
    }
  } catch (error) {
    next(error);
  }
};

export const Logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout",
    });
};
