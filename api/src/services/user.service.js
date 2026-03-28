import User from "../models/User.js";
import Post from "../models/Post.js";

export const getUserProfile = async (username) => {
  const user = await User.findOne({ username }).select("-password");
  if (!user) throw { statusCode: 404, message: "User not found" };

  const posts = await Post.find({ author: user._id })
    .sort({ createdAt: -1 })
    .populate("author", "username avatar");

  return { user, posts };
};

export const updateUserProfile = async (id, { bio, avatar }, userId) => {
  if (id !== userId.toString())
    throw { statusCode: 403, message: "Unauthorized" };

  const user = await User.findByIdAndUpdate(
    id,
    { bio, avatar },
    { new: true },
  ).select("-password");
  if (!user) throw { statusCode: 404, message: "User not found" };

  return user;
};
