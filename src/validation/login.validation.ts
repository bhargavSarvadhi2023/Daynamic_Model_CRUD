import Joi from 'joi';
import { validateReq } from './validation.helper';
import { CommonValidationFilter } from './validation.helper';

export const loginValidation = (req, res, next) => {
    const loginSchema = Joi.object({
        data: Joi.object({
            email: Joi.string().email().required(),
            password: new CommonValidationFilter().password(),
        }),
    });
    validateReq(req, next, loginSchema);
};
