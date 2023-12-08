import { userValidation } from '../../validation/index';
import { END_POINTS } from '../../constant/index';
import { userController } from '../../controller/index';
import BaseRoute from '../base.routes';

class AdminRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.get(
            END_POINTS.GET_USERS,
            userController.getData.bind(userController),
        );
        this.router.delete(
            END_POINTS.DELETE_USER,
            userController.delete.bind(userController),
        );
        this.router.put(
            END_POINTS.EDIT_USER,
            userController.update.bind(userController),
        );
        this.router.post(
            END_POINTS.CRAETE_USER,
            userValidation,
            userController.create.bind(userController),
        );
    }
}
export const adminRoutes = new AdminRoutes().router;
