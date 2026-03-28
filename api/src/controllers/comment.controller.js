import * as commentService from "../services/comment.service.js";

export const getCommentsByPost = async (req, res, next) => {
  try {
    const data = await commentService.getCommentsByPost(req.params.postId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const data = await commentService.createComment(req.body, req.user._id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const data = await commentService.updateComment(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id, req.user._id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

export const voteComment = async (req, res, next) => {
  try {
    const data = await commentService.voteComment(req.params.id, req.user._id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
