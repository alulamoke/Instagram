const express = require('express');
const router = new express.Router();
const path = require('path');
const fs = require('fs');

const User = require('../../models/user.model');
const Story = require('../../models/story.model');

const upload = require('../../middlewares/multer');
const auth = require('../../middlewares/auth');

// Create a post
router.post('/', auth, async (req, res, next) => {
  try {
    upload(`stories/${req.user.username}`).single('file')(
      req,
      res,
      async (err) => {
        if (err) {
          throw err;
        } else if (!req.file) {
          return res.status(400).send({ message: 'please upload a file.' });
        } else {
          const story = new Story({
            user: req.user._id,
            type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
            caption: req.body.caption,
            url: `${req.file.destination.replace('.', '')}${req.file.filename}`,
          });
          await story.save();
          const storyWithInfo = await Story.findById(story._id)
            .populate('user', '_id imageurl username')
            .select('-updatedAt -__v');
          res.status(201).send(storyWithInfo);
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

// Get followed user stories
router.get('/', auth, async (req, res, next) => {
  try {
    const result = await Story.find()
      .populate('user', '_id imageurl username')
      .sort([['createdAt', -1]]);
    const userWithStory = [...new Set(result.map((story) => story.user))];
    res.send(userWithStory);
  } catch (e) {
    next(e);
  }
});

// get all stories in a user
router.get('/:userID', auth, async (req, res, next) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID);
    const stories = await Story.find({ user: userID })
      .sort([['createdAt', -1]])
      .populate('user', '_id imageurl username')
      .select('-updatedAt -__v');
    res.send({ user, stories });
  } catch (e) {
    next(e);
  }
});

//play
router.get('/play/:id', async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).send({ message: 'no story found.' });

    if (story.type === 'video') {
      let contentPath = path.join(__dirname + '../../../../' + story.url);
      const stat = fs.statSync(contentPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(contentPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/*',
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/*',
        };
        res.writeHead(200, head);
        fs.createReadStream(contentPath).pipe(res);
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
