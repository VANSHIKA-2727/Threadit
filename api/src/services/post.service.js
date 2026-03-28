import Post from "../models/Post.js";

export const getAllPosts = async ({ sort, search }) => {
  const query = search ? { title: { $regex: search, $options: "i" } } : {};

  let sortOption = { createdAt: -1 };
  if (sort === "top") sortOption = { votes: -1 };

  return await Post.find(query)
    .sort(sortOption)
    .populate("author", "username avatar");
};

export const getPostById = async (id) => {
  const post = await Post.findById(id).populate("author", "username avatar");
  if (!post) throw { statusCode: 404, message: "Post not found" };
  return post;
};

export const createPost = async ({ title, body, image, tags }, userId) => {
  return await Post.create({ title, body, image, tags, author: userId });
};

export const updatePost = async (id, { title, body, image, tags }, userId) => {
  const post = await Post.findById(id);
  if (!post) throw { statusCode: 404, message: "Post not found" };
  if (post.author.toString() !== userId.toString())
    throw { statusCode: 403, message: "Unauthorized" };

  post.title = title ?? post.title;
  post.body = body ?? post.body;
  post.image = image ?? post.image;
  post.tags = tags ?? post.tags;

  return await post.save();
};

export const deletePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) throw { statusCode: 404, message: "Post not found" };
  if (post.author.toString() !== userId.toString())
    throw { statusCode: 403, message: "Unauthorized" };

  await post.deleteOne();
};

export const votePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) throw { statusCode: 404, message: "Post not found" };

  const index = post.votes.indexOf(userId);
  if (index === -1) {
    post.votes.push(userId);
  } else {
    post.votes.splice(index, 1);
  }

  return await post.save();
};
