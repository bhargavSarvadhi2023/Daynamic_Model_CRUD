import { db } from '../../model';
import dotenv from 'dotenv';
dotenv.config();
import { ERRORTYPES, RES_TYPES } from '../../constant';
import { AppError } from '../../utils';
import { TokenController } from '../../config/passport.jwt';

class AuthController {
    async login(req, res, next) {
        try {
            const {
                body: {
                    data: { email, password },
                },
            } = req;
            const result = await db.userModel.findOne({ where: { email } });
            if (result && result.authenticate(password)) {
                const payload = {
                    id: result.id,
                    Email: result.email,
                };
                const token = await TokenController.createToken(payload, next);
                return res.status(200).json({
                    success: true,
                    data: token,
                    message: RES_TYPES.LOGIN,
                });
            } else {
                return next(
                    new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED),
                );
            }
        } catch (error) {
            return next(error);
        }
    }
}

export const authController = new AuthController();
