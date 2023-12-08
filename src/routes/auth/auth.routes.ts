import { loginValidation } from '../../validation/index';
import { authController } from '../../controller/index';
import BaseRoute from '../base.routes';
import { END_POINTS } from '../../constant/index';

class AuthRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.post(
            END_POINTS.LOGIN,
            loginValidation,
            authController.login,
        );
    }
}
export const authRoutes = new AuthRoutes().router;
