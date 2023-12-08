import { END_POINTS } from '../../constant';
import BaseRoute from '../base.routes';
import { countryController } from '../../controller/country';

class CountryRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.get(END_POINTS.COUNTRY, countryController.getCountry);
        this.router.get(END_POINTS.CITY, countryController.getcities);
    }
}
export const countryRoutes = new CountryRoutes().router;
