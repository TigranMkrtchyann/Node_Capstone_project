const hyypCodes = require('../constants/httpCodes');

exports.validateRequest = (bodySchema, paramsSchema, querySchema) => {
    return (req, res, next) => {
        const errors = [];

        if (bodySchema) {
            const bodyValidation = bodySchema.validate(req.body, { abortEarly: false });
            if (bodyValidation.error) {
                errors.push(...bodyValidation.error.details.map(err => ({
                    field: err.context.key,
                    message: err.message
                })));
            }
        }

        if (paramsSchema) {
            const paramsValidation = paramsSchema.validate(req.params, { abortEarly: false });
            if (paramsValidation.error) {
                errors.push(...paramsValidation.error.details.map(err => ({
                    field: err.context.key,
                    message: err.message
                })));
            }
        }

           if (querySchema) {
            const queryValidation = querySchema.validate(req.query, { abortEarly: false });
            if (queryValidation.error) {
                errors.push(...queryValidation.error.details.map(err => ({
                    field: err.context.key,
                    message: err.message
                })));
            }
        }

        if (errors.length > 0) {
            return res.status(hyypCodes.BAD_REQUEST).json({
                error: 'Validation failed',
                details: errors
            });
        }

        next();
    };
};
