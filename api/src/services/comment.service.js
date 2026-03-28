import Comment from "../models/Comment.js";

export const getCommentsByPost = async (postId) => {
  return await Comment.find({ post: postId })
    .populate("author", "username avatar")
    .sort({ createdAt: -1 });
};

export const createComment = async ({ body, postId, parent }, userId) => {
  return await Comment.create({
    body,
    post: postId,
    parent: parent || null,
    author: userId,
  });
};

export const updateComment = async (id, { body }, userId) => {
  const comment = await Comment.findById(id);
  if (!comment) throw { statusCode: 404, message: "Comment not found" };
  if (comment.author.toString() !== userId.toString())
    throw { statusCode: 403, message: "Unauthorized" };

  comment.body = body;
  return await comment.save();
};

export const deleteComment = async (id, userId) => {
  const comment = await Comment.findById(id);
  if (!comment) throw { statusCode: 404, message: "Comment not found" };
  if (comment.author.toString() !== userId.toString())
    throw { statusCode: 403, message: "Unauthorized" };

  await comment.deleteOne();
};

export const voteComment = async (id, userId) => {
  const comment = await Comment.findById(id);
  if (!comment) throw { statusCode: 404, message: "Comment not found" };

  const index = comment.votes.indexOf(userId);
  if (index === -1) {
    comment.votes.push(userId);
  } else {
    comment.votes.splice(index, 1);
  }

  return await comment.save();
};
