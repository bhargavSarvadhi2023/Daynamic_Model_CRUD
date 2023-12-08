import BaseRoute from '../base.routes';

class UserRoutes extends BaseRoute {
    async initializeRoutes() {}
}
export const userRoutes = new UserRoutes().router;
