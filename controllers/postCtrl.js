const Post = require("../models/postsModel");
const validator = require("../validators/validator");

postCtrl = {
  getPosts: async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id }).populate(
        "author",
        "firstName -_id"
      );
      if (!post) {
        return res.status(404).send("Malumot topilmadi...");
      }
      res.status(200).send(post);
    } catch (err) {
      if (err === "CastError") {
        return res
          .status(404)
          .send("Berilgan IDga teng bo'lgan post topilmadi");
      }
    }
  },
  createPost: async (req, res) => {
    const { error } = await validator.checkPost(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const post = await Post.create({
      title: req.body.title,
      bodyTitle: req.body.bodyTitle,
      author: req.body.author,
    });

    res.status(201).send(post);
  },
  updatePost: async (req, res) => {
    try {
      const { error } = await validator.checkEmail(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      let post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        bodyTitle: req.body.bodyTitle,
      });
      if (!post)
        return res
          .status(404)
          .send("Berilgan IDga teng bo'lgan toifa topilmadi");

      res.send(post);
    } catch (err) {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send("Berilgan IDga teng bo'lgan post topilmadi");
      }
    }
  },
  deletePost: async (req, res) => {
    let post = await Post.findByIdAndDelete(req.params.id);

    if (!post)
      return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

    res.send(post);
  },
};
module.exports = postCtrl;
