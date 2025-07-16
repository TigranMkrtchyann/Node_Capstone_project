const Joi = require('joi');
const { validateRequest } = require("../validateMiddleware")

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})

exports.validateCreateUser = validateRequest(schema)
