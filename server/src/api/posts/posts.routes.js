const express = require('express');
const router = new express.Router();
const path = require('path');
const fs = require('fs');

const Post = require('../../models/post.model');
const { postRule } = require('./posts.schema');
const { dataFilters } = require('../../utils/filters');

const auth = require('../../middlewares/auth');
const joimiddleware = require('../../middlewares/joi');
const upload = require('../../middlewares/multer');

// Create a post
router.post('/', auth, async (req, res, next) => {
  try {
    upload(`posts/${req.user.username}`).array('file', 15)(
      req,
      res,
      async (err) => {
        if (err) {
          throw err;
        } else if (!req.files) {
          return res.status(400).send({ message: 'please upload a file.' });
        } else if (!req.body.caption) {
          return res.status(400).send({ message: 'caption is required.' });
        } else {
          const post = new Post({
            user: req.user._id,
            caption: req.body.caption,
            imageurl: req.files.map(
              (el) => `${el.destination.replace('.', '')}${el.filename}`
            ),
          });
          if (
            req.files[0].mimetype.startsWith('video') &&
            req.body.type === 'reel'
          ) {
            post.type = 'reel';
          }
          await post.save();
          res.status(201).send(post);
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

// Get followed user posts
router.get('/', auth, async (req, res, next) => {
  const {
    user: { _id, following },
  } = req;
  try {
    const result = await Post.find()
      .sort([['createdAt', -1]])
      .populate('user')
      .populate('comments.user', '_id imageurl username')
      .select('-updatedAt -__v');

    const userFollowedPosts = result.filter((item) =>
      following.includes(item.user._id)
    );
    const postsWithUserDetails = await Promise.all(
      userFollowedPosts.map(async (post) => {
        const { userLikedPost, userReportedPost, userTotalPost } =
          await dataFilters(post, _id);
        return { ...post._doc, userLikedPost, userReportedPost, userTotalPost };
      })
    );
    res.send(postsWithUserDetails);
  } catch (e) {
    next(e);
  }
});

// Get one post
router.get('/p/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const postResult = await Post.findById(id)
      .populate('user')
      .populate('comments.user', '_id imageurl username')
      .select('-updatedAt -__v');
    if (!postResult) return res.status(404).send({ message: 'no post found.' });
    const { userLikedPost, userReportedPost } = await dataFilters(
      postResult,
      user._id,
      (type = 'single')
    );
    const all_posts = await Post.find({ user: postResult.user._id })
      .sort([['createdAt', -1]])
      .select('_id imageurl likes comments caption');
    const currentPost = {
      ...postResult._doc,
      userLikedPost,
      userReportedPost,
      userTotalPost: all_posts.length,
    };
    const relatedPosts = all_posts.filter(
      (item) =>
        item._imageurl !== postResult.imageurl &&
        item.caption !== postResult.caption
    );
    res.send({ currentPost, relatedPosts });
  } catch (e) {
    next(e);
  }
});

// get all posts to explore
router.get('/explore', auth, async (_req, res, next) => {
  try {
    const result = await Post.find()
      .sort([['createdAt', -1]])
      .select('_id imageurl type likes comments');
    res.send(result);
  } catch (e) {
    next(e);
  }
});

// Comment a post
router.patch(
  '/c/:id',
  auth,
  joimiddleware(postRule.comment_post),
  async (req, res, next) => {
    const { body } = req.body;
    const { user } = req;
    const postId = req.params.id;
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).send({ message: 'no post found.' });
      post.comments.unshift({
        user: user._id,
        body,
        createdAt: Date.now(),
      });
      await post.save();
      const data = await Post.findById(post._id).populate(
        'comments.user',
        '_id imageurl username'
      );
      return res.send(data);
    } catch (e) {
      next(e);
    }
  }
);

// Like a post
router.patch('/like/:id', auth, async (req, res, next) => {
  const { user } = req;
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send({ message: 'no post found.' });

    if (post.likes.includes(user._id)) {
      // Post already likes, unlike it
      post.likes = post.likes.filter((item) => item === user._id);
    } else {
      // Not liked, like post
      post.likes.push(user._id);
    }
    await post.save();
    return res.send(post);
  } catch (e) {
    next(e);
  }
});

// Report a post
router.patch('/report/:id', auth, async (req, res, next) => {
  const { user } = req;
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send({ message: 'no post found.' });

    if (post.reports.includes(user._id)) {
      // Post already reported, unreport it
      post.reports = post.reports.filter((item) => item === user._id);
    } else {
      // Not Reported, report post
      post.reports.push(user._id);
    }
    await post.save();
    return res.send(post);
  } catch (e) {
    next(e);
  }
});

// delete post
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('user');
    if (!post) return res.status(404).send({ message: 'no post found.' });
    if (req.user.username === post.user.username) {
      await post.remove();
      post.imageurl.forEach((el) => {
        if (el) {
          fs.unlink(path.join(__dirname + '../../../../' + el), (err) => {
            if (err) throw err;
          });
        }
      });
      return res.send(post);
    }
    return res
      .status(403)
      .send({ message: 'sorry, this post does not belong to you.' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
