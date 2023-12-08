import Joi from 'joi';
import { validateReq } from './validation.helper';
import { CommonValidationFilter } from './validation.helper';

export const userValidation = (req, res, next) => {
    const userSchema = Joi.object({
        data: Joi.object({
            username: Joi.string().required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            phone: new CommonValidationFilter().phone(),
            email: Joi.string().email().required(),
            password: new CommonValidationFilter().password(),
            role: Joi.string().valid('admin', 'user').required(),
        }),
    });
    validateReq(req, next, userSchema);
};
