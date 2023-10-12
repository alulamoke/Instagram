const Joi = require('joi');

const storyRule = {
  //schemas for creating post
  create_story: Joi.object().keys({
    type: Joi.string()
      .required()
      .error(() => `type is required.`),
    caption: Joi.string()
      .required()
      .error(() => `caption is required.`),
  }),
};

module.exports = { storyRule };
