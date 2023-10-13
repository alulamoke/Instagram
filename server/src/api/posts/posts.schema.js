const Joi = require('joi');

const postRule = {
  //schemas for creating post
  create_post: Joi.object().keys({
    type: Joi.string()
      .required()
      .error(() => `type is required.`),
    caption: Joi.string()
      .required()
      .error(() => `caption is required.`),
    // file: Joi.string()
    //   .required()
    //   .error(() => `Image is required.`),
  }),

  //schemas for commenting in apost
  comment_post: Joi.object().keys({
    body: Joi.string()
      .required()
      .error(() => `body is required.`),
  }),
};

module.exports = { postRule };
