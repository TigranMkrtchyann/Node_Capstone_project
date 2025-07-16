const Joi = require('joi');
const { validateRequest } = require("../validateMiddleware")

const paramsIdSchema = Joi.object({
    id: Joi.string()
        .pattern(/^[1-9]\d*$/)
        .required()
        .messages({
            'string.pattern.base': 'The id must be a positive integer (e.g., "123")',
            'any.required': 'The id field is required'
        })
});

const dateValidation = Joi.string()
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

const paginationSchema = Joi.object({
    to: dateValidation,
    from: dateValidation,
    limit: Joi.number().integer().min(1).optional(),
}).unknown(true);

module.exports = {
    validateParamIdAndPagination: validateRequest(null, paramsIdSchema, paginationSchema),
    paramsIdSchema: paramsIdSchema
}
