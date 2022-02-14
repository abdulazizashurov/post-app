const Joi = require("joi");

async function checkPost(post) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    bodyTitle: Joi.string().min(20).required(),
    author: Joi.string().required().min(20),
  });
  return schema.validate(post);
}

async function checkUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().required().email({ minDomainSegments: 2 }),
  });

  return schema.validate(user);
}

module.exports.checkPost = checkPost;
module.exports.checkUser = checkUser;
