import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, default: "" },
    image: { type: String, default: "" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default mongoose.model("Post", postSchema);
