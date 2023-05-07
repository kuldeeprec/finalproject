const express = require('express');
const Person = require('../models/Person');
const User = require('../models/User');
const Like = require('../models/Like');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require('express-validator');

var storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/UserImages'), function (error, success) {
      if (error) {
        console.log(error);
      }
    })
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname, function (error, success) {
      if (error) {
        console.log(error);
      }
    })
  }
})

let upload0 = multer({ storage: storageImage })
router.post('/uploadimage', upload0.single('myimage'), async (req, res) => {
  try {
    let profile = req.file.filename;
    let { email } = req.body;
    console.log(profile, email, "req.body");
    // console.log(file, "filename", req.body);
    let user1 = await Person.findOne({ userId: req.body.email });
    console.log(profile, "profile");
    if (user1.profile_img) {
      user1.profile_img.push({ image_profile: profile });
    }
    else {
      user1.profile_img[0].image_profile = profile;
    }
    let p = await Person.findByIdAndUpdate(user1._id, user1);
    res.status(200).json({});
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

var storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/UserPosts'), function (error, success) {
      if (error) {
        console.log(error);
      }
    })
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname, function (error, success) {
      if (error) {
        console.log(error);
      }
    })
  }
})

let upload1 = multer({ storage: storagePost })
router.post('/uploadpost', upload1.single('mypost'), async (req, res) => {
  // console.log(req.body.myfile,"Upload File");
  try {
    let post = req.file.filename;
    let { email } = req.body;
    console.log(post, email, "req.body");
    // console.log(file, "filename", req.body);
    let user = await User.findOne({ signupEmail: req.body.email });
    let user1 = await Person.findOne({ userId: req.body.email });
    console.log(post, "profile");
    let postDetails = await Post.create({
      poster_id: req.body.email,
      image_file: post,
      name: user.name,
    })
    user1.post.push({ post_obj_id: postDetails._id });
    await user1.save();
    // if (user1.post) {
    //   user1.post.push({ image_file: post, name: user.name, post_id: user.signupEmail });
    // }
    // else {
    //   user1.post[0].image_file = post;
    //   user1.post[0].name = user.name;
    //   user1.post[0].post_id = user.signupEmail;
    // }
    // let p = await Person.findByIdAndUpdate(user1._id, user1);
    res.status(200).json({});
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/likepost', async (req, res) => {
  try {
    console.log("file", "filename", req.body);
    let temp = 0;
    let result = 0;
    let user1 = await Like.findOne({ poster_id: req.body.poster_id, liker_id: req.body.login_id, post_obj_id: req.body.post_obj_id });
    // console.log(user1, "user1");
    if (user1) {
      let post_data = await Post.findOne({ _id: req.body.post_obj_id, poster_id: req.body.poster_id });
      console.log(post_data, "post_data");
      let like1 = post_data.like;
      console.log(like1, "post1")
      let flike = like1.filter((item) => item.like_obj_id == req.body.post_obj_id);
      console.log(flike, "flike")
      post_data.like = flike;
      await post_data.save();
      await Like.deleteOne({ poster_id: req.body.poster_id, post_obj_id: req.body.post_obj_id, liker_id: req.body.login_id });
      temp = 1;
    }
    if (temp) {
      result = 1;
      res.status(200).json({ result: result });
    }
    else {
      let likeDetails = await Like.create({
        poster_id: req.body.poster_id,
        liker_id: req.body.login_id,
        post_obj_id: req.body.post_obj_id
      })
      let post_data = await Post.findOne({ _id: req.body.post_obj_id });
      post_data.like.push({ like_obj_id: likeDetails._id });
      await post_data.save();
      result = 2;
      res.status(200).json({ result: result });
    }
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/fetchcomment', async (req, res) => {
  try {
    let comment_data = await Comment.find({ post_obj_id: req.body.id });
    res.status(500).send(comment_data);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/postcomment', async (req, res) => {
  try {
    console.log(req.body, "req.body");
    let result = 0;
    // let user1 = await Comment.findOne({ poster_id: req.body.poster_id, liker_id: req.body.login_id, post_obj_id: req.body.post_obj_id });
    let post_data = await Post.findOne({ _id: req.body.post_obj_id, poster_id: req.body.poster_id });
    console.log(post_data, "post_data");
    let commentDetails = await Comment.create({
      comment_by: req.body.login_id,
      post_id: req.body.poster_id,
      post_obj_id: req.body.post_obj_id,
      comment: req.body.comment
    })
    post_data.comment.push({ comment_id: commentDetails._id });
    await post_data.save();
    result = 1;
    res.status(200).json({ result: result });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

module.exports = router