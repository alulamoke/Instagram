const express = require('express');
const router = new express.Router();

const UserController = require('./users.controller');

const auth = require('../../middlewares/auth');
const joimiddleware = require('../../middlewares/joi');
const { userRule } = require('./users.schema');

// Create a user
router.post('/signup', joimiddleware(userRule.sign_up), UserController.signup);

// Login User
router.post('/login', joimiddleware(userRule.login), UserController.login);

// Login User by facebook
router.post('/login/facebook', UserController.loginFacebook);

//Update user profile-image
router.patch('/photo', auth, UserController.uploadImage);

// User info's
router.get('/me', auth, UserController.getLoggedInUserInfo);

// Edit/Update user
router.patch(
  '/me',
  auth,
  // joimiddleware(userRule.updateUser),
  UserController.updateUser
);

// Follow user
router.patch('/f/:id', auth, UserController.followUser);

// Get suggested users
router.get('/suggested', auth, UserController.getSuggestedUsers);

// Get user profile
router.get('/:username', UserController.getUserProfile);

// Search User
router.get('/', auth, UserController.searchUser);

// Logout user
router.post('/logout', auth, UserController.logout);

// Logout all
router.post('/logoutAll', auth, UserController.logoutAll);

module.exports = router;
