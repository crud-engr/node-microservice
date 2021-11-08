const Joi = require('Joi');

class UserPolicies {
    // validate login
    async validateLogin(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().trim().empty().messages({
                "string.required": "username is required",
                "string.empty": "username should not be empty"
            }),
            password: Joi.string().trim().empty().messages({
                "string.required": "password is required",
                "string.empty": "password should not be empty"
            }),
        }).options({abortEarly: false});

        try {
            const value = await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: err.details[0].message,
                code: 400,
            })
        }
    }

    // validate thumbnail
    async validateThumbnail(req, res, next) {
        const schema = Joi.object({
            uri: Joi.string().empty().trim().messages({
                "string.required":"uri is required",
                "string.empty":"uri should not be empty",
            })
        }).options({abortEarly:false});
        
        try {
            const value = await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(400).json({
                status: 'error',
                message: err.details[0].message,
                code: 400
            })
        }
    }

    async validatePatchObject(req, res, next) {
        const schema = Joi.object({
            firstName: Joi.string().empty().messages({
                "string.empty":"firstName should not be empty",
            }),
            lastName: Joi.string().empty().messages({
                "string.empty":"lastName should not be empty",
            }),
            contactNumber: Joi.string().empty().messages({
                "string.empty":"contactNumber should not be empty",
            }),
            replacePath: Joi.string().empty().messages({
                "string.empty":"replacePath should not be empty",
            }),
            replaceValue: Joi.string().empty().messages({
                "string.empty":"replaceValue should not be empty",
            })
        }).options({abortEarly:false});
        
        try {
            const value = await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(400).json({
                status: 'error',
                message: err.details[0].message,
                code: 400
            })
        }
    }
}

module.exports = UserPolicies;