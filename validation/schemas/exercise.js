const Joi = require('joi');
const { validateRequest } = require("../validateMiddleware")
const { paramsIdSchema } = require('./general')

const schema = Joi.object({
    description: Joi.string()
        .required()
        .trim()
        .min(1)
        .max(100),
    duration: Joi.number()
        .integer()
        .required()
        .min(1)
        .max(1000),
    date: Joi.date()
        .iso()
        .optional()
});

exports.validateCreateExercise = validateRequest(schema, paramsIdSchema)
