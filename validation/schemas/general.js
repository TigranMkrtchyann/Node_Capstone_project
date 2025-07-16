const Joi = require('joi');
const { validateRequest } = require("../validateMiddleware")

const paramsIdSchema = Joi.object({
  id:  Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required()
    .messages({
      'string.pattern.base': 'The id must be a positive integer (e.g., "123")',
      'any.required': 'The id field is required'
    })
});

const paginationSchema = Joi.object({
    to: Joi.date()
        .iso()
        .optional(),
    from: Joi.date()
        .iso()
        .optional(),
    limit: Joi.number().optional(),
})

module.exports = {
    validateParamIdAndPagination: validateRequest(null, paramsIdSchema, paginationSchema),
    paramsIdSchema: paramsIdSchema
}
