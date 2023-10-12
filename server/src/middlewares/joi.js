const Joi = require('joi');

const joimiddleware = (schema) => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema, { abortEarly: true });

  if (error) {
    const message = error.details[0].message;
    res.status(422).send({ message });
  } else {
    next(); // return values if no errors in validation
  }
};

module.exports = joimiddleware;
