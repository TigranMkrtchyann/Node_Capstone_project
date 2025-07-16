const Joi = require('joi');
const { validateRequest } = require("../validateMiddleware")
const { paramsIdSchema } = require('./general')

const schema = Joi.object({
    ':_id': Joi.optional(),
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
    date: Joi.string()
        .allow('')
        .optional()
        .custom((value, helpers) => {
            if (value === '') return value;

            const date = new Date(value);

            if (
                isNaN(date.getTime()) ||
                value !== date.toISOString().slice(0, 10)
            ) {
                return helpers.error('date.invalid');
            }

            return value;
        }, 'Valid date check')
        .messages({
            'date.invalid': '\"date\" must be a real ISO 8601 date format ',
        })
});

exports.validateCreateExercise = validateRequest(schema, paramsIdSchema)
