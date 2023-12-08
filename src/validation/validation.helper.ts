import { AppError } from '../utils';
import Joi from 'joi';
import moment from 'moment';

export const validateReq = (req, next, userSchema) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };
    const { error, value } = userSchema.validate(req.body, options);
    if (error) {
        throw new AppError(
            `Validation error: ${error.details
                .map((e) => e.message)
                .join(', ')}`,
            'invalid_request',
        );
    } else {
        req.body = value;
        next();
    }
};

export class CommonValidationFilter {
    password() {
        return Joi.string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            )
            .required()
            .messages({
                'string.pattern.base':
                    'Password should be this type contain like ex:- Abc@123',
                'string.empty': 'Password cannot be empty',
            });
    }
    emails() {
        return Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net', 'org', 'edu'],
                },
            })
            .pattern(/^[^@]+@[^@]+\.[^@]+$/)
            .messages({
                'string.email': 'Invalid email format',
                'string.minDomainSegments': 'Invalid email format',
                'string.tlds': 'Invalid email format',
                'string.pattern.base': 'Invalid email format',
            });
    }
    timestamp() {
        return Joi.string()
            .custom((value, helpers) => {
                const inputDate = moment(value, 'YYYY-MM-DD HH:mm');

                if (!inputDate.isValid() || inputDate.isBefore(moment())) {
                    return helpers.error('any.invalid');
                }
                return value;
            }, 'custom datetime format')
            .messages({
                'any.invalid':
                    'Invalid date and time. Date must be in the future and follow YYYY-MM-DD HH:mm format.',
            });
    }
    date() {
        return Joi.string()
            .custom((value, helpers) => {
                const inputDate = moment(value, 'YYYY-MM-DD');
                if (!inputDate.isValid() || inputDate.isBefore(moment())) {
                    return helpers.error('any.invalid');
                }
                return value;
            }, 'custom datetime format')
            .messages({
                'any.invalid':
                    'Invalid date. Date must be in the future and follow YYYY-MM-DD format.',
            })
            .required();
    }
    phone() {
        return Joi.string()
            .required()
            .min(10)
            .max(15)
            .pattern(/^[0-9]{10,15}$/)
            .message('Contact number must be between 10 and 15 digits');
    }
}
