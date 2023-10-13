const path = require('path');
const fs = require('fs');

const User = require('../../models/user.model');
const Post = require('../../models/post.model');

const upload = require('../../middlewares/multer');
const { reduceUserDetails } = require('../../utils/filters');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user)
        return res.status(400).send({ message: 'username already taken.' });
      const currentUser = new User(req.body);
      await currentUser.save();
      res.status(201).send(currentUser);
    } catch (e) {
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      const currentUser = await User.findByCredentials(
        req.body.username,
        req.body.password
      );
      const token = await currentUser.generateAuthToken();
      res.send({ currentUser, token });
    } catch (e) {
      next(e);
    }
  },
  loginFacebook: async (req, res, next) => {
    const { email, userID, name } = req.body;
    const nameArray = name.split(' ');

    const user = await User.findOne({ facebook: userID });
    if (!user) {
      const newUser = new User({
        name,
        username: nameArray.join('') + userID,
        email,
        facebook: userID,
      });
      try {
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).send({ user: newUser, token });
      } catch (e) {
        next(e);
      }
    } else {
      const token = await user.generateAuthToken();
      res.send({ user, token });
    }
  },
  uploadImage: async (req, res, next) => {
    try {
      upload(`users/${req.user.username}`).single('file')(
        req,
        res,
        async (err) => {
          if (err) {
            throw err;
          } else if (!req.file) {
            return res.status(400).send({ message: 'please upload a file.' });
          } else {
            if (req.user.imageurl !== '/uploads/users/no-img.png') {
              fs.unlink(
                path.join(__dirname + '../../../../' + req.user.imageurl),
                (err) => {
                  if (err) throw err;
                }
              );
            }
            req.user.imageurl = `${req.file.destination.replace('.', '')}${
              req.file.filename
            }`;
            await req.user.save();
            res.send({ imageurl: req.user.imageurl });
          }
        }
      );
    } catch (e) {
      next(e);
    }
  },
  getLoggedInUserInfo: async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'name',
      'email',
      'username',
      'bio',
      'website',
      'gender',
      'phone',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      return res.status(422).send({ message: 'invalid updates.' });

    try {
      const response = await User.findByIdAndUpdate(req.user._id, {
        $set: { ...req.body },
      });
      res.send(response);
    } catch (e) {
      next(e);
    }
  },
  followUser: async (req, res, next) => {
    const { user: authUser } = req;
    const ProfileId = req.params.id;

    try {
      const user = await User.findById(ProfileId);
      if (!user) return res.status(404).send({ message: 'no such user.' });
      if (
        authUser.following.includes(ProfileId) &&
        user.followers.includes(authUser._id)
      ) {
        // User already follower, unfollow it
        authUser.following = authUser.following.filter(
          (item) => item !== ProfileId
        );
        user.followers = user.followers.filter((item) => item === authUser._id);
      } else {
        // Not followed, follow user
        authUser.following.push(ProfileId);
        user.followers.push(authUser._id);
      }
      await authUser.save();
      await user.save();
      return res.send(authUser);
    } catch (e) {
      next(e);
    }
  },
  getSuggestedUsers: async (req, res, next) => {
    const { user } = req;
    try {
      const response = await User.find().limit(5);
      const users = response.filter(
        (item) =>
          item.username !== user.username && !user.following.includes(item._id)
      );
      return res.send(users);
    } catch (e) {
      next(e);
    }
  },
  getUserProfile: async (req, res, next) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username })
        .populate('followers', '_id username name imageurl')
        .populate('following', '_id username name imageurl');

      if (!user) return res.status(404).send({ message: 'no such user.' });

      const photos = await Post.find({ user: user._id }).sort([
        ['createdAt', -1],
      ]);
      return res.send({ user, photos });
    } catch (e) {
      next(e);
    }
  },
  searchUser: async (req, res, next) => {
    const { q } = req.query;
    const { user } = req;
    try {
      const result = await User.find({ $text: { $search: q } }).select(
        '_id, name username imageurl'
      );
      const users = result.filter((item) => item.username !== user.username);
      return res.send(users);
    } catch (e) {
      next(e);
      res.status(500).send({ message: e.message });
    }
  },
  logout: async (req, res, next) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.send({ message: 'user signed out successfully.' });
    } catch (e) {
      next(e);
      res.status(500).send({ message: e.message });
    }
  },
  logoutAll: async (req, res, next) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send({ message: 'user signed out successfully in all devices.' });
    } catch (e) {
      next(e);
      res.status(500).send({ message: e.message });
    }
  },
};
