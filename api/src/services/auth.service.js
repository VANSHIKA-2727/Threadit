import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) throw { statusCode: 400, message: "User already exists" };

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: { id: user._id, username: user.username, email: user.email },
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { statusCode: 400, message: "Invalid credentials" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { statusCode: 400, message: "Invalid credentials" };

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: { id: user._id, username: user.username, email: user.email },
  };
};

export const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw { statusCode: 404, message: "User not found" };
  return user;
};
