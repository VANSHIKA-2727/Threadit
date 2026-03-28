import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export default mongoose.model("Comment", commentSchema);
