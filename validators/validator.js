const Joi = require("joi");


async function checkReqBody(post){
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        bodyTitle: Joi.string().min(20).required(),
    })
    return schema.validate(post);
}


module.exports = checkReqBody