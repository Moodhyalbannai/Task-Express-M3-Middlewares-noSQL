const Post = require("../../models/Post");

exports.postsCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.postsDelete = async (req, res, next) => {
  // const { postId } = req.params;
  try {
    await req.post.deleteOne();
    res.status(204).end();
    // const foundPost = await Post.findById(postId);
    // if (foundPost) {
    //   await foundPost.deleteOne();
    //   res.status(204).end();
    // } else {
    //   res.status(404).json({ message: "post not found" });
    // }
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  // const { postId } = req.params;
  try {
    await req.post.updateOne(req.body);
    res.status(204).end();
    // const foundPost = await Post.findById(postId);
    // if (foundPost) {
    //   await foundPost.updateOne(req.body);
    //   res.status(204).end();
    // } else {
    //   res.status(404).json({ message: "post not found" });
    // }
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.fetchOneById = async (next, id) => {
  try {
    const post = await Post.findById(id);
    if (post) {
      return post;
    } else {
      next({ message: "post not found!" });
    }
  } catch (error) {
    next(error);
  }
};
