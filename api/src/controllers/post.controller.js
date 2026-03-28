import * as postService from "../services/post.service.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const { sort, search } = req.query;
    const data = await postService.getAllPosts({ sort, search });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const data = await postService.getPostById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const data = await postService.createPost(req.body, req.user._id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const data = await postService.updatePost(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id, req.user._id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};

export const votePost = async (req, res, next) => {
  try {
    const data = await postService.votePost(req.params.id, req.user._id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
