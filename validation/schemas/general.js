const Joi = require('joi');
const { validateRequest } = require("../validateMiddleware")

const paramsIdSchema = Joi.object({
    id: Joi.number().required(),
})

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
