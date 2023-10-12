const Joi = require('joi');

const userRule = {
  //schemas for sign_up
  sign_up: Joi.object().keys({
    name: Joi.string()
      .required()
      .error(() => `full name is required.`),
    username: Joi.string()
      .min(3)
      .max(32)
      .required()
      .error(
        () =>
          `username is not valid, it must be at least 4 characters and not greater than 32 characters`
      ),
    email: Joi.string()
      .email()
      .required()
      .error(() => `email address is not valid.`),
    password: Joi.string()
      .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/))
      .required()
      .error(
        () =>
          `it must contain ONLY the following characters: lower case, upper case, numerics, and at least 6 characters and not greater than 32 characters.`
      ),
  }),

  //schemas for login
  login: Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(32)
      .required()
      .error(
        () =>
          `username is not valid, it must be at least 3 characters and not greater than 32 characters`
      ),
    password: Joi.string()
      .min(6)
      .required()
      .error(() => `password must be at least 6 characters.`),
  }),

  updateUser: Joi.object().keys({
    name: Joi.string()
      .required()
      .error(() => `full name is required.`),
    email: Joi.string()
      .email()
      .required()
      .error(() => `email address is not valid.`),
    username: Joi.string()
      .min(4)
      .max(32)
      .required()
      .error(
        () =>
          `username is not valid, it must be at least 4 characters and not greater than 32 characters`
      ),
    bio: Joi.string(),
    website: Joi.string(),
    gender: Joi.string(),
    phone: Joi.string(),
  }),
};

module.exports = { userRule };
